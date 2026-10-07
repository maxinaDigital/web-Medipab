# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Institutional website for **Medipab, Hospital de Especialidades**, in Pabellón de Arteaga, Aguascalientes, México.
Duplicated from **Clínica Crystal Web** (`../Clinica Crystal Web`) — same stack, structure and deploy process; only identity, content and some controls differ. Work plan: `PLAN-MEDIPAB.md`.

Built with Next.js 14 App Router + Tailwind CSS + shadcn/ui + TypeScript strict + next-intl.

## Commands

```bash
npm run dev        # dev server (Claude preview: "medipab-dev" on port 3001)
npm run build      # production build (run before any deploy)
npm run lint       # ESLint check
npx tsc --noEmit   # type-check only
```

## Architecture

```
src/
  app/                    # App Router pages — root layout.tsx owns the single <main>; pages must not add another
    layout.tsx            # fonts, metadata, JSON-LD
    page.tsx              # Home (composes /components/home/* sections)
    nosotros/ servicios/[slug] medicos/[slug] citas/ contacto/ preguntas-frecuentes/
    icon.png, apple-icon.png   # favicon / iOS icon (from logo/)
  components/
    layout/               # Header (urgencias strip), Footer, Logo, LanguageSwitcher, EmergencyButton (mobile floating call)
    home/                 # one file per home section (incl. PatientGuide, LocationMap with directions from nearby towns)
    servicios/            # ServicesDirectory — accent-insensitive search + category chips
    medicos/              # DoctorsDirectory — specialty filter (only rendered when doctors.ts has profiles)
    citas/                # AppointmentForm (→ WhatsApp); /citas?servicio=<slug>&medico=<slug> preselects
    shared/               # SectionTitle
    ui/                   # shadcn generated components — do not edit manually
  i18n/request.ts         # locale from NEXT_LOCALE cookie (es | en)
  lib/data/               # clinic.ts, services.ts, doctors.ts — all institutional data lives here.
                          # Doctor↔service relation lives only in Doctor.servicesSlugs.
messages/                 # es.json, en.json (keep both in sync)
logo/                     # master logo files (SVG + PNG) and the script that generated them
public/images/            # logo SVGs served by the site
```

## Hospital data

Source: interview with the medical director (2026-10-03). Confirmed facts the copy relies on:

- Specialty hospital in operation in **Pabellón de Arteaga, Ags.**; single site, no branches.
- Address and main phone from the hospital's Google Maps listing (https://maps.app.goo.gl/sHdqc2kNK48Wzm8WA): Aquiles Serdán, Zona Centro, CP 20670; phone 465 1111 202 (display format confirmed by the user); open 24 h; coordinates in `CLINIC.geo`.
- **5 private rooms (1 bed each) + 3 emergency beds.**
- Services (14, one entry each in `lib/data/services.ts`): Urgencias 24 h, Hospitalización, UCI adultos, UCIN, Ginecobstetricia, Pediatría, Cirugía general, Ortopedia/trauma, Consulta externa, Laboratorio, Imagenología, Banco de sangre, Farmacia al público, Ambulancia.
- **~52 external doctors** managed by the hospital → copy says "más de 50".
- Works with insurers/agreements and issues CFDI invoices.

Do not invent facts that are not in that list (number of operating rooms, imaging modalities, hours other than 24 h ER/inpatient, fees, years of operation). The interview also contains internal IT/commercial notes; none of that goes on the site.

**Placeholders still pending from the client** (grep `PENDIENTE`): street number, direct emergency line (the switchboard is used meanwhile), WhatsApp number (all WhatsApp CTAs point to a placeholder), email, domain (`CLINIC.siteUrl` feeds metadata, sitemap and robots), legal name, social media (footer only renders networks with a URL), **legal review of `/aviso-de-privacidad`** (draft), doctor profiles (`doctors.ts` is intentionally empty — never add sample doctors), real testimonials (`Testimonials.tsx` hides itself while empty), mission/vision approval.

## Brand

Logo: `public/images/medipab-logo.svg` (light backgrounds), `medipab-logo-blanco.svg` (dark backgrounds), `medipab-icono.svg` (emblem only). Use the `<Logo variant="color|white" height={n} />` component; never recolor the logo with CSS filters.

| Token class | Value | Use |
|---|---|---|
| `primary` | `#14365A` | Navy from the MEDIPAB wordmark — headings, top bar, icons on light bg |
| `primary-light` / `primary-dark` | `#E8F1F8` / `#0E2640` | Soft section bg / footer, hovers |
| `accent` | `#1F7F78` | CTA buttons (white text passes AA) |
| `accent-bright` | `#2B9E96` | Logo teal — decorative or large text only (fails AA on white for small text) |
| `glow` / `glow-light` | `#5FCAD0` / `#8FE6EC` | Accents **on dark backgrounds only** (hero, footer, gradients) |
| `ocean-from/via/to` | `#0E2640` → `#15466F` → `#1B7C86` | Institutional gradient (`bg-gradient-to-br from-ocean-from to-ocean-to`) |
| `urgent` | `#DC2626` | Reserved for Urgencias controls |
| `brand-bg` / `brand-muted` | `#F7FAFC` / `#64748B` | Page background / secondary text |

On dark backgrounds never use `text-primary` (navy on navy) — use `text-white`, `text-glow` or `text-primary-light`.

## Conventions

- **Fonts**: `font-heading` = Montserrat (same geometric family as the logo) for h1–h6; body = Inter.
- **No hardcoded hex colors** in components — add a token to `tailwind.config.ts` instead.
- **Components**: named exports only, no default exports (except Next.js pages/layouts).
- **File naming**: PascalCase for components, kebab-case for routes.
- **Images**: `next/image` with explicit `width`, `height`, descriptive Spanish `alt`.
- **Language**: Spanish (México) is default; English is the only other locale. Every new key goes to both `messages/es.json` and `messages/en.json`.
- **Animations**: Framer Motion, subtle fade/slide entrances only.
- **Forms**: React Hook Form + Zod; citas submits via `wa.me/` link, no API route.
- **No dark mode** in phase 1. **Mobile-first**. `aria-label` on icon-only buttons; WCAG AA contrast.

## SEO Rules

- `app/sitemap.ts` and `app/robots.ts` (Next native) build /sitemap.xml and /robots.txt from `lib/data` — new pages must be added to `sitemap.ts`. The `next-sitemap` package inherited from Crystal is not used.

- Every page exports `metadata` / `generateMetadata()` with `title` and `description`.
- Dynamic pages: `generateMetadata()` + `generateStaticParams()` from `lib/data`.
- JSON-LD: organization in root layout (`Hospital` for Medipab); `MedicalService` on service pages; `Physician` on doctor pages.
- URLs in Spanish.

## Deploy

Same as Crystal: GitHub (org `maxinaDigital`) → Vercel, configured by `vercel.json`. Run `npm run build` green before pushing. Steps and env vars (`NEXT_PUBLIC_SITE_URL`) in README.

`assertLaunchReady()` (clinic.ts, called from the root layout) makes the **production** Vercel build fail while `CLINIC.whatsapp` is the placeholder; preview deployments are not blocked. Do not remove it to unblock a deploy — set the real number.
