import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// Cabeceras de seguridad para todas las rutas. No se define una CSP completa porque Next 14 inyecta
// scripts inline (requeriría nonces); frame-ancestors evita que el sitio se incruste en otros dominios.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // El sitio solo usa SVG locales con next/image; se desactiva el optimizador (/_next/image),
  // que concentra varios avisos de seguridad de Next 14 (GHSA-2xp9-vwfh-vxw4, GHSA-h64f-5h5j-jqjh).
  images: { unoptimized: true },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default withNextIntl(nextConfig);
