import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { CLINIC, addressLines } from "@/lib/data/clinic";
import { ContactLink } from "@/components/shared/ContactLink";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacta a Medipab Hospital de Especialidades en Pabellón de Arteaga, Aguascalientes. Urgencias abiertas las 24 horas.",
};

export default async function ContactoPage() {
  const t = await getTranslations("contactPage");
  const tl = await getTranslations("locationSection");
  const tc = await getTranslations("common");

  const CONTACT_ITEMS = [
    {
      icon: MapPin,
      title: tl("addressLabel"),
      lines: addressLines(),
    },
    {
      icon: Phone,
      title: tl("phoneLabel"),
      lines: [CLINIC.phone],
      href: CLINIC.phoneHref,
    },
    {
      icon: Mail,
      title: tl("emailLabel"),
      lines: [CLINIC.email],
      href: `mailto:${CLINIC.email}`,
    },
    {
      icon: Clock,
      title: tl("hoursLabel"),
      lines: [tc("openNow")],
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-ocean-from to-ocean-to">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-primary-light text-sm font-semibold uppercase tracking-widest mb-4">
            {t("eyebrow")}
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            {t("title")} <span className="text-glow-light">{t("titleAccent")}</span>
          </h1>
          <p className="text-white/75 text-lg max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>
      </section>

      <section className="py-20 bg-brand-bg">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Datos de contacto */}
          <div className="space-y-5">
            <h2 className="font-heading text-2xl font-bold text-brand-text mb-2">
              {t("infoTitle")}
            </h2>

            {CONTACT_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex gap-4 bg-white rounded-2xl border border-brand-border p-5">
                  <div className="w-11 h-11 rounded-xl bg-primary-light flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-brand-text mb-1">{item.title}</p>
                    {item.lines.map((line, i) =>
                      item.href && i === 0 ? (
                        <a
                          key={line}
                          href={item.href}
                          className="block text-primary hover:underline text-sm"
                        >
                          {line}
                        </a>
                      ) : (
                        <p key={line} className="text-brand-muted text-sm">
                          {line}
                        </p>
                      )
                    )}
                  </div>
                </div>
              );
            })}

            {/* WhatsApp CTA */}
            <ContactLink
              message={`Hola, me gustaría obtener más información sobre ${CLINIC.name}.`}
              whatsappLabel={t("whatsAppBtn")}
              callLabel={`${tc("callUs")}: ${CLINIC.phone}`}
              className="flex items-center justify-center gap-2 bg-primary text-white py-3 px-6 rounded-xl font-medium hover:bg-primary-dark transition-colors w-full"
              iconClassName="w-5 h-5"
            />
          </div>

          {/* Mapa */}
          <div className="rounded-2xl overflow-hidden border border-brand-border shadow-sm min-h-[420px]">
            <iframe
              src={CLINIC.address.googleMapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "420px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Ubicación de ${CLINIC.fullName}`}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
