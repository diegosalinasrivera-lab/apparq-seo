import Link from 'next/link';
import { TRAMITES } from '@/data/tramites';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trámites DOM en Chile — Precio exacto | APPARQ',
  description: 'Permisos de construcción, regularización, recepción final y más. Arquitecto verificado asignado en 24h. Cotiza gratis en 2 minutos.',
  alternates: { canonical: 'https://tramites.apparq.cl' },
};

const LogoIcon = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
    <path d="M13 2L25 23H1L13 2Z" fill="#E8503A" />
  </svg>
);

export default function Home() {
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
      <section className="max-w-5xl mx-auto px-6 py-14 md:py-20">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-[#FDE8E4] text-[#E8503A] text-xs font-bold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8503A]" />
            Todo Chile
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-[#1a1a2e] leading-[1.05]">
            Regulariza tu casa<br />
            o tramita tu permiso<br />
            <span className="text-[#E8503A]">en minutos.</span>
          </h1>
          <p className="text-[#4a4a5a] mt-6 text-base md:text-lg leading-relaxed max-w-lg">
            Ingresa tu dirección, elige tu trámite y obtén el precio exacto al instante. Sin reuniones, sin sorpresas, sin letra chica.
          </p>
          <div className="mt-8">
            <a
              href="https://apparq.cl"
              className="inline-block bg-[#E8503A] text-white font-bold py-3.5 px-8 rounded-full text-sm hover:bg-[#d14432] transition-colors"
            >
              Cotizar en 2 minutos →
            </a>
          </div>
          <div className="mt-5 flex items-center gap-2">
            <span className="text-[#F5A623] text-sm tracking-tight">★★★★★</span>
            <span className="text-[#4a4a5a] text-sm font-medium">Precio online garantizado</span>
          </div>
        </div>
      </section>

      {/* Trámites grid */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <p className="text-[#E8503A] text-xs font-bold uppercase tracking-wider mb-1">Servicios</p>
        <h2 className="text-2xl md:text-3xl font-black text-[#1a1a2e] mb-1">¿Qué trámite necesitas?</h2>
        <p className="text-[#6b6b7a] text-sm mb-8">Selecciona tu trámite para ver precio y disponibilidad en tu comuna</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TRAMITES.map(t => (
            <Link
              key={t.slug}
              href={`/tramites/${t.slug}`}
              className="bg-white rounded-2xl p-5 border border-[#EDE8E3] hover:border-[#E8503A] hover:shadow-md transition-all group"
            >
              <h3 className="font-bold text-[#1a1a2e] group-hover:text-[#E8503A] transition-colors text-sm">{t.nombre}</h3>
              <p className="text-[#6b6b7a] text-xs mt-1 leading-relaxed">{t.descripcion}</p>
              <p className="text-[#E8503A] font-bold text-sm mt-3">
                Desde {precioFmt.format(t.precio_desde)} →
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="bg-white border-y border-[#EDE8E3] px-6 py-14">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#E8503A] text-xs font-bold uppercase tracking-wider mb-1">Proceso</p>
          <h2 className="text-2xl md:text-3xl font-black text-[#1a1a2e] mb-10">Tu viaje con APPARQ, paso a paso</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { n: '1', title: 'Cotiza gratis', desc: 'Ingresa los datos de tu propiedad en 2 minutos y obtén precio exacto.' },
              { n: '2', title: 'Arquitecto asignado', desc: 'Un arquitecto verificado toma tu caso en menos de 24 horas.' },
              { n: '3', title: 'Pago por etapas', desc: 'Pagas en 4 etapas a medida que avanza el trámite. Sin sorpresas.' },
              { n: '4', title: 'Trámite listo', desc: 'Recibes toda la documentación aprobada por la DOM.' },
            ].map((s, i) => (
              <div key={i} className="flex gap-3">
                <span className="w-8 h-8 rounded-full bg-[#E8503A] text-white text-sm font-black flex items-center justify-center flex-shrink-0">{s.n}</span>
                <div>
                  <p className="font-bold text-[#1a1a2e] text-sm">{s.title}</p>
                  <p className="text-[#6b6b7a] text-xs mt-1 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6">
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
  );
}
