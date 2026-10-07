"use client";

import { useState } from "react";
import Link from "next/link";
import { User, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { doctors } from "@/lib/data/doctors";
import { services } from "@/lib/data/services";

// Directorio de médicos con filtro por especialidad (solo se muestran especialidades que tienen médicos).
export function DoctorsDirectory() {
  const t = useTranslations("doctorsPage");
  const tc = useTranslations("common");
  const td = useTranslations("doctors");
  const ts = useTranslations("servicesSection");
  const [specialty, setSpecialty] = useState<string>("all");

  const specialties = services.filter((s) => doctors.some((d) => d.servicesSlugs.includes(s.slug)));
  const visible =
    specialty === "all" ? doctors : doctors.filter((d) => d.servicesSlugs.includes(specialty));

  const chipClass = (active: boolean) =>
    `px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
      active
        ? "bg-primary text-white border-primary"
        : "bg-white text-brand-text border-brand-border hover:border-primary hover:text-primary"
    }`;

  return (
    <div className="mt-12">
      {specialties.length > 1 && (
        <div className="mb-8 flex flex-wrap justify-center gap-2" role="group" aria-label={t("filterLabel")}>
          <button
            type="button"
            onClick={() => setSpecialty("all")}
            aria-pressed={specialty === "all"}
            className={chipClass(specialty === "all")}
          >
            {t("filterAll")}
          </button>
          {specialties.map((s) => (
            <button
              key={s.slug}
              type="button"
              onClick={() => setSpecialty(s.slug)}
              aria-pressed={specialty === s.slug}
              className={chipClass(specialty === s.slug)}
            >
              {ts(`items.${s.slug}.name`)}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {visible.map((doctor) => (
          <Link
            key={doctor.slug}
            href={`/medicos/${doctor.slug}`}
            className="group bg-white rounded-2xl border border-brand-border hover:border-primary hover:shadow-lg transition-all duration-300 overflow-hidden flex gap-0 flex-col sm:flex-row"
          >
            {/* Photo placeholder */}
            <div className="sm:w-40 h-40 sm:h-auto bg-primary-light flex items-center justify-center flex-shrink-0">
              <User className="w-16 h-16 text-primary opacity-40" />
            </div>
            <div className="p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
                {td(`${doctor.slug}.specialty`)}
              </p>
              <h2 className="font-heading text-xl font-semibold text-brand-text mb-1 group-hover:text-primary transition-colors">
                {doctor.name}
              </h2>
              <p className="text-brand-muted text-xs mb-3">
                {tc("cedula")}: {doctor.cedula}
              </p>
              <p className="text-brand-muted text-sm leading-relaxed line-clamp-2 mb-4">{doctor.bio}</p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                {tc("viewProfile")} <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
