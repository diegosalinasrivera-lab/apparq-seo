import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { TRAMITES } from '@/data/tramites';
import { COMUNAS } from '@/data/comunas';

interface Props {
  params: Promise<{ tramite: string; comuna: string }>;
}

const LogoIcon = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
    <path d="M13 2L25 23H1L13 2Z" fill="#E8503A" />
  </svg>
);

const IconFast = () => (
  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#E8503A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconPrice = () => (
  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="10" stroke="#E8503A" strokeWidth="2" />
    <path d="M12 6v12M9 8.5h4a1.5 1.5 0 010 3H11a1.5 1.5 0 000 3h4" stroke="#E8503A" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const IconOnline = () => (
  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" aria-hidden="true">
    <rect x="5" y="2" width="14" height="20" rx="2" stroke="#E8503A" strokeWidth="2" />
    <circle cx="12" cy="17" r="1" fill="#E8503A" />
    <path d="M9 6h6" stroke="#E8503A" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export async function generateStaticParams() {
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

  const otrasComunas = COMUNAS
    .filter(c => c.prioridad <= 2 && c.slug !== comunaSlug)
    .slice(0, 8);

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="min-h-screen" style={{ backgroundColor: '#FAF7F4' }}>

        {/* Header */}
        <header className="bg-white border-b border-[#EDE8E3] py-4 px-6 sticky top-0 z-50">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <a href="https://apparq.cl" className="flex items-center gap-2">
              <LogoIcon />
              <span className="font-black text-[#1a1a2e] text-lg tracking-tight">APPARQ</span>
            </a>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#1a1a2e]">
              <Link href="/" className="hover:text-[#E8503A] transition-colors">Trámites</Link>
              <a href="https://apparq.cl" className="hover:text-[#E8503A] transition-colors">Cómo funciona</a>
            </nav>
            <a
              href="https://apparq.cl"
              className="bg-[#E8503A] text-white font-bold py-2 px-5 rounded-full text-sm hover:bg-[#d14432] transition-colors"
            >
              Cotizar gratis →
            </a>
          </div>
        </header>

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 py-10 md:py-14">
          {/* Breadcrumb */}
          <nav className="text-xs text-[#6b6b7a] mb-6">
            <Link href="/" className="hover:text-[#E8503A] transition-colors">Inicio</Link>
            <span className="mx-2">/</span>
            <Link href={`/tramites/${tramite.slug}`} className="hover:text-[#E8503A] transition-colors">{tramite.nombre}</Link>
            <span className="mx-2">/</span>
            <span className="text-[#1a1a2e] font-medium">{comuna.nombre}</span>
          </nav>

          <div className="md:flex md:items-start md:justify-between gap-10">
            {/* Left: H1 + CTA */}
            <div className="flex-1">
              <p className="text-[#E8503A] text-xs font-bold uppercase tracking-wider mb-2">Trámite DOM</p>
              <h1 className="text-3xl md:text-5xl font-black text-[#1a1a2e] leading-tight">
                {h1}
              </h1>
              <p className="text-[#4a4a5a] mt-4 text-base leading-relaxed max-w-lg">
                {tramite.descripcion}
              </p>
              <div className="mt-6 flex items-center gap-4 flex-wrap">
                <span className="text-2xl font-black text-[#1a1a2e]">Desde {precio}</span>
                <a
                  href="https://apparq.cl"
                  className="bg-[#E8503A] text-white font-bold py-3 px-6 rounded-full text-sm hover:bg-[#d14432] transition-colors"
                >
                  Cotizar precio exacto →
                </a>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-[#F5A623] text-sm">★★★★★</span>
                <span className="text-[#4a4a5a] text-sm font-medium">Precio online garantizado</span>
              </div>
            </div>

            {/* Right: Etapas de pago */}
            <div className="mt-8 md:mt-0 md:w-72 bg-white rounded-2xl p-5 border border-[#EDE8E3] shadow-sm flex-shrink-0">
              <p className="text-[#E8503A] text-xs font-bold uppercase tracking-wider mb-4">Etapas de pago</p>
              <table className="w-full text-sm">
                <tbody>
                  {etapas.map((e, i) => (
                    <tr key={i} className="border-b border-[#EDE8E3] last:border-0">
                      <td className="py-2.5 text-[#6b6b7a] text-xs">{e.label}</td>
                      <td className="py-2.5 text-[#1a1a2e] font-bold text-xs text-right">
                        {precioFmt.format(Math.round(tramite.precio_desde * e.pct))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-[#9b9bab] text-xs mt-3">* Precio referencial. Tu cotización exacta en 2 min.</p>
            </div>
          </div>
        </section>

        {/* Beneficios */}
        <section className="bg-white border-y border-[#EDE8E3] px-6 py-12">
          <div className="max-w-5xl mx-auto">
            <p className="text-[#E8503A] text-xs font-bold uppercase tracking-wider mb-1">Ventajas</p>
            <h2 className="text-xl font-black text-[#1a1a2e] mb-8">¿Por qué APPARQ en {comuna.nombre}?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  icon: <IconFast />,
                  title: 'Arquitecto en 24h',
                  desc: `Te asignamos un arquitecto verificado en ${comuna.nombre} en menos de 24 horas.`,
                },
                {
                  icon: <IconPrice />,
                  title: 'Precio exacto',
                  desc: 'Cotiza en 2 minutos y obtén tu precio definitivo. Sin sorpresas ni cobros adicionales.',
                },
                {
                  icon: <IconOnline />,
                  title: 'Todo en línea',
                  desc: 'Sigue el avance de tu trámite en tiempo real desde apparq.cl. Sin visitas a oficinas.',
                },
              ].map((b, i) => (
                <div key={i} className="bg-[#FAF7F4] rounded-2xl p-5 border border-[#EDE8E3]">
                  <div className="w-10 h-10 bg-[#FDE8E4] rounded-xl flex items-center justify-center mb-3">
                    {b.icon}
                  </div>
                  <h3 className="font-bold text-[#1a1a2e] text-sm mb-1">{b.title}</h3>
                  <p className="text-[#6b6b7a] text-xs leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cómo funciona */}
        <section className="max-w-5xl mx-auto px-6 py-12">
          <p className="text-[#E8503A] text-xs font-bold uppercase tracking-wider mb-1">Proceso</p>
          <h2 className="text-xl font-black text-[#1a1a2e] mb-8">Cómo funciona</h2>
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
                  <p className="text-[#6b6b7a] text-xs mt-0.5 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white border-y border-[#EDE8E3] px-6 py-12">
          <div className="max-w-5xl mx-auto">
            <p className="text-[#E8503A] text-xs font-bold uppercase tracking-wider mb-1">FAQ</p>
            <h2 className="text-xl font-black text-[#1a1a2e] mb-6">
              Preguntas frecuentes — {tramite.nombre} en {comuna.nombre}
            </h2>
            <div className="space-y-3">
              {faqSchema.mainEntity.map((faq, i) => (
                <details key={i} className="bg-[#FAF7F4] border border-[#EDE8E3] rounded-2xl p-5 group">
                  <summary className="font-semibold text-[#1a1a2e] text-sm cursor-pointer list-none flex justify-between items-center gap-4">
                    {faq.name}
                    <span className="text-[#E8503A] text-lg flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="text-[#4a4a5a] text-sm mt-3 leading-relaxed">{faq.acceptedAnswer.text}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="max-w-5xl mx-auto px-6 py-14 text-center">
          <p className="text-[#E8503A] text-xs font-bold uppercase tracking-wider mb-2">¿Listo para empezar?</p>
          <h2 className="text-2xl md:text-3xl font-black text-[#1a1a2e] max-w-xl mx-auto">
            Inicia tu {tramite.nombre.toLowerCase()} en {comuna.nombre}
          </h2>
          <p className="text-[#4a4a5a] text-sm mt-3 max-w-md mx-auto">
            Cotiza en 2 minutos. Precio exacto. Arquitecto asignado en 24h.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href="https://apparq.cl"
              className="bg-[#E8503A] text-white font-bold py-3.5 px-8 rounded-full text-sm hover:bg-[#d14432] transition-colors"
            >
              Cotizar precio exacto →
            </a>
            <a
              href="https://wa.me/56942054581"
              className="bg-[#25D366] text-white font-bold py-3.5 px-8 rounded-full text-sm hover:bg-[#1da851] transition-colors"
            >
              Consultar por WhatsApp
            </a>
          </div>
        </section>

        {/* Internal links */}
        <section className="border-t border-[#EDE8E3] max-w-5xl mx-auto px-6 py-10">
          <p className="text-xs font-bold text-[#6b6b7a] uppercase tracking-wider mb-4">
            {tramite.nombre} en otras comunas
          </p>
          <div className="flex flex-wrap gap-2">
            {otrasComunas.map(c => (
              <Link
                key={c.slug}
                href={`/tramites/${tramite.slug}/${c.slug}`}
                className="text-xs text-[#4a4a5a] bg-white border border-[#EDE8E3] rounded-full px-4 py-1.5 hover:border-[#E8503A] hover:text-[#E8503A] hover:bg-[#FDE8E4] transition-all"
              >
                {tramite.nombre} en {c.nombre}
              </Link>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[#EDE8E3] py-10 px-6">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6b6b7a]">
            <div className="flex items-center gap-2">
              <LogoIcon />
              <span className="font-black text-[#1a1a2e]">APPARQ</span>
              <span>· APPARQ SpA · RUT 78.441.391-8</span>
            </div>
            <div className="flex gap-4 flex-wrap justify-center">
              <a href="mailto:hola@apparq.cl" className="hover:text-[#E8503A] transition-colors">hola@apparq.cl</a>
              <a href="https://apparq.cl" className="hover:text-[#E8503A] transition-colors">apparq.cl</a>
              <a href="https://wa.me/56942054581" className="hover:text-[#E8503A] transition-colors">WhatsApp</a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
