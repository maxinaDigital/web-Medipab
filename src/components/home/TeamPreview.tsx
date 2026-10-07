"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { User, ChevronRight, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { doctors } from "@/lib/data/doctors";
import { SPECIALTY_SERVICES } from "@/lib/data/services";
import { CLINIC, whatsappUrl } from "@/lib/data/clinic";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { buttonVariants } from "@/components/ui/button";

const FADE_UP = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: "easeOut" as const },
  }),
};

export function TeamPreview() {
  const t = useTranslations("teamSection");
  const tc = useTranslations("common");
  const td = useTranslations("doctors");
  const ts = useTranslations("servicesSection");
  const featured = doctors.slice(0, 4);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle
          eyebrow={t("eyebrow")}
          title={t("title")}
          titleAccent={t("titleAccent")}
          description={t("description")}
          centered
        />

        {featured.length > 0 ? (
          <>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featured.map((doctor, i) => (
                <motion.div
                  key={doctor.id}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={FADE_UP}
                >
                  <Link
                    href={`/medicos/${doctor.slug}`}
                    className="group block rounded-2xl border border-brand-border bg-brand-bg hover:border-primary hover:shadow-lg transition-all duration-300 overflow-hidden"
                  >
                    {/* Photo placeholder */}
                    <div className="relative h-52 bg-primary-light flex items-center justify-center">
                      <User className="w-20 h-20 text-primary opacity-40" />
                      <span className="absolute bottom-3 left-3 text-xs font-medium bg-white/90 text-brand-muted px-2 py-1 rounded-full">
                        {tc("cedula")}: {doctor.cedula}
                      </span>
                    </div>

                    <div className="p-5">
                      <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
                        {td(`${doctor.slug}.specialty`)}
                      </p>
                      <h3 className="font-heading text-lg font-semibold text-brand-text leading-tight group-hover:text-primary transition-colors">
                        {doctor.name}
                      </h3>
                      <p className="mt-2 text-sm text-brand-muted line-clamp-2">
                        {doctor.bio}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                        {tc("viewProfile")} <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link href="/medicos" className={buttonVariants({ variant: "outline", size: "lg" })}>
                {tc("seeAllDoctors")}
              </Link>
            </div>
          </>
        ) : (
          // Sin perfiles publicados todavía: directorio por especialidad + orientación por WhatsApp
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-12 rounded-2xl border border-brand-border bg-brand-bg p-8 text-center"
          >
            <ul className="flex flex-wrap justify-center gap-2" role="list">
              {SPECIALTY_SERVICES.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/servicios/${s.slug}`}
                      className="inline-block rounded-full border border-brand-border bg-white px-4 py-2 text-sm font-medium text-brand-text hover:border-primary hover:text-primary transition-colors"
                    >
                      {ts(`items.${s.slug}.name`)}
                    </Link>
                  </li>
                ))}
            </ul>
            <p className="mt-6 text-sm text-brand-muted">{t("directoryNote")}</p>
            <a
              href={whatsappUrl(`Hola, me gustaría que me orienten para elegir un especialista en ${CLINIC.name}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              <MessageCircle size={18} />
              {t("directoryCta")}
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
