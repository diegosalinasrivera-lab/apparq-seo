import Link from 'next/link';
import { TRAMITES } from '@/data/tramites';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trámites DOM en Chile — Precio exacto | APPARQ',
  description: 'Permisos de construcción, regularización, recepción final y más. Arquitecto verificado asignado en 24h. Cotiza gratis en 2 minutos.',
  alternates: { canonical: 'https://tramites.apparq.cl' },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#1a1a2e] py-8 px-6 text-center">
        <a href="https://apparq.cl" className="text-white text-2xl font-bold tracking-tight">APPARQ</a>
        <p className="text-gray-400 text-sm mt-1">Trámites arquitectónicos sin complicaciones</p>
      </header>

      {/* Hero */}
      <section className="bg-[#1a1a2e] pb-16 pt-8 px-6 text-center">
        <h1 className="text-3xl md:text-4xl font-black text-white leading-tight max-w-2xl mx-auto">
          Permisos DOM y regularizaciones<br />
          <span className="text-[#E8503A]">en toda Chile</span>
        </h1>
        <p className="text-gray-300 mt-4 text-base max-w-xl mx-auto">
          Arquitecto verificado asignado en 24h. Precio exacto antes de comprometerte. Sin sorpresas.
        </p>
        <a
          href="https://apparq.cl"
          className="inline-block mt-6 bg-[#E8503A] text-white font-bold py-3 px-8 rounded-lg text-sm hover:bg-[#d14432] transition-colors"
        >
          Cotizar en 2 minutos →
        </a>
      </section>

      {/* Trámites grid */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-[#1a1a2e] mb-2">¿Qué trámite necesitas?</h2>
        <p className="text-gray-500 text-sm mb-8">Selecciona tu trámite para ver precio y disponibilidad en tu comuna</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TRAMITES.map(t => (
            <Link
              key={t.slug}
              href={`/tramites/${t.slug}`}
              className="border border-gray-200 rounded-xl p-5 hover:border-[#E8503A] hover:shadow-sm transition-all group"
            >
              <h3 className="font-bold text-[#1a1a2e] group-hover:text-[#E8503A] transition-colors">{t.nombre}</h3>
              <p className="text-gray-500 text-xs mt-1 leading-relaxed">{t.descripcion}</p>
              <p className="text-[#E8503A] font-bold text-sm mt-3">
                Desde {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(t.precio_desde)} →
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-6 text-center text-xs text-gray-400">
        <p>APPARQ · DSR ARQ SPA · <a href="mailto:hola@apparq.cl" className="hover:text-[#E8503A]">hola@apparq.cl</a></p>
        <p className="mt-1"><a href="https://apparq.cl" className="hover:text-[#E8503A]">apparq.cl</a></p>
      </footer>
    </main>
  );
}
