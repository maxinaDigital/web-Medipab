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

GitHub (`maxinaDigital`) → Vercel (configuración en `vercel.json`).
