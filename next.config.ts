import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',        // genera carpeta /out — compatible con Cloudflare Pages
  trailingSlash: true,     // /tramites/regularizacion/santiago/ → mejor SEO
  images: { unoptimized: true }, // requerido para static export
};

export default nextConfig;
