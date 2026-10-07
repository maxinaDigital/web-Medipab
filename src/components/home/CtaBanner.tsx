"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarCheck, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { CLINIC } from "@/lib/data/clinic";
import { buttonVariants } from "@/components/ui/button";

export function CtaBanner() {
  const t = useTranslations("ctaBannerSection");

  return (
    <section className="py-20 bg-gradient-to-br from-ocean-from to-ocean-to overflow-hidden relative">
      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
        >
          <p className="text-primary-light text-sm font-semibold uppercase tracking-widest mb-4">
            {t("eyebrow")}
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
            {t("title")}{" "}
            <span className="text-glow-light">{t("titleAccent")}</span>
          </h2>
          <p className="text-white/75 text-lg max-w-2xl mx-auto mb-10">
            {t("description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/citas"
              className={buttonVariants({ size: "lg", variant: "accent" }) + " shadow-lg shadow-accent/30 flex items-center gap-2"}
            >
              <CalendarCheck className="w-5 h-5" />
              {t("cta1")}
            </Link>
            <a
              href={CLINIC.phoneHref}
              className="inline-flex items-center gap-2 h-12 px-7 text-base rounded-lg border-2 border-white/40 text-white hover:bg-white/10 hover:border-white transition-colors font-medium"
            >
              <Phone className="w-5 h-5" />
              {t("cta2")}: {CLINIC.phone}
            </a>
          </div>

          <p className="mt-6 text-white/50 text-sm">
            {t("disclaimer")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
