// data/tramites.ts — catálogo completo de trámites APPARQ
export const TRAMITES = [
  // ── PERMISOS NUEVOS ──────────────────────────────────────────
  {
    slug: 'piscina',
    nombre: 'Permiso de Piscina',
    titulo_seo: 'Permiso de piscina',
    h1_pattern: 'Permiso de piscina en {comuna}',
    descripcion: 'Tramita tu permiso de piscina con arquitecto verificado. Precio exacto antes de comprometerte.',
    precio_desde: 390000,
  },
  {
    slug: 'ampliacion',
    nombre: 'Permiso de Ampliación',
    titulo_seo: 'Permiso de ampliación',
    h1_pattern: 'Permiso de ampliación en {comuna}',
    descripcion: 'Ampliación de vivienda con permiso DOM a precio exacto. Arquitecto asignado en 24h.',
    precio_desde: 590000,
  },
  {
    slug: 'permiso-edificacion',
    nombre: 'Permiso de Edificación',
    titulo_seo: 'Permiso de edificación',
    h1_pattern: 'Permiso de edificación en {comuna}',
    descripcion: 'Obra nueva con permiso de edificación completo. Arquitecto verificado en tu comuna.',
    precio_desde: 890000,
  },
  {
    slug: 'obras-menores',
    nombre: 'Obras Menores',
    titulo_seo: 'Permiso de obras menores',
    h1_pattern: 'Obras menores en {comuna}',
    descripcion: 'Permiso de obras menores rápido y a precio exacto. Sin burocracia.',
    precio_desde: 290000,
  },
  {
    slug: 'demolicion',
    nombre: 'Permiso de Demolición',
    titulo_seo: 'Permiso de demolición',
    h1_pattern: 'Permiso de demolición en {comuna}',
    descripcion: 'Demolición con permiso o declaración jurada DOM. Precio fijo, sin sorpresas.',
    precio_desde: 350000,
  },
  {
    slug: 'declaracion-jurada',
    nombre: 'Declaración Jurada DDU 542',
    titulo_seo: 'Declaración jurada piscina y pérgola',
    h1_pattern: 'Declaración jurada en {comuna} — DDU 542',
    descripcion: 'Piscinas y pérgolas sin permiso DOM. Trámite express Ley 21.718. Precio fijo.',
    precio_desde: 290000,
  },
  {
    slug: 'pergola',
    nombre: 'Permiso de Pérgola',
    titulo_seo: 'Permiso o declaración jurada de pérgola',
    h1_pattern: 'Pérgola o sombreadero en {comuna}',
    descripcion: 'Pérgolas y cubiertas: permiso DOM o declaración jurada según tu caso.',
    precio_desde: 290000,
  },
  {
    slug: 'recepcion-final',
    nombre: 'Recepción Final',
    titulo_seo: 'Recepción final de obra',
    h1_pattern: 'Recepción final en {comuna}',
    descripcion: 'Obtén la recepción final de tu obra con arquitecto verificado. Precio exacto.',
    precio_desde: 590000,
  },
  {
    slug: 'cambio-destino',
    nombre: 'Cambio de Destino',
    titulo_seo: 'Cambio de destino de inmueble',
    h1_pattern: 'Cambio de destino en {comuna}',
    descripcion: 'Cambia el uso de tu propiedad con permiso DOM. Arquitecto verificado.',
    precio_desde: 490000,
  },
  // ── REGULARIZACIÓN ───────────────────────────────────────────
  {
    slug: 'regularizacion',
    nombre: 'Regularización de Vivienda',
    titulo_seo: 'Regularizar casa o ampliación',
    h1_pattern: 'Regularizar casa en {comuna} — precio exacto',
    descripcion: 'Regulariza tu vivienda o ampliación ante la DOM. Arquitecto verificado, precio exacto antes de comprometerte.',
    precio_desde: 590000,
  },
  {
    slug: 'informe-propiedad',
    nombre: 'Informe de Propiedad',
    titulo_seo: 'Informe técnico de propiedad',
    h1_pattern: 'Informe de propiedad en {comuna}',
    descripcion: 'Evaluación técnica del estado legal de tu propiedad. Ideal para compraventa.',
    precio_desde: 290000,
  },
] as const;

export type TramiteSlug = typeof TRAMITES[number]['slug'];
export type Tramite = typeof TRAMITES[number];

export function getTramiteBySlug(slug: string): Tramite | undefined {
  return TRAMITES.find(t => t.slug === slug);
}
