import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { TRAMITES } from '@/data/tramites';
import { COMUNAS } from '@/data/comunas';

interface Props {
  params: Promise<{ tramite: string }>;
}

export async function generateStaticParams() {
  return TRAMITES.map(t => ({ tramite: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tramite: tramiteSlug } = await params;
  const tramite = TRAMITES.find(t => t.slug === tramiteSlug);
  if (!tramite) return {};
  return {
    title: `${tramite.nombre} en Chile — Precio exacto | APPARQ`,
    description: `${tramite.descripcion} Selecciona tu comuna para ver precio exacto.`,
    alternates: { canonical: `https://tramites.apparq.cl/tramites/${tramite.slug}` },
  };
}

export default async function TramiteHubPage({ params }: Props) {
  const { tramite: tramiteSlug } = await params;
  const tramite = TRAMITES.find(t => t.slug === tramiteSlug);
  if (!tramite) notFound();

  const comunasPrioridad1 = COMUNAS.filter(c => c.prioridad === 1);
  const comunasPrioridad2 = COMUNAS.filter(c => c.prioridad === 2);
  const comunasOtras = COMUNAS.filter(c => c.prioridad === 3);

  const precioFmt = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });

  return (
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
      <section className="bg-[#1a1a2e] pb-14 pt-8 px-6 text-center">
        <nav className="text-xs text-gray-500 mb-4 max-w-5xl mx-auto text-left">
          <Link href="/" className="hover:text-gray-300 text-gray-400">Inicio</Link>
          <span className="mx-2 text-gray-600">/</span>
          <span className="text-gray-300">{tramite.nombre}</span>
        </nav>
        <h1 className="text-3xl md:text-4xl font-black text-white leading-tight max-w-2xl mx-auto">
          {tramite.nombre}<br />
          <span className="text-[#E8503A]">en Chile</span>
        </h1>
        <p className="text-gray-300 mt-4 text-sm max-w-xl mx-auto">{tramite.descripcion}</p>
        <p className="text-white font-bold text-lg mt-4">
          Desde {precioFmt.format(tramite.precio_desde)}
        </p>
        <a
          href="https://apparq.cl"
          className="inline-block mt-5 bg-[#E8503A] text-white font-bold py-3 px-8 rounded-lg text-sm hover:bg-[#d14432] transition-colors"
        >
          Cotizar precio exacto →
        </a>
      </section>

      {/* Comunas */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <h2 className="text-xl font-bold text-[#1a1a2e] mb-1">Selecciona tu comuna</h2>
        <p className="text-gray-500 text-sm mb-8">Precio exacto y arquitecto disponible por comuna</p>

        {/* Región Metropolitana — Alta prioridad */}
        <div className="mb-8">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Región Metropolitana</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {comunasPrioridad1.map(c => (
              <Link
                key={c.slug}
                href={`/tramites/${tramite.slug}/${c.slug}`}
                className="text-sm text-[#1a1a2e] font-medium border border-gray-200 rounded-lg px-3 py-2 hover:border-[#E8503A] hover:text-[#E8503A] transition-all"
              >
                {c.nombre}
              </Link>
            ))}
          </div>
        </div>

        {/* RM — Media prioridad */}
        <div className="mb-8">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Otras comunas RM</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {comunasPrioridad2.map(c => (
              <Link
                key={c.slug}
                href={`/tramites/${tramite.slug}/${c.slug}`}
                className="text-sm text-[#1a1a2e] font-medium border border-gray-200 rounded-lg px-3 py-2 hover:border-[#E8503A] hover:text-[#E8503A] transition-all"
              >
                {c.nombre}
              </Link>
            ))}
          </div>
        </div>

        {/* Otras regiones */}
        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Otras regiones</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {comunasOtras.map(c => (
              <Link
                key={c.slug}
                href={`/tramites/${tramite.slug}/${c.slug}`}
                className="text-sm text-[#1a1a2e] font-medium border border-gray-200 rounded-lg px-3 py-2 hover:border-[#E8503A] hover:text-[#E8503A] transition-all"
              >
                {c.nombre}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-100 py-8 px-6 text-center text-xs text-gray-400">
        <p>APPARQ · DSR ARQ SPA · <a href="mailto:hola@apparq.cl" className="hover:text-[#E8503A]">hola@apparq.cl</a></p>
      </footer>
    </main>
  );
}
