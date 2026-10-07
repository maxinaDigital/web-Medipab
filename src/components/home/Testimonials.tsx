"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionTitle } from "@/components/shared/SectionTitle";

const TESTIMONIALS = [
  {
    name: "María González",
    role: "Paciente de Maternidad",
    text: "La atención durante mi parto fue excepcional. El equipo de maternidad me transmitió mucha seguridad desde el primer momento. Los quirófanos son modernos y el personal es muy profesional. Sin duda el mejor lugar para dar a luz en Aguascalientes.",
    stars: 5,
  },
  {
    name: "Roberto Jiménez",
    role: "Paciente de Cirugía",
    text: "Me operaron de la vesícula de forma laparoscópica. El Dr. Herrera me explicó todo el procedimiento con detalle y la recuperación fue rápida. La clínica está muy limpia y la atención fue impecable desde admisión hasta el alta.",
    stars: 5,
  },
  {
    name: "Fernanda Ruiz",
    role: "Paciente de Pediatría",
    text: "Mi bebé recién nacido necesitó cuidados especiales y el Dr. Medina estuvo pendiente en todo momento. La unidad neonatal nos brindó mucha confianza. Como mamá, saber que tenemos un neonatólogo de guardia 24/7 es invaluable.",
    stars: 5,
  },
  {
    name: "Alejandro Torres",
    role: "Paciente de Nutrición",
    text: "La Dra. Villa transformó mi relación con la alimentación. Su plan es práctico, sin restricciones absurdas. En 3 meses bajé 8 kilos y me siento con mucha energía. Lo mejor es que el enfoque está integrado con mis otros médicos de la clínica.",
    stars: 5,
  },
];

export function Testimonials() {
  const t = useTranslations("testimonialsSection");

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
