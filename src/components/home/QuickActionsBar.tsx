"use client";

import Link from "next/link";
import { CalendarDays, Siren, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { CLINIC } from "@/lib/data/clinic";

export function QuickActionsBar() {
  const t = useTranslations("quickActions");

  const ACTIONS = [
    {
      icon: CalendarDays,
      title: t("book"),
      description: t("bookDesc"),
      href: "/citas",
      isExternal: false,
      accent: true,
    },
    {
      icon: Siren,
      title: t("call"),
      description: t("callDesc"),
      href: CLINIC.emergencyPhoneHref,
      isExternal: false,
      accent: false,
    },
    {
      icon: MapPin,
      title: t("directions"),
      description: t("directionsDesc"),
      href: CLINIC.address.googleMapsUrl,
      isExternal: true,
      accent: false,
    },
  ];

  return (
    <section className="max-w-5xl mx-auto px-4 -mt-6 relative z-10" aria-label="Acciones rápidas">
      <div className="bg-white rounded-2xl shadow-xl border border-brand-border overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-brand-border">
          {ACTIONS.map(({ icon: Icon, title, description, href, isExternal, accent }) => (
            <Link
              key={title}
              href={href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className={`flex items-center gap-4 px-6 py-5 group transition-colors hover:bg-primary-light ${
                accent ? "bg-accent/5" : ""
              }`}
            >
              <div
                className={`p-3 rounded-xl shrink-0 transition-colors ${
                  accent
                    ? "bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white"
                    : "bg-primary-light text-primary group-hover:bg-primary group-hover:text-white"
                }`}
              >
                <Icon size={22} />
              </div>
              <div>
                <p className={`font-semibold text-brand-text ${accent ? "text-accent" : ""}`}>
                  {title}
                </p>
                <p className="text-sm text-brand-muted">{description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
