import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { TRAMITES } from '@/data/tramites';
import { COMUNAS } from '@/data/comunas';

interface Props {
  params: Promise<{ tramite: string }>;
}

const LogoIcon = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
    <path d="M13 2L25 23H1L13 2Z" fill="#E8503A" />
  </svg>
);

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
      <section className="max-w-5xl mx-auto px-6 py-12 md:py-16">
        <nav className="text-xs text-[#6b6b7a] mb-6">
          <Link href="/" className="hover:text-[#E8503A] transition-colors">Inicio</Link>
          <span className="mx-2">/</span>
          <span className="text-[#1a1a2e] font-medium">{tramite.nombre}</span>
        </nav>
        <div className="max-w-2xl">
          <p className="text-[#E8503A] text-xs font-bold uppercase tracking-wider mb-2">Trámite DOM</p>
          <h1 className="text-4xl md:text-5xl font-black text-[#1a1a2e] leading-tight">
            {tramite.nombre}<br />
            <span className="text-[#E8503A]">en Chile</span>
          </h1>
          <p className="text-[#4a4a5a] mt-4 text-base leading-relaxed max-w-lg">{tramite.descripcion}</p>
          <div className="mt-6 flex items-center gap-4 flex-wrap">
            <span className="text-2xl font-black text-[#1a1a2e]">Desde {precioFmt.format(tramite.precio_desde)}</span>
            <a
              href="https://apparq.cl"
              className="bg-[#E8503A] text-white font-bold py-2.5 px-6 rounded-full text-sm hover:bg-[#d14432] transition-colors"
            >
              Cotizar precio exacto →
            </a>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-[#F5A623] text-sm">★★★★★</span>
            <span className="text-[#4a4a5a] text-sm font-medium">Precio online garantizado</span>
          </div>
        </div>
      </section>

      {/* Comunas */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="bg-white rounded-2xl border border-[#EDE8E3] p-6 md:p-8">
          <p className="text-[#E8503A] text-xs font-bold uppercase tracking-wider mb-1">Cobertura</p>
          <h2 className="text-xl font-black text-[#1a1a2e] mb-1">Selecciona tu comuna</h2>
          <p className="text-[#6b6b7a] text-sm mb-8">Precio exacto y arquitecto disponible en tu zona</p>

          <div className="mb-8">
            <h3 className="text-xs font-bold text-[#6b6b7a] uppercase tracking-widest mb-3">Región Metropolitana</h3>
            <div className="flex flex-wrap gap-2">
              {comunasPrioridad1.map(c => (
                <Link
                  key={c.slug}
                  href={`/tramites/${tramite.slug}/${c.slug}`}
                  className="text-sm text-[#1a1a2e] font-medium bg-[#FAF7F4] border border-[#EDE8E3] rounded-full px-4 py-1.5 hover:border-[#E8503A] hover:text-[#E8503A] hover:bg-[#FDE8E4] transition-all"
                >
                  {c.nombre}
                </Link>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xs font-bold text-[#6b6b7a] uppercase tracking-widest mb-3">Otras comunas RM</h3>
            <div className="flex flex-wrap gap-2">
              {comunasPrioridad2.map(c => (
                <Link
                  key={c.slug}
                  href={`/tramites/${tramite.slug}/${c.slug}`}
                  className="text-sm text-[#1a1a2e] font-medium bg-[#FAF7F4] border border-[#EDE8E3] rounded-full px-4 py-1.5 hover:border-[#E8503A] hover:text-[#E8503A] hover:bg-[#FDE8E4] transition-all"
                >
                  {c.nombre}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-[#6b6b7a] uppercase tracking-widest mb-3">Otras regiones</h3>
            <div className="flex flex-wrap gap-2">
              {comunasOtras.map(c => (
                <Link
                  key={c.slug}
                  href={`/tramites/${tramite.slug}/${c.slug}`}
                  className="text-sm text-[#1a1a2e] font-medium bg-[#FAF7F4] border border-[#EDE8E3] rounded-full px-4 py-1.5 hover:border-[#E8503A] hover:text-[#E8503A] hover:bg-[#FDE8E4] transition-all"
                >
                  {c.nombre}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#EDE8E3] py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6b6b7a]">
          <div className="flex items-center gap-2">
            <LogoIcon />
            <span className="font-black text-[#1a1a2e]">APPARQ</span>
            <span>· DSR ARQ SPA</span>
          </div>
          <div className="flex gap-4 flex-wrap justify-center">
            <a href="mailto:hola@apparq.cl" className="hover:text-[#E8503A] transition-colors">hola@apparq.cl</a>
            <a href="https://apparq.cl" className="hover:text-[#E8503A] transition-colors">apparq.cl</a>
            <a href="https://wa.me/56942054581" className="hover:text-[#E8503A] transition-colors">WhatsApp</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
