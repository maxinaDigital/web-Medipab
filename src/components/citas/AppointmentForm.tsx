"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { appointmentSchema } from "@/lib/validations/appointmentSchema";

type AppointmentFormInput = z.input<typeof appointmentSchema>;
import { services } from "@/lib/data/services";
import { doctors } from "@/lib/data/doctors";
import { CLINIC } from "@/lib/data/clinic";

const BOOKABLE_SERVICES = services.filter((s) => s.bookable);

type AppointmentFormProps = {
  /** Slug de servicio a preseleccionar (desde ?servicio=). Se ignora si no es agendable. */
  initialService?: string;
  /** Slug de médico a preseleccionar (desde ?medico=). Se ignora si no existe. */
  initialDoctor?: string;
};

export function AppointmentForm({ initialService, initialDoctor }: AppointmentFormProps) {
  const [sent, setSent] = useState(false);
  const t = useTranslations("appointmentPage");
  const tc = useTranslations("common");
  const ts = useTranslations("servicesSection");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentFormInput>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      isFirstTime: false,
      acceptsPrivacy: false,
      service: BOOKABLE_SERVICES.some((s) => s.slug === initialService) ? initialService : "",
      doctor: doctors.some((d) => d.slug === initialDoctor) ? initialDoctor : "",
    },
  });

  const selectedService = watch("service");
  const relatedDoctors = selectedService
    ? doctors.filter((d) => d.servicesSlugs.includes(selectedService))
    : doctors;

  const onSubmit = (data: AppointmentFormInput) => {
    const shiftLabel = data.preferredShift === "morning" ? t("shiftMorning") : t("shiftAfternoon");
    const doctor = data.doctor
      ? doctors.find((d) => d.slug === data.doctor)?.name ?? data.doctor
      : t("doctorPlaceholder");
    const firstTime = data.isFirstTime ? "Sí" : "No";

    const msg = [
      `*Nueva solicitud de cita — ${CLINIC.name}*`,
      ``,
      `👤 *Nombre:* ${data.name}`,
      `📱 *Teléfono:* ${data.phone}`,
      `✉️ *Email:* ${data.email}`,
      `🏥 *Servicio:* ${services.find((s) => s.slug === data.service)?.name ?? data.service}`,
      doctors.length > 0 ? `👨‍⚕️ *Médico preferido:* ${doctor}` : "",
      `📅 *Fecha preferida:* ${data.preferredDate}`,
      `🕐 *Turno:* ${shiftLabel}`,
      `🆕 *Primera vez:* ${firstTime}`,
      data.reason ? `📝 *Motivo:* ${data.reason}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const url = `https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    setSent(true);
  };

  if (sent) {
    return (
      <div className="bg-white rounded-2xl border border-brand-border p-10 text-center">
        <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </div>
        <h2 className="font-heading text-2xl font-bold text-brand-text mb-3">
          {tc("requestSent")}
        </h2>
        <p className="text-brand-muted mb-6">
          {tc("requestSentDesc")}{" "}
          <a
            href={`https://wa.me/${CLINIC.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            {tc("clickHere")}
          </a>
          .
        </p>
        <button
          onClick={() => setSent(false)}
          className="text-sm text-brand-muted hover:text-primary transition-colors"
        >
          {tc("sendAnother")}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-2xl border border-brand-border p-7 space-y-5"
    >
      <h2 className="font-heading text-2xl font-bold text-brand-text">{t("formTitle")}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium text-brand-text mb-1">
            {t("nameLabel")} <span className="text-red-500">*</span>
          </label>
          <input
            {...register("name")}
            placeholder={t("namePlaceholder")}
            className="w-full px-4 py-2.5 rounded-lg border border-brand-border text-brand-text placeholder:text-brand-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-sm"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        {/* Teléfono */}
        <div>
          <label className="block text-sm font-medium text-brand-text mb-1">
            {t("phoneLabel")} <span className="text-red-500">*</span>
          </label>
          <input
            {...register("phone")}
            placeholder={t("phonePlaceholder")}
            type="tel"
            className="w-full px-4 py-2.5 rounded-lg border border-brand-border text-brand-text placeholder:text-brand-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-sm"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-brand-text mb-1">
          {t("emailLabel")} <span className="text-red-500">*</span>
        </label>
        <input
          {...register("email")}
          placeholder={t("emailPlaceholder")}
          type="email"
          className="w-full px-4 py-2.5 rounded-lg border border-brand-border text-brand-text placeholder:text-brand-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-sm"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div className={`grid grid-cols-1 gap-5 ${doctors.length > 0 ? "sm:grid-cols-2" : ""}`}>
        {/* Servicio */}
        <div>
          <label className="block text-sm font-medium text-brand-text mb-1">
            {t("serviceLabel")} <span className="text-red-500">*</span>
          </label>
          <select
            {...register("service")}
            className="w-full px-4 py-2.5 rounded-lg border border-brand-border text-brand-text focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-sm bg-white"
          >
            <option value="">{t("servicePlaceholder")}</option>
            {BOOKABLE_SERVICES.map((s) => (
              <option key={s.slug} value={s.slug}>
                {ts(`items.${s.slug}.name`)}
              </option>
            ))}
          </select>
          {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service.message}</p>}
        </div>

        {/* Médico — solo cuando hay perfiles publicados */}
        {doctors.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-brand-text mb-1">
            {t("doctorLabel")}
          </label>
          <select
            {...register("doctor")}
            className="w-full px-4 py-2.5 rounded-lg border border-brand-border text-brand-text focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-sm bg-white"
          >
            <option value="">{t("doctorPlaceholder")}</option>
            {relatedDoctors.map((d) => (
              <option key={d.slug} value={d.slug}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Fecha */}
        <div>
          <label className="block text-sm font-medium text-brand-text mb-1">
            {t("dateLabel")} <span className="text-red-500">*</span>
          </label>
          <input
            {...register("preferredDate")}
            type="date"
            min={new Date().toISOString().split("T")[0]}
            className="w-full px-4 py-2.5 rounded-lg border border-brand-border text-brand-text focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-sm"
          />
          {errors.preferredDate && (
            <p className="text-red-500 text-xs mt-1">{errors.preferredDate.message}</p>
          )}
        </div>

        {/* Turno */}
        <div>
          <label className="block text-sm font-medium text-brand-text mb-1">
            {t("shiftLabel")} <span className="text-red-500">*</span>
          </label>
          <select
            {...register("preferredShift")}
            className="w-full px-4 py-2.5 rounded-lg border border-brand-border text-brand-text focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-sm bg-white"
          >
            <option value="">{t("shiftPlaceholder")}</option>
            <option value="morning">{t("shiftMorning")}</option>
            <option value="afternoon">{t("shiftAfternoon")}</option>
          </select>
          {errors.preferredShift && (
            <p className="text-red-500 text-xs mt-1">{errors.preferredShift.message}</p>
          )}
        </div>
      </div>

      {/* Motivo */}
      <div>
        <label className="block text-sm font-medium text-brand-text mb-1">
          {t("reasonLabel")}
        </label>
        <textarea
          {...register("reason")}
          placeholder={t("reasonPlaceholder")}
          rows={3}
          className="w-full px-4 py-2.5 rounded-lg border border-brand-border text-brand-text placeholder:text-brand-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-sm resize-none"
        />
        {errors.reason && <p className="text-red-500 text-xs mt-1">{errors.reason.message}</p>}
      </div>

      {/* Primera vez */}
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          {...register("isFirstTime")}
          type="checkbox"
          className="w-4 h-4 rounded border-brand-border text-primary focus:ring-primary"
        />
        <span className="text-sm text-brand-muted">{tc("firstVisit")}</span>
      </label>

      {/* Privacidad */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            {...register("acceptsPrivacy")}
            type="checkbox"
            className="w-4 h-4 rounded border-brand-border text-primary focus:ring-primary mt-0.5"
          />
          <span className="text-sm text-brand-muted">
            {tc("privacyConsent")}{" "}
            <Link href="/aviso-de-privacidad" target="_blank" className="text-primary hover:underline">
              {tc("privacyLink")}
            </Link>{" "}
            <span className="text-red-500">*</span>
          </span>
        </label>
        {errors.acceptsPrivacy && (
          <p className="text-red-500 text-xs mt-1">{errors.acceptsPrivacy.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {tc("sendRequest")}
      </button>

      <p className="text-xs text-brand-muted text-center">
        {t("submitNote")}
      </p>
    </form>
  );
}
