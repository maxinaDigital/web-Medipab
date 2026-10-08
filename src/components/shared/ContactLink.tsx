import { MessageCircle, Phone } from "lucide-react";
import { CLINIC, HAS_WHATSAPP, whatsappUrl } from "@/lib/data/clinic";

type ContactLinkProps = {
  /** Mensaje prellenado de WhatsApp. */
  message?: string;
  /** Texto del botón cuando hay WhatsApp. */
  whatsappLabel: string;
  /** Texto del botón cuando solo hay teléfono. */
  callLabel: string;
  className?: string;
  iconClassName?: string;
};

// Botón de contacto: abre WhatsApp si el hospital lo tiene configurado; si no, llama al conmutador.
// Sin hooks, sirve en componentes de servidor y de cliente.
export function ContactLink({ message, whatsappLabel, callLabel, className, iconClassName = "w-5 h-5" }: ContactLinkProps) {
  const waHref = whatsappUrl(message);

  if (HAS_WHATSAPP && waHref) {
    return (
      <a href={waHref} target="_blank" rel="noopener noreferrer" className={className}>
        <MessageCircle className={iconClassName} aria-hidden="true" />
        {whatsappLabel}
      </a>
    );
  }

  return (
    <a href={CLINIC.phoneHref} className={className}>
      <Phone className={iconClassName} aria-hidden="true" />
      {callLabel}
    </a>
  );
}
