"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Ambulance, BedSingle, Baby, Bone, ChevronRight, Droplet, FlaskConical, Heart, HeartPulse,
  MessageCircle, Pill, ScanLine, Scissors, Search, Siren, Smile, Stethoscope, X,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { services, type ServiceCategory } from "@/lib/data/services";
import { CLINIC } from "@/lib/data/clinic";

// Importación explícita: `import * as` en un componente cliente mete toda la librería de íconos al bundle.
const ICON_MAP: Record<string, React.ElementType> = {
  Ambulance, BedSingle, Baby, Bone, Droplet, FlaskConical, Heart, HeartPulse,
  Pill, ScanLine, Scissors, Siren, Smile, Stethoscope,
};

const CATEGORIES: ServiceCategory[] = ["urgencias", "especialidades", "diagnostico", "apoyo"];

type ServiceText = { name: string; desc: string; full: string; conditions: string[] };

// Minúsculas y sin acentos, para que "fractura" encuentre "Fracturas" y "cirugia" encuentre "Cirugía".
function normalize(text: string): string {
  return text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

export function ServicesDirectory() {
  const t = useTranslations("servicesPage");
  const ts = useTranslations("servicesSection");
  const tc = useTranslations("common");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ServiceCategory | "all">("all");

  // Índice de búsqueda por servicio: nombre, descripciones y padecimientos en el idioma activo
  const index = useMemo(
    () =>
      services.map((service) => {
        const text = ts.raw(`items.${service.slug}`) as ServiceText;
        return {
          service,
          text,
          haystack: normalize([text.name, text.desc, text.full, ...text.conditions].join(" ")),
        };
      }),
    [ts]
  );

  const terms = normalize(query).split(/\s+/).filter(Boolean);
  const results = index.filter(
    ({ service, haystack }) =>
      (category === "all" || service.category === category) &&
      terms.every((term) => haystack.includes(term))
  );

  const clear = () => {
    setQuery("");
    setCategory("all");
  };

  const chipClass = (active: boolean) =>
    `px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
      active
        ? "bg-primary text-white border-primary"
        : "bg-white text-brand-text border-brand-border hover:border-primary hover:text-primary"
    }`;

  return (
    <div className="mt-12">
      {/* Buscador */}
      <div className="max-w-xl mx-auto">
        <label htmlFor="service-search" className="sr-only">
          {t("searchLabel")}
        </label>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-muted" aria-hidden="true" />
          <input
            id="service-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-brand-border bg-white text-brand-text placeholder:text-brand-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
          />
        </div>
      </div>

      {/* Categorías */}
      <div className="mt-6 flex flex-wrap justify-center gap-2" role="group" aria-label={t("categoryLabel")}>
        <button type="button" onClick={() => setCategory("all")} aria-pressed={category === "all"} className={chipClass(category === "all")}>
          {t("categoryAll")}
        </button>
        {CATEGORIES.map((c) => (
          <button key={c} type="button" onClick={() => setCategory(c)} aria-pressed={category === c} className={chipClass(category === c)}>
            {t(`categories.${c}`)}
          </button>
        ))}
      </div>

      <p className="mt-6 text-center text-sm text-brand-muted" aria-live="polite">
        {t("resultsCount", { count: results.length })}
      </p>

      {results.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map(({ service, text }) => {
            const Icon = ICON_MAP[service.icon] ?? Stethoscope;
            return (
              <Link
                key={service.slug}
                href={`/servicios/${service.slug}`}
                className="group flex flex-col bg-white rounded-2xl border border-brand-border p-7 hover:border-primary hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-3 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                    <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-accent text-right">
                    {t(`categories.${service.category}`)}
                  </span>
                </div>
                <h2 className="font-heading text-xl font-semibold text-brand-text mb-2 group-hover:text-primary transition-colors">
                  {text.name}
                </h2>
                <p className="text-brand-muted text-sm leading-relaxed mb-4 flex-1">{text.desc}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                  {tc("seeDetails")} <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="mt-6 max-w-xl mx-auto text-center bg-white rounded-2xl border border-brand-border p-8">
          <p className="text-brand-muted">{t("noResults")}</p>
          <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent(
                `Hola, estoy buscando atención para: ${query.trim()}. ¿Me pueden orientar?`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
            >
              <MessageCircle className="w-4 h-4" /> {tc("bookWhatsApp")}
            </a>
            <button
              type="button"
              onClick={clear}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <X className="w-4 h-4" /> {t("clearFilters")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
