"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionTitle } from "@/components/shared/SectionTitle";

type Testimonial = { name: string; role: string; text: string; stars: number };

// PENDIENTE: solo testimonios reales con autorización del paciente. Mientras esté vacío, la sección no se muestra.
const TESTIMONIALS: Testimonial[] = [];

export function Testimonials() {
  const t = useTranslations("testimonialsSection");

  if (TESTIMONIALS.length === 0) return null;

  return (
    <section className="py-20 bg-primary-light">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle
          eyebrow={t("eyebrow")}
          title={t("title")}
          titleAccent={t("titleAccent")}
          description={t("description")}
          centered
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" as const }}
              className="bg-white rounded-2xl p-7 shadow-sm border border-brand-border relative"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary opacity-15" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: item.stars }).map((_, s) => (
                  <Star key={s} className="w-4 h-4 fill-brand-warning text-brand-warning" />
                ))}
              </div>
              <p className="text-brand-text leading-relaxed text-sm mb-5">
                &ldquo;{item.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold text-sm">
                    {item.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-brand-text text-sm">{item.name}</p>
                  <p className="text-brand-muted text-xs">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
