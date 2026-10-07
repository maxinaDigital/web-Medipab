"use client";

import { Siren } from "lucide-react";
import { useTranslations } from "next-intl";
import { CLINIC } from "@/lib/data/clinic";

// Botón flotante de llamada a Urgencias, solo en pantallas donde no se ve la barra superior.
export function EmergencyButton() {
  const t = useTranslations("emergency");

  return (
    <a
      href={CLINIC.emergencyPhoneHref}
      className="md:hidden fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-urgent px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-urgent/30 hover:bg-urgent-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-urgent focus-visible:ring-offset-2 transition-colors"
      aria-label={`${t("call")}: ${CLINIC.emergencyPhone}`}
    >
      <Siren size={18} aria-hidden="true" />
      {t("label")}
    </a>
  );
}
