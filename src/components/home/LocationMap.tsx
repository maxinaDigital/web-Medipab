"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Mail, Navigation } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { CLINIC, NEARBY_TOWNS, addressLines, directionsUrl } from "@/lib/data/clinic";

export function LocationMap() {
  const t = useTranslations("locationSection");
  const tc = useTranslations("common");

  const HOURS_TABLE = [
    { label: t("h1"), value: t("h1Val") },
    { label: t("h2"), value: t("h2Val") },
    { label: t("h3"), value: t("h3Val") },
    { label: t("h4"), value: t("h4Val") },
  ];

  return (
    <section className="py-20 bg-brand-bg">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle
          eyebrow={t("eyebrow")}
          title={t("title")}
          titleAccent={t("titleAccent")}
          description={t("description")}
          centered
        />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Info card */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" as const }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl border border-brand-border p-6 space-y-5">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-brand-text">{t("addressLabel")}</p>
                  {addressLines().map((line, i) => (
                    <p key={line} className={`text-brand-muted text-sm${i === 0 ? " mt-0.5" : ""}`}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>

              <div className="h-px bg-brand-border" />

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-brand-text">{t("phoneLabel")}</p>
                  <a
                    href={CLINIC.phoneHref}
                    className="text-primary hover:underline text-sm mt-0.5 block"
                  >
                    {CLINIC.phone}
                  </a>
                </div>
              </div>

              <div className="h-px bg-brand-border" />

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-brand-text">{t("emailLabel")}</p>
                  <a
                    href={`mailto:${CLINIC.email}`}
                    className="text-primary hover:underline text-sm mt-0.5 block"
                  >
                    {CLINIC.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Hours table */}
            <div className="bg-white rounded-2xl border border-brand-border p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <p className="font-semibold text-brand-text">{t("hoursLabel")}</p>
              </div>
              <div className="space-y-3">
                {HOURS_TABLE.map((row) => (
                  <div key={row.label} className="flex items-center justify-between text-sm">
                    <span className="text-brand-muted">{row.label}</span>
                    <span
                      className={`font-medium ${
                        row.value.includes("24")
                          ? "text-brand-success"
                          : "text-brand-text"
                      }`}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-brand-border">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-success animate-pulse" />
                  <span className="text-brand-success text-sm font-medium">
                    {tc("openNow")}
                  </span>
                </div>
              </div>
            </div>

            {/* Cómo llegar desde municipios vecinos */}
            <div className="bg-white rounded-2xl border border-brand-border p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center">
                  <Navigation className="w-5 h-5 text-primary" />
                </div>
                <p className="font-semibold text-brand-text">{t("fromTitle")}</p>
              </div>
              <p className="text-sm text-brand-muted mb-4">{t("fromDesc")}</p>
              <ul className="flex flex-wrap gap-2" role="list">
                {NEARBY_TOWNS.map((town) => (
                  <li key={town}>
                    <a
                      href={directionsUrl(town)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block rounded-full border border-brand-border px-3.5 py-1.5 text-sm text-brand-text hover:border-primary hover:text-primary transition-colors"
                    >
                      {town}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" as const }}
            className="rounded-2xl overflow-hidden border border-brand-border shadow-sm h-[420px] lg:h-full min-h-[420px]"
          >
            <iframe
              src={CLINIC.address.googleMapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "420px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Ubicación de ${CLINIC.fullName} en ${CLINIC.address.city}`}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
