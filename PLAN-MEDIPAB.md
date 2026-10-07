# Plan — Sitio web Medipab, Hospital de Especialidades (Pabellón de Arteaga, Ags.)

Base: duplicar **Clínica Crystal Web** (`../Clinica Crystal Web`) y cambiar solo identidad, contenido y algunos controles.
Misma tecnología y mismo proceso de publicación.

## Stack heredado de Crystal (sin cambios)

| Pieza | Versión / detalle |
|---|---|
| Framework | Next.js 14.2 (App Router) + React 18 + TypeScript strict |
| Estilos | Tailwind CSS 3.4 + shadcn/ui + lucide-react |
| Animación | framer-motion (solo entradas sutiles) |
| Formularios | React Hook Form + Zod → envío por WhatsApp (`wa.me`), sin API |
| Idiomas | next-intl con cookie `NEXT_LOCALE` (`messages/es.json`, `en.json`, `ja.json`) |
| SEO | `metadata` por página, JSON-LD (`MedicalOrganization`, `MedicalService`, `Physician`), next-sitemap |
| Deploy | GitHub (org `maxinaDigital`) → Vercel con `vercel.json` (`next build`, salida `.next`) |

Páginas: Inicio, Nosotros, Servicios (+ detalle `[slug]`), Médicos (+ detalle `[slug]`), Citas, Contacto, Preguntas frecuentes.

---

## Fase 0 — Datos que necesitamos del cliente

Sin esto el sitio queda con *placeholders* (como pasó en Crystal con teléfono y correo):

- [ ] Razón social, RFC, año de apertura
- [ ] Dirección exacta en Pabellón de Arteaga (calle, número, colonia, CP) y referencia para Google Maps
- [ ] Teléfono de conmutador, **teléfono de Urgencias**, WhatsApp, correo
- [ ] Horarios: ¿Urgencias 24/7? ¿consulta externa? ¿horario de visitas a hospitalización?
- [ ] Lista real de especialidades/servicios (y cuáles son el fuerte del hospital)
- [ ] Infraestructura: quirófanos, camas, UCI/UCIN, laboratorio, imagenología (RX, US, TAC), farmacia, ambulancia
- [ ] Médicos: nombre, especialidad, cédula profesional, foto, horario
- [ ] Aseguradoras / convenios aceptados (solo si son reales)
- [ ] Fotos de instalaciones (fachada, quirófano, habitaciones, recepción)
- [ ] Redes sociales y dominio (¿`medipab.com.mx`? ¿ya lo tienen?)
- [ ] ¿Qué significan las siglas **HMP** del emblema? (para la sección Nosotros)

## Fase 1 — Clonar la base

1. Copiar Crystal a `Medipab Web` **excluyendo** `.git`, `node_modules`, `.next`, `*.pdf`, `tsconfig.tsbuildinfo`.
2. `git init` + rama `main`, primer commit "Base duplicada de Clínica Crystal".
3. `package.json`: `name` → `medipab-web`. `.claude/launch.json`: nombre `medipab-dev` (puerto 3001 para poder correr ambos a la vez).
4. `npm install` → `npm run build` debe quedar verde **antes** de tocar nada.
5. Reescribir `CLAUDE.md` y `README.md` con los datos de Medipab.

## Fase 2 — Identidad visual

**Logo** (ya hecho, carpeta `logo/`): versión vectorial limpia del logo original.

| Archivo | Uso en el sitio |
|---|---|
| `medipab-logo.svg` | Header (fondo claro) → `public/images/` |
| `medipab-logo-blanco.svg` | Footer y secciones oscuras |
| `medipab-icono.svg` / `-512.png` | Emblema suelto, JSON-LD `logo`, Open Graph |
| `medipab-icono-180.png` / `-32.png` | `src/app/apple-icon.png` / `src/app/icon.png` |

**Paleta** (sacada del logo) — se cambia en `tailwind.config.ts`, manteniendo los mismos nombres de token para no tocar componentes:

| Token | Crystal | Medipab | Uso |
|---|---|---|---|
| `primary` | `#2AACAC` | `#14365A` (azul marino del logotipo) | Títulos, header, botones principales |
| `primary-light` | `#E0F7F7` | `#E8F1F8` | Fondos suaves de sección |
| `primary-dark` | `#1E8A8A` | `#0E2640` | Hover, footer |
| `accent` | `#0EA5E9` | `#2B9E96` (verde azulado del subtítulo) | CTAs "Agendar cita", íconos |
| `accent-dark` | `#0284C7` | `#1F7F78` | Hover de CTAs |
| nuevo `glow` | — | `#5FCAD0` (cian de la cruz) | Detalles, bordes, gradientes del hero |
| nuevo `urgent` | — | `#DC2626` | **Solo** botón/banda de Urgencias |

Revisar contraste WCAG AA del teal sobre blanco en textos pequeños (si no pasa, usar `accent-dark` para texto).

**Tipografía**: Crystal usa Playfair Display (serif, elegante, “clínica boutique”). Para Medipab cambiar títulos a **Montserrat** (la misma familia geométrica del logotipo) y conservar Inter en el cuerpo. Da un tono más institucional/hospitalario. Cambio en `layout.tsx` + `tailwind.config.ts` (`font-heading`).

**Logo en Header**: sustituir el `Logo.tsx` actual (ícono + texto armado) por el SVG completo con `next/image`; en móvil, solo el emblema + "MEDIPAB".

## Fase 3 — Contenido

Todo el texto vive en pocos archivos; el trabajo es casi solo de datos:

| Archivo | Cambio |
|---|---|
| `src/lib/data/clinic.ts` | Nombre, dirección, teléfonos (+ `emergencyPhone`), horarios, redes, `TRUST_STATS`, `FACILITIES` |
| `src/lib/data/services.ts` | Especialidades reales de Medipab (slug, ícono, descripción, FAQ) |
| `src/lib/data/doctors.ts` | Médicos reales (o placeholders marcados hasta tenerlos) |
| `messages/es.json` / `en.json` | Todos los textos de interfaz (20 secciones) |
| `src/app/layout.tsx` | `metadata`, Open Graph, JSON-LD → tipo `Hospital`, `metadataBase` con el dominio nuevo |
| 18 archivos con "Crystal" fijo en el código | Reemplazar por `CLINIC.name` desde `clinic.ts` para no dejar rastros |

**Enfoque de copy** (lo que diferencia a Medipab): hospital de especialidades **en el norte del estado** — atención de especialidad, urgencias y cirugía **sin tener que viajar a la capital**; cercanía para Pabellón de Arteaga, Rincón de Romos, San José de Gracia, Tepezalá y Cosío. Keywords SEO locales: "hospital Pabellón de Arteaga", "urgencias Pabellón de Arteaga", "especialistas norte de Aguascalientes".

**Idiomas**: Crystal tiene español, inglés y japonés. Propuesta: **es + en**, quitar `ja` (decisión pendiente, ver preguntas).

## Fase 4 — Controles que le dan identidad propia

Cambios de estructura acotados (reusan los componentes existentes de shadcn):

1. **Banda y botón de Urgencias 24 h** — franja superior en el Header con click-to-call al número de urgencias y botón flotante rojo en móvil. Es el control más distintivo de un hospital frente a una clínica.
2. **Directorio de especialidades con buscador** — en `/servicios`, campo de búsqueda + chips de filtro (Quirúrgicas, Materno-infantil, Diagnóstico, Consulta) en lugar de la cuadrícula fija.
3. **Médicos filtrables por especialidad** — en `/medicos`, mismo patrón de chips; el formulario de citas preselecciona especialidad/médico al venir desde una tarjeta.
4. **Sección "Hospitalización y visitas"** — reemplaza `MaternityHighlight` del inicio (que es específico de Crystal) con: habitaciones, horario de visitas, qué traer al internamiento, área destacada del hospital según los datos del cliente.
5. **"Cómo llegar desde tu municipio"** — en `LocationMap`, pestañas con tiempo aproximado desde los municipios cercanos.
6. **Aseguradoras y convenios** — tira de logos en el inicio (solo si el cliente confirma convenios reales).

Se conservan sin cambios: QuickActionsBar, HowItWorks, Testimonials (con testimonios reales o se oculta), CtaBanner, formulario de citas por WhatsApp, FAQ.

## Fase 5 — Pendientes heredados de Crystal que se corrigen aquí

- JSON-LD apunta a `/logo.svg` y Open Graph a `/og-image.jpg`, pero **no existen** en `public/` → crear ambos (OG 1200×630 con el logo).
- `next-sitemap` está instalado pero **no hay `next-sitemap.config.js`** → agregarlo.
- `foundingDate` del JSON-LD no coincide con los datos de la clínica → usar el dato real de Medipab.
- `README.md` es el de plantilla de create-next-app → reescribir.

## Fase 6 — QA y publicación (mismo proceso que Crystal)

1. `npx tsc --noEmit`, `npm run lint`, `npm run build` en verde.
2. Revisión en `npm run dev` en móvil (375 px) y escritorio, ambos idiomas, formulario de citas → WhatsApp.
3. `/code-review` sobre el diff antes de publicar.
4. Crear repo `maxinaDigital/web-Medipab`, push de `main`.
5. Vercel: importar el repo (detecta `vercel.json`), conectar dominio del cliente, verificar el sitio publicado.

## Orden sugerido de entrega

| Paso | Resultado visible |
|---|---|
| Fases 1–2 | Sitio clonado con colores, tipografía y logo de Medipab (contenido aún de Crystal) |
| Fase 3 | Contenido completo de Medipab (con placeholders marcados donde falten datos) |
| Fase 4 | Controles propios |
| Fases 5–6 | Correcciones, QA y publicación en Vercel |
