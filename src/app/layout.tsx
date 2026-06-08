import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trámites DOM en Chile — Precio exacto | APPARQ",
  description: "Permisos de construcción, regularización y más. Arquitecto verificado asignado en 24h. Cotiza gratis.",
  metadataBase: new URL("https://tramites.apparq.cl"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className={`${inter.className} min-h-full flex flex-col`}>{children}</body>
    </html>
  );
}
