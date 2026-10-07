# Medipab — Hospital de Especialidades

Sitio web institucional de Medipab, Hospital de Especialidades (Pabellón de Arteaga, Aguascalientes).
Basado en la estructura del sitio de Clínica Crystal.

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · shadcn/ui · next-intl (es / en) · Framer Motion

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
npm run lint
```

## Estructura de contenido

- Datos del hospital, servicios y médicos: `src/lib/data/`
- Textos de interfaz: `messages/es.json` y `messages/en.json`
- Logo maestro (SVG/PNG): `logo/`

## Publicación

GitHub (`maxinaDigital`) → Vercel (configuración en `vercel.json`), igual que Clínica Crystal.

1. Crear el repositorio `maxinaDigital/web-Medipab` (vacío, sin README) y subir `main`.
2. En Vercel: *Add New Project* → importar el repositorio (detecta Next.js y `vercel.json`).
3. Variable de entorno en Vercel: `NEXT_PUBLIC_SITE_URL` = dominio final (ej. `https://medipab.com.mx`).
   Alimenta metadatos, Open Graph, JSON-LD, `/sitemap.xml` y `/robots.txt`.
4. Conectar el dominio del cliente en *Settings → Domains*.

**Bloqueo de publicación:** el build de producción de Vercel (`VERCEL_ENV=production`) falla a propósito mientras
`CLINIC.whatsapp` en `src/lib/data/clinic.ts` siga siendo el número de relleno, para que el formulario de citas no
envíe datos de pacientes a un número ajeno. Los *preview deployments* sí se publican.

Antes de producción, revisar los `PENDIENTE` de `src/lib/data/clinic.ts` y la lista en `CLAUDE.md`.
