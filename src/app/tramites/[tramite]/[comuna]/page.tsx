import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { TRAMITES } from '@/data/tramites';
import { COMUNAS } from '@/data/comunas';

interface Props {
  params: Promise<{ tramite: string; comuna: string }>;
}

export async function generateStaticParams() {
  // Generar TODAS las combinaciones — requerido para output: 'export'
  const params: { tramite: string; comuna: string }[] = [];
  for (const t of TRAMITES) {
    for (const c of COMUNAS) {
      params.push({ tramite: t.slug, comuna: c.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tramite: tramiteSlug, comuna: comunaSlug } = await params;
  const tramite = TRAMITES.find(t => t.slug === tramiteSlug);
  const comuna = COMUNAS.find(c => c.slug === comunaSlug);
  if (!tramite || !comuna) return {};

  const h1 = tramite.h1_pattern.replace('{comuna}', comuna.nombre);
  const precio = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(tramite.precio_desde);

  return {
    title: `${tramite.titulo_seo} en ${comuna.nombre} | Precio exacto | APPARQ`,
    description: `${tramite.nombre} en ${comuna.nombre} desde ${precio}. Arquitecto verificado, precio exacto antes de comprometerte. Cotiza gratis en 2 minutos.`,
    alternates: { canonical: `https://tramites.apparq.cl/tramites/${tramite.slug}/${comuna.slug}` },
    openGraph: {
      title: `${tramite.titulo_seo} en ${comuna.nombre} | APPARQ`,
      description: `${tramite.nombre} en ${comuna.nombre} desde ${precio}. Arquitecto verificado.`,
      url: `https://tramites.apparq.cl/tramites/${tramite.slug}/${comuna.slug}`,
      siteName: 'APPARQ',
      locale: 'es_CL',
      type: 'website',
    },
  };
}

export default async function TramiteComunaPage({ params }: Props) {
  const { tramite: tramiteSlug, comuna: comunaSlug } = await params;
  const tramite = TRAMITES.find(t => t.slug === tramiteSlug);
  const comuna = COMUNAS.find(c => c.slug === comunaSlug);
  if (!tramite || !comuna) notFound();

  const h1 = tramite.h1_pattern.replace('{comuna}', comuna.nombre);
  const precioFmt = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });
  const precio = precioFmt.format(tramite.precio_desde);

  // Etapas de pago
  const esInforme = tramite.slug === 'informe-propiedad';
  const etapas = esInforme
    ? [
        { label: 'E1 — Inicio', pct: 0.50 },
        { label: 'E2 — Entrega informe', pct: 0.50 },
      ]
    : [
        { label: 'E1 — Inicio (20%)', pct: 0.20 },
        { label: 'E2 — Elaboración (30%)', pct: 0.30 },
        { label: 'E3 — Ingreso DOM (20%)', pct: 0.20 },
        { label: 'E4 — Recepción final (30%)', pct: 0.30 },
      ];

  // Otras comunas RM para internal links
  const otrasComunas = COMUNAS
    .filter(c => c.prioridad <= 2 && c.slug !== comunaSlug)
    .slice(0, 8);

  // Schema JSON-LD
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: tramite.nombre,
    description: tramite.descripcion,
    provider: {
      '@type': 'Organization',
      name: 'APPARQ',
      url: 'https://apparq.cl',
      telephone: '+56942054581',
      email: 'hola@apparq.cl',
    },
    areaServed: {
      '@type': 'City',
      name: comuna.nombre,
      containedInPlace: { '@type': 'AdministrativeArea', name: 'Chile' },
    },
    offers: {
      '@type': 'Offer',
      price: tramite.precio_desde,
      priceCurrency: 'CLP',
      availability: 'https://schema.org/InStock',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `¿Cuánto cuesta un ${tramite.nombre.toLowerCase()} en ${comuna.nombre}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `El costo parte desde ${precio} dependiendo de la superficie y características específicas del proyecto. En APPARQ puedes cotizar en 2 minutos y obtener tu precio exacto.`,
        },
      },
      {
        '@type': 'Question',
        name: `¿Cuánto demora un ${tramite.nombre.toLowerCase()} en ${comuna.nombre}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `El plazo depende de la DOM de ${comuna.nombre}. En promedio entre 3 y 6 meses. APPARQ se encarga de todo el proceso con un arquitecto verificado en tu comuna.`,
        },
      },
      {
        '@type': 'Question',
        name: `¿Necesito arquitecto para el trámite en ${comuna.nombre}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Sí. Todo trámite ante la DOM requiere un profesional arquitecto patrocinante. En APPARQ te asignamos un arquitecto verificado en ${comuna.nombre} en menos de 24 horas.`,
        },
      },
      {
        '@type': 'Question',
        name: `¿Qué documentos necesito para iniciar en ${comuna.nombre}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Los documentos varían según el tipo de trámite. En APPARQ el arquitecto asignado te guía desde el primer día y te indica exactamente qué necesitas para tu caso específico.`,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-[#1a1a2e] py-5 px-6">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <a href="https://apparq.cl" className="text-white font-bold text-lg">APPARQ</a>
            <a href="https://apparq.cl" className="bg-[#E8503A] text-white text-xs font-bold py-2 px-4 rounded-lg">
              Cotizar gratis →
            </a>
          </div>
        </header>

        {/* Hero */}
        <section className="bg-[#1a1a2e] pb-14 pt-8 px-6">
          <div className="max-w-5xl mx-auto">
            {/* Breadcrumb */}
            <nav className="text-xs text-gray-500 mb-6">
              <Link href="/" className="hover:text-gray-300 text-gray-400">Inicio</Link>
              <span className="mx-2 text-gray-600">/</span>
              <Link href={`/tramites/${tramite.slug}`} className="hover:text-gray-300 text-gray-400">{tramite.nombre}</Link>
              <span className="mx-2 text-gray-600">/</span>
              <span className="text-gray-300">{comuna.nombre}</span>
            </nav>

            <div className="md:flex md:items-start md:justify-between gap-8">
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-black text-white leading-tight">
                  {h1}
                </h1>
                <p className="text-gray-300 mt-4 text-sm leading-relaxed max-w-lg">
                  {tramite.descripcion}
                </p>
                <div className="mt-6 flex items-center gap-4 flex-wrap">
                  <span className="text-white font-black text-2xl">Desde {precio}</span>
                  <a
                    href="https://apparq.cl"
                    className="bg-[#E8503A] text-white font-bold py-3 px-6 rounded-lg text-sm hover:bg-[#d14432] transition-colors"
                  >
                    Cotizar precio exacto →
                  </a>
                </div>
              </div>

              {/* Precio box */}
              <div className="mt-8 md:mt-0 md:w-72 bg-white/10 rounded-xl p-5 border border-white/20 flex-shrink-0">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-3">Etapas de pago</p>
                <table className="w-full text-sm">
                  <tbody>
                    {etapas.map((e, i) => (
                      <tr key={i} className="border-b border-white/10 last:border-0">
                        <td className="py-2 text-gray-400 text-xs">{e.label}</td>
                        <td className="py-2 text-white font-bold text-xs text-right">
                          {precioFmt.format(Math.round(tramite.precio_desde * e.pct))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-gray-500 text-xs mt-3">* Precio referencial. Tu cotización exacta en 2 min.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Beneficios */}
        <section className="max-w-5xl mx-auto px-6 py-12">
          <h2 className="text-xl font-bold text-[#1a1a2e] mb-6">¿Por qué APPARQ en {comuna.nombre}?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: '⚡', title: 'Arquitecto en 24h', desc: `Te asignamos un arquitecto verificado en ${comuna.nombre} en menos de 24 horas.` },
              { icon: '💰', title: 'Precio exacto', desc: 'Cotiza en 2 minutos y obtén tu precio definitivo. Sin sorpresas ni cobros adicionales.' },
              { icon: '📱', title: 'Todo en línea', desc: 'Sigue el avance de tu trámite en tiempo real desde apparq.cl. Sin visitas a oficinas.' },
            ].map((b, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-5">
                <span className="text-2xl">{b.icon}</span>
                <h3 className="font-bold text-[#1a1a2e] mt-2 mb-1">{b.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cómo funciona */}
        <section className="bg-gray-50 px-6 py-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl font-bold text-[#1a1a2e] mb-6">Cómo funciona</h2>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {[
                { n: '1', title: 'Cotiza gratis', desc: 'Ingresa los datos de tu propiedad en 2 minutos.' },
                { n: '2', title: 'Arquitecto asignado', desc: `Un arquitecto verificado en ${comuna.nombre} toma tu caso en 24h.` },
                { n: '3', title: 'Pago por etapas', desc: 'Pagas en 4 etapas a medida que avanza el trámite.' },
                { n: '4', title: 'Trámite listo', desc: 'Recibes toda la documentación aprobada por la DOM.' },
              ].map((s, i) => (
                <div key={i} className="flex gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#E8503A] text-white text-sm font-black flex items-center justify-center flex-shrink-0">{s.n}</span>
                  <div>
                    <p className="font-bold text-[#1a1a2e] text-sm">{s.title}</p>
                    <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-5xl mx-auto px-6 py-12">
          <h2 className="text-xl font-bold text-[#1a1a2e] mb-6">
            Preguntas frecuentes — {tramite.nombre} en {comuna.nombre}
          </h2>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((faq, i) => (
              <details key={i} className="border border-gray-200 rounded-xl p-5 group">
                <summary className="font-semibold text-[#1a1a2e] text-sm cursor-pointer list-none flex justify-between items-center">
                  {faq.name}
                  <span className="text-gray-400 text-lg group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-gray-600 text-sm mt-3 leading-relaxed">{faq.acceptedAnswer.text}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA final */}
        <section className="bg-[#1a1a2e] px-6 py-14 text-center">
          <h2 className="text-2xl font-black text-white max-w-xl mx-auto">
            ¿Listo para iniciar tu {tramite.nombre.toLowerCase()} en {comuna.nombre}?
          </h2>
          <p className="text-gray-400 text-sm mt-3 max-w-md mx-auto">
            Cotiza en 2 minutos. Precio exacto. Arquitecto asignado en 24h.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href="https://apparq.cl"
              className="bg-[#E8503A] text-white font-bold py-3 px-8 rounded-lg text-sm hover:bg-[#d14432] transition-colors"
            >
              Cotizar precio exacto →
            </a>
            <a
              href="https://wa.me/56942054581"
              className="bg-[#25D366] text-white font-bold py-3 px-8 rounded-lg text-sm hover:bg-[#1da851] transition-colors"
            >
              💬 Consultar por WhatsApp
            </a>
          </div>
        </section>

        {/* Internal links — otras comunas */}
        <section className="max-w-5xl mx-auto px-6 py-10">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
            {tramite.nombre} en otras comunas
          </h2>
          <div className="flex flex-wrap gap-2">
            {otrasComunas.map(c => (
              <Link
                key={c.slug}
                href={`/tramites/${tramite.slug}/${c.slug}`}
                className="text-xs text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5 hover:border-[#E8503A] hover:text-[#E8503A] transition-all"
              >
                {tramite.nombre} en {c.nombre}
              </Link>
            ))}
          </div>
        </section>

        <footer className="border-t border-gray-100 py-8 px-6 text-center text-xs text-gray-400">
          <p>APPARQ · DSR ARQ SPA · <a href="mailto:hola@apparq.cl" className="hover:text-[#E8503A]">hola@apparq.cl</a></p>
          <p className="mt-1"><a href="https://apparq.cl" className="hover:text-[#E8503A]">apparq.cl</a></p>
        </footer>
      </main>
    </>
  );
}
