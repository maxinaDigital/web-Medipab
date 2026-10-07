# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Institutional website for **Clínica Crystal**, a private medical clinic in Aguascalientes, México (founded May 2022). Built with Next.js 14 App Router + Tailwind CSS + shadcn/ui + TypeScript strict.

## Commands

```bash
npm run dev        # start dev server at localhost:3000
npm run build      # production build (run before any deploy)
npm run lint       # ESLint check
npx next-sitemap   # regenerate sitemap after adding pages
```

Run a single type-check without building:
```bash
npx tsc --noEmit
```

## Architecture

```
src/
  app/                    # Next.js App Router pages
    layout.tsx            # root layout — fonts, metadata, JSON-LD MedicalOrganization
    page.tsx              # Home (composes /components/home/* sections)
    nosotros/page.tsx
    servicios/
      page.tsx
      [slug]/page.tsx     # generateStaticParams() from lib/data/services.ts
    medicos/
      page.tsx
      [slug]/page.tsx     # generateStaticParams() from lib/data/doctors.ts
    citas/page.tsx        # appointment form → WhatsApp redirect (no API route)
    contacto/page.tsx
    preguntas-frecuentes/page.tsx
  components/
    layout/               # Header, Footer, QuickActionsBar
    home/                 # one file per home section (HeroSection, TrustSignals…)
    shared/               # ServiceCard, DoctorCard, AppointmentButton, SectionTitle
    ui/                   # shadcn generated components — do not edit manually
  lib/
    data/
      clinic.ts           # real address, hours, phone, trust stats
      services.ts         # 8 services with slug, icon, faq[], etc.
      doctors.ts          # 4 placeholder doctors with cedula, bio, schedule
    validations/
      appointmentSchema.ts  # Zod schema with MX phone regex
    utils.ts              # shadcn cn() helper
  styles/
    globals.css           # CSS variables + shadcn token overrides
```

## Real Clinic Data

- **Address**: Av. del Parque #348, Col. Jardines del Parque, CP 20276, Aguascalientes, Ags.
  (entre Av. del Lago y Av. Héroe de Nacozari)
- **Phone placeholder**: (449) 000-0000
- **Email placeholder**: contacto@clinicacrystal.com
- **Hours**: 24/7, 365 días al año
- **RFC**: CCR220517JW8
- **Founded**: ~June 2025 (2 meses de inaugurada al momento del proyecto)

### Key differentiators (always highlight in copy):
- Clínica recién inaugurada (~2 meses) — NO presumir tiempo operando; enfocarse en médicos reconocidos y certificados
- 3 quirófanos exclusivos de maternidad (fuerte enfoque neonatal)
- 2 quirófanos de cirugía general
- Imagenología propia (ultrasonido, rayos X)
- Laboratorio clínico in-house
- Cafetería y salas de estar en todos los niveles

## Color System

CSS variables defined in `globals.css`. Use them in Tailwind via the `brand-*` and `primary-*` token classes configured in `tailwind.config.ts`:

| Token class | Value | Use |
|---|---|---|
| `text-primary` | `#2AACAC` | Brand teal (matches logo) |
| `bg-primary-light` | `#E0F7F7` | Soft section backgrounds |
| `text-accent` | `#0EA5E9` | CTA buttons |
| `bg-brand-bg` | `#F8FAFB` | Page background |
| `text-brand-muted` | `#64748B` | Secondary text |

## Conventions

- **Fonts**: `font-heading` (Playfair Display) for h1–h6; body uses Inter via CSS variable `--font-inter`
- **Components**: named exports only, no default exports
- **File naming**: PascalCase for components, kebab-case for pages/routes
- **Images**: always `next/image` with explicit `width`, `height`, and descriptive `alt` in Spanish
- **Language**: all user-facing copy in Spanish (Mexico)
- **Animations**: Framer Motion only for subtle entrance animations (fade-in, slight y-translate). No spins or bounces.
- **Forms**: React Hook Form + Zod. The citas form submits via WhatsApp redirect (`wa.me/` link), no API route.
- **No dark mode** in phase 1.
- **Mobile-first**: design at `sm` breakpoint, expand upward.
- **Accessibility**: `aria-label` on icon-only buttons; maintain WCAG AA contrast.

## SEO Rules

- Every page must export a `generateMetadata()` or static `metadata` object with `title` and `description`.
- Dynamic service/doctor pages: `generateMetadata()` + `generateStaticParams()` from data files.
- JSON-LD: `MedicalOrganization` in root layout; `MedicalService` on service pages; `Physician` on doctor pages.
- URLs in Spanish: `/servicios/medicina-general`, `/medicos/dra-maria-lopez`.

## shadcn Components Available

`button`, `card`, `input`, `textarea`, `select`, `checkbox`, `label`, `badge`, `separator`, `accordion`

Add new ones with: `npx shadcn@latest add <component-name>`
