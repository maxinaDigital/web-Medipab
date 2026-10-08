import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AppointmentForm } from "@/components/citas/AppointmentForm";
import { Phone, MessageCircle, Clock } from "lucide-react";
import { CLINIC, HAS_WHATSAPP, whatsappUrl } from "@/lib/data/clinic";

export const metadata: Metadata = {
  title: "Agendar cita",
  description:
    "Agenda tu consulta con un especialista en Medipab, Pabellón de Arteaga.",
};

export default async function CitasPage({
  searchParams,
}: {
  searchParams: { servicio?: string; medico?: string };
}) {
  const t = await getTranslations("appointmentPage");
  const tc = await getTranslations("common");

  return (
    <div>
      {/* Hero */}
      <section className="py-14 bg-gradient-to-br from-ocean-from to-ocean-to">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-primary-light text-sm font-semibold uppercase tracking-widest mb-3">
            {t("eyebrow")}
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            {t("title")}{" "}
            <span className="text-glow-light">{t("titleAccent")}</span>
          </h1>
          <p className="text-white/75 text-lg max-w-xl mx-auto">
            {HAS_WHATSAPP ? t("subtitle") : t("subtitlePhone")}
          </p>
        </div>
      </section>

      <section className="py-16 bg-brand-bg">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Formulario */}
          <div className="lg:col-span-2">
            {HAS_WHATSAPP ? (
              <AppointmentForm initialService={searchParams.servicio} initialDoctor={searchParams.medico} />
            ) : (
              // Sin WhatsApp el formulario no tiene a dónde enviar la solicitud: se agenda por teléfono
              <div className="bg-white rounded-2xl border border-brand-border p-8 md:p-10 text-center">
                <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center mx-auto mb-5">
                  <Phone className="w-8 h-8 text-primary" aria-hidden="true" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-brand-text mb-3">{t("phoneBookingTitle")}</h2>
                <p className="text-brand-muted max-w-md mx-auto mb-6">{t("phoneBookingDesc")}</p>
                <a
                  href={CLINIC.phoneHref}
                  className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white px-7 py-3.5 rounded-xl font-semibold text-lg transition-colors"
                >
                  <Phone className="w-5 h-5" aria-hidden="true" />
                  {CLINIC.phone}
                </a>
                <p className="text-brand-muted text-sm mt-4">{t("phoneBookingHours")}</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-brand-border p-6">
              <h2 className="font-heading text-lg font-bold text-brand-text mb-4">
                {t("contactTitle")}
              </h2>
              <div className="space-y-3">
                {HAS_WHATSAPP && (
                <a
                  href={whatsappUrl(`Hola, me gustaría agendar una cita en ${CLINIC.name}.`) ?? undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl border border-brand-border hover:border-primary hover:bg-primary-light transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium text-brand-text text-sm">{t("contactWhatsApp")}</p>
                    <p className="text-brand-muted text-xs">{tc("immediateResponse")}</p>
                  </div>
                </a>
                )}
                <a
                  href={CLINIC.phoneHref}
                  className="flex items-center gap-3 p-4 rounded-xl border border-brand-border hover:border-primary hover:bg-primary-light transition-colors"
                >
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium text-brand-text text-sm">{CLINIC.phone}</p>
                    <p className="text-brand-muted text-xs">{tc("directCall")}</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-primary-light rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-primary" />
                <p className="font-semibold text-brand-text">{t("openStatus")}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-success animate-pulse" />
                <span className="text-brand-success font-medium text-sm">
                  {tc("openNow")}
                </span>
              </div>
              <p className="text-brand-muted text-sm mt-2">
                {t("urgencies")}
              </p>
            </div>

            {HAS_WHATSAPP && (
              <div className="bg-white rounded-2xl border border-brand-border p-6 text-sm text-brand-muted leading-relaxed">
                <p className="font-semibold text-brand-text mb-2">{tc("howItWorksShort")}</p>
                <p className="whitespace-pre-line">{tc("howItWorksSteps")}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
