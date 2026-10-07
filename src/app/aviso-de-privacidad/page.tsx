import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { CLINIC } from "@/lib/data/clinic";

// PENDIENTE: borrador con la estructura de la LFPDPPP. Debe revisarlo y aprobarlo el área legal
// del cliente (razón social, domicilio fiscal, responsable de datos) antes de publicar el sitio.
// Se publica solo en español; en inglés se muestra un aviso de que el documento está en español.

export const metadata: Metadata = {
  title: "Aviso de privacidad",
  description: `Aviso de privacidad de ${CLINIC.fullName}: qué datos recabamos en este sitio, para qué los usamos y cómo ejercer tus derechos ARCO.`,
};

const LAST_UPDATED = "7 de octubre de 2026";

export default async function AvisoDePrivacidadPage() {
  const locale = await getLocale();

  return (
    <div>
      <section className="py-16 bg-gradient-to-br from-ocean-from to-ocean-to">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white leading-tight">
            Aviso de privacidad
          </h1>
          <p className="mt-4 text-white/75">Última actualización: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="py-16 bg-brand-bg">
        <article className="max-w-3xl mx-auto px-4 bg-white rounded-2xl border border-brand-border p-8 md:p-10 space-y-8 text-brand-muted leading-relaxed">
          {locale === "en" && (
            <p lang="en" className="rounded-xl bg-primary-light p-4 text-sm text-brand-text">
              This privacy notice is published in Spanish, as required by Mexican law. If you need help
              understanding it, please contact us at {CLINIC.email}.
            </p>
          )}

          <Section title="1. Responsable de tus datos personales">
            <p>
              {CLINIC.legalName}, con domicilio en {CLINIC.address.full}, es responsable del uso y
              protección de tus datos personales, conforme a la Ley Federal de Protección de Datos
              Personales en Posesión de los Particulares.
            </p>
          </Section>

          <Section title="2. Datos que recabamos en este sitio">
            <p>Cuando solicitas una cita mediante el formulario de este sitio, recabamos:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Nombre completo, teléfono y correo electrónico.</li>
              <li>Especialidad o servicio de interés, médico preferido, fecha y turno preferidos.</li>
              <li>
                De manera opcional, el motivo de tu consulta. Esta información puede referirse a tu
                estado de salud, por lo que se considera un <strong>dato personal sensible</strong>.
              </li>
            </ul>
            <p>
              Este sitio no utiliza cookies de publicidad ni de seguimiento. Solo guardamos una cookie
              técnica con el idioma que elegiste.
            </p>
          </Section>

          <Section title="3. Para qué usamos tus datos">
            <p>
              Usamos tus datos únicamente para contactarte, coordinar y confirmar tu cita, y orientarte
              sobre el especialista o servicio adecuado. No los usamos con fines publicitarios.
            </p>
          </Section>

          <Section title="4. Consentimiento para datos sensibles">
            <p>
              Al marcar la casilla de aceptación del formulario nos otorgas tu consentimiento expreso para
              tratar los datos sensibles que decidas compartir, solo para la finalidad descrita en este
              aviso.
            </p>
          </Section>

          <Section title="5. Cómo se envía tu solicitud">
            <p>
              El formulario no guarda tus datos en este sitio: al enviarlo se abre WhatsApp en tu
              dispositivo con tu solicitud ya escrita, y eres tú quien decide enviarla al número del
              hospital. Ese envío está sujeto también a las condiciones y al aviso de privacidad de
              WhatsApp.
            </p>
          </Section>

          <Section title="6. Transferencia de datos">
            <p>
              No compartimos tus datos personales con terceros, salvo en los casos previstos por la ley o
              cuando sea necesario para tu atención médica.
            </p>
          </Section>

          <Section title="7. Derechos ARCO y revocación del consentimiento">
            <p>
              Tienes derecho a acceder a tus datos, rectificarlos, cancelarlos u oponerte a su uso
              (derechos ARCO), así como a revocar tu consentimiento. Para ejercerlos, escríbenos a{" "}
              <a href={`mailto:${CLINIC.email}`} className="text-primary hover:underline">
                {CLINIC.email}
              </a>{" "}
              indicando tu nombre, el derecho que deseas ejercer y un medio para responderte. Te
              responderemos en los plazos que marca la ley.
            </p>
          </Section>

          <Section title="8. Cambios a este aviso">
            <p>
              Cualquier cambio a este aviso de privacidad se publicará en esta misma página, con su fecha
              de actualización.
            </p>
          </Section>
        </article>
      </section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="font-heading text-xl font-bold text-brand-text">{title}</h2>
      {children}
    </section>
  );
}
