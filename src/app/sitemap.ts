import type { MetadataRoute } from 'next';
export const dynamic = 'force-static';
import { TRAMITES } from '@/data/tramites';
import { COMUNAS } from '@/data/comunas';

const BASE = 'https://tramites.apparq.cl';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const home: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
  ];

  // Páginas hub — una por trámite
  const hubs: MetadataRoute.Sitemap = TRAMITES.map(t => ({
    url: `${BASE}/tramites/${t.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Páginas leaf — trámite × comuna (todas las combinaciones)
  const leaves: MetadataRoute.Sitemap = [];
  for (const t of TRAMITES) {
    for (const c of COMUNAS) {
      leaves.push({
        url: `${BASE}/tramites/${t.slug}/${c.slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: c.prioridad === 1 ? 0.8 : c.prioridad === 2 ? 0.7 : 0.5,
      });
    }
  }

  return [...home, ...hubs, ...leaves];
}
