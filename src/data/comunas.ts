// data/comunas.ts — comunas de Chile (Región Metropolitana + principales)
export interface Comuna {
  slug: string;       // URL slug (lowercase, sin tildes, guión medio)
  nombre: string;     // Nombre oficial
  region: string;     // Región
  prioridad: 1 | 2 | 3; // 1 = alta (RM central), 2 = media, 3 = baja
}

export const COMUNAS: Comuna[] = [
  // ── REGIÓN METROPOLITANA — PRIORIDAD 1 (RM central y mayor volumen) ──
  { slug: 'santiago',           nombre: 'Santiago',           region: 'RM', prioridad: 1 },
  { slug: 'providencia',        nombre: 'Providencia',        region: 'RM', prioridad: 1 },
  { slug: 'las-condes',         nombre: 'Las Condes',         region: 'RM', prioridad: 1 },
  { slug: 'vitacura',           nombre: 'Vitacura',           region: 'RM', prioridad: 1 },
  { slug: 'nunoa',              nombre: 'Ñuñoa',              region: 'RM', prioridad: 1 },
  { slug: 'maipu',              nombre: 'Maipú',              region: 'RM', prioridad: 1 },
  { slug: 'la-florida',         nombre: 'La Florida',         region: 'RM', prioridad: 1 },
  { slug: 'puente-alto',        nombre: 'Puente Alto',        region: 'RM', prioridad: 1 },
  { slug: 'san-bernardo',       nombre: 'San Bernardo',       region: 'RM', prioridad: 1 },
  { slug: 'la-reina',           nombre: 'La Reina',           region: 'RM', prioridad: 1 },
  { slug: 'penalolen',          nombre: 'Peñalolén',          region: 'RM', prioridad: 1 },
  { slug: 'macul',              nombre: 'Macul',              region: 'RM', prioridad: 1 },
  { slug: 'san-miguel',         nombre: 'San Miguel',         region: 'RM', prioridad: 1 },
  { slug: 'estacion-central',   nombre: 'Estación Central',   region: 'RM', prioridad: 1 },
  { slug: 'pudahuel',           nombre: 'Pudahuel',           region: 'RM', prioridad: 1 },
  { slug: 'quilicura',          nombre: 'Quilicura',          region: 'RM', prioridad: 1 },
  { slug: 'lo-barnechea',       nombre: 'Lo Barnechea',       region: 'RM', prioridad: 1 },
  { slug: 'recoleta',           nombre: 'Recoleta',           region: 'RM', prioridad: 1 },
  { slug: 'independencia',      nombre: 'Independencia',      region: 'RM', prioridad: 1 },
  { slug: 'cerrillos',          nombre: 'Cerrillos',          region: 'RM', prioridad: 1 },
  // ── REGIÓN METROPOLITANA — PRIORIDAD 2 ───────────────────────────────
  { slug: 'lo-espejo',          nombre: 'Lo Espejo',          region: 'RM', prioridad: 2 },
  { slug: 'el-bosque',          nombre: 'El Bosque',          region: 'RM', prioridad: 2 },
  { slug: 'la-granja',          nombre: 'La Granja',          region: 'RM', prioridad: 2 },
  { slug: 'la-pintana',         nombre: 'La Pintana',         region: 'RM', prioridad: 2 },
  { slug: 'san-ramon',          nombre: 'San Ramón',          region: 'RM', prioridad: 2 },
  { slug: 'san-joaquin',        nombre: 'San Joaquín',        region: 'RM', prioridad: 2 },
  { slug: 'pedro-aguirre-cerda',nombre: 'Pedro Aguirre Cerda',region: 'RM', prioridad: 2 },
  { slug: 'la-cisterna',        nombre: 'La Cisterna',        region: 'RM', prioridad: 2 },
  { slug: 'conchali',           nombre: 'Conchalí',           region: 'RM', prioridad: 2 },
  { slug: 'huechuraba',         nombre: 'Huechuraba',         region: 'RM', prioridad: 2 },
  { slug: 'renca',              nombre: 'Renca',              region: 'RM', prioridad: 2 },
  { slug: 'cerro-navia',        nombre: 'Cerro Navia',        region: 'RM', prioridad: 2 },
  { slug: 'lo-prado',           nombre: 'Lo Prado',           region: 'RM', prioridad: 2 },
  { slug: 'quinta-normal',      nombre: 'Quinta Normal',      region: 'RM', prioridad: 2 },
  { slug: 'buin',               nombre: 'Buin',               region: 'RM', prioridad: 2 },
  { slug: 'calera-de-tango',    nombre: 'Calera de Tango',    region: 'RM', prioridad: 2 },
  { slug: 'colina',             nombre: 'Colina',             region: 'RM', prioridad: 2 },
  { slug: 'lampa',              nombre: 'Lampa',              region: 'RM', prioridad: 2 },
  { slug: 'pirque',             nombre: 'Pirque',             region: 'RM', prioridad: 2 },
  { slug: 'san-jose-de-maipo',  nombre: 'San José de Maipo',  region: 'RM', prioridad: 2 },
  { slug: 'talagante',          nombre: 'Talagante',          region: 'RM', prioridad: 2 },
  { slug: 'el-monte',           nombre: 'El Monte',           region: 'RM', prioridad: 2 },
  { slug: 'isla-de-maipo',      nombre: 'Isla de Maipo',      region: 'RM', prioridad: 2 },
  { slug: 'paine',              nombre: 'Paine',              region: 'RM', prioridad: 2 },
  { slug: 'melipilla',          nombre: 'Melipilla',          region: 'RM', prioridad: 2 },
  { slug: 'alhue',              nombre: 'Alhué',              region: 'RM', prioridad: 2 },
  { slug: 'curacavi',           nombre: 'Curacaví',           region: 'RM', prioridad: 2 },
  { slug: 'maria-pinto',        nombre: 'María Pinto',        region: 'RM', prioridad: 2 },
  { slug: 'san-pedro',          nombre: 'San Pedro',          region: 'RM', prioridad: 2 },
  { slug: 'tiltil',             nombre: 'Tiltil',             region: 'RM', prioridad: 2 },
  { slug: 'padre-hurtado',      nombre: 'Padre Hurtado',      region: 'RM', prioridad: 2 },
  { slug: 'penaflor',            nombre: 'Peñaflor',            region: 'RM', prioridad: 2 },
  // ── OTRAS REGIONES — PRIORIDAD 3 ─────────────────────────────────────
  { slug: 'vina-del-mar',       nombre: 'Viña del Mar',       region: 'V',  prioridad: 3 },
  { slug: 'valparaiso',         nombre: 'Valparaíso',         region: 'V',  prioridad: 3 },
  { slug: 'concon',             nombre: 'Concón',             region: 'V',  prioridad: 3 },
  { slug: 'quilpue',            nombre: 'Quilpué',            region: 'V',  prioridad: 3 },
  { slug: 'villa-alemana',      nombre: 'Villa Alemana',      region: 'V',  prioridad: 3 },
  { slug: 'concepcion',         nombre: 'Concepción',         region: 'VIII', prioridad: 3 },
  { slug: 'talcahuano',         nombre: 'Talcahuano',         region: 'VIII', prioridad: 3 },
  { slug: 'temuco',             nombre: 'Temuco',             region: 'IX', prioridad: 3 },
  { slug: 'antofagasta',        nombre: 'Antofagasta',        region: 'II', prioridad: 3 },
  { slug: 'la-serena',          nombre: 'La Serena',          region: 'IV', prioridad: 3 },
  { slug: 'coquimbo',           nombre: 'Coquimbo',           region: 'IV', prioridad: 3 },
  { slug: 'rancagua',           nombre: 'Rancagua',           region: 'VI', prioridad: 3 },
  { slug: 'talca',              nombre: 'Talca',              region: 'VII', prioridad: 3 },
  { slug: 'iquique',            nombre: 'Iquique',            region: 'I',  prioridad: 3 },
  { slug: 'arica',              nombre: 'Arica',              region: 'XV', prioridad: 3 },
  { slug: 'la-estrella',        nombre: 'La Estrella',        region: 'VI', prioridad: 3 },
];

export function getComunaBySlug(slug: string): Comuna | undefined {
  return COMUNAS.find(c => c.slug === slug);
}

// Para generateStaticParams — prioridad 1 primero
export const COMUNAS_PRIORIDAD_1 = COMUNAS.filter(c => c.prioridad === 1);
export const COMUNAS_PRIORIDAD_1_2 = COMUNAS.filter(c => c.prioridad <= 2);
