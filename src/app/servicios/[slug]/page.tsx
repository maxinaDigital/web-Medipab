import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { CheckCircle2, ChevronRight, MessageCircle, Phone } from "lucide-react";
import { services, getServiceBySlug } from "@/lib/data/services";
import { doctors } from "@/lib/data/doctors";
import { CLINIC, whatsappUrl } from "@/lib/data/clinic";
import { serviceIcon } from "@/components/shared/serviceIcons";
import { jsonLdHtml } from "@/lib/jsonLd";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.shortDescription,
  };
}

export default async function ServicePage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  const tc = await getTranslations("common");
  const ts = await getTranslations("servicesSection");
  const tn = await getTranslations("nav");
  const td = await getTranslations("doctors");

  const IconComponent = serviceIcon(service.icon);

  const relatedDoctors = doctors.filter((d) => d.servicesSlugs.includes(service.slug));

  const whatsappText = `Hola, me gustaría agendar una cita para ${service.name}.`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalService",
    name: service.name,
    description: service.shortDescription,
    provider: {
      "@type": "Hospital",
      name: CLINIC.fullName,
      address: CLINIC.address.full,
    },
  };

  const serviceName = ts(`items.${service.slug}.name`);
  const fullDescription = ts(`items.${service.slug}.full`);
  const conditions = ts.raw(`items.${service.slug}.conditions`) as string[];
  // Algunos servicios (farmacia, banco de sangre, ambulancia) titulan la lista distinto a "¿Qué atendemos?"
  const { conditionsTitle } = ts.raw(`items.${service.slug}`) as { conditionsTitle?: string };
  const processSteps = ts.raw(`items.${service.slug}.process`) as { title: string; desc: string }[];
  const faqItems = ts.raw(`items.${service.slug}.faq`) as { q: string; a: string }[];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdHtml(jsonLd) }}
      />
      <div>
        {/* Hero */}
        <section className="py-16 bg-gradient-to-br from-ocean-from to-ocean-to">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
              <Link href="/servicios" className="hover:text-white transition-colors">
                {tn("services")}
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">{serviceName}</span>
            </div>
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <IconComponent className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="font-heading text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
                  {serviceName}
                </h1>
                <p className="text-white/75 text-lg max-w-2xl">{fullDescription}</p>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Condiciones */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-brand-text mb-6">
                {conditionsTitle ?? tc("conditions")}
              </h2>
              <ul className="space-y-3">
                {conditions.map((c) => (
                  <li key={c} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-brand-muted">{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Proceso */}
            {processSteps.length > 0 && (
              <div>
                <h2 className="font-heading text-2xl font-bold text-brand-text mb-6">
                  {tc("process")}
                </h2>
                <div className="space-y-4">
                  {processSteps.map((p, i) => (
                    <div key={i} className="flex gap-4 p-5 rounded-xl bg-brand-bg border border-brand-border">
                      <span className="w-8 h-8 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-semibold text-brand-text">{p.title}</p>
                        <p className="text-brand-muted text-sm mt-0.5">{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ */}
            {faqItems.length > 0 && (
              <div>
                <h2 className="font-heading text-2xl font-bold text-brand-text mb-6">
                  {tc("faq")}
                </h2>
                <div className="space-y-4">
                  {faqItems.map((f, i) => (
                    <details key={i} className="group bg-brand-bg border border-brand-border rounded-xl overflow-hidden">
                      <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer font-medium text-brand-text list-none">
                        {f.q}
                        <ChevronRight className="w-4 h-4 text-brand-muted flex-shrink-0 group-open:rotate-90 transition-transform" />
                      </summary>
                      <p className="px-5 pb-5 text-brand-muted text-sm leading-relaxed">
                        {f.a}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* CTA sticky card */}
            {service.bookable ? (
            <div className="bg-gradient-to-br from-ocean-from to-ocean-to rounded-2xl p-6 text-white">
              <h3 className="font-heading text-lg font-bold mb-2">{tc("readyToBook")}</h3>
              <p className="text-white/70 text-sm mb-5">
                {tc("immediateResponse")}
              </p>
              <a
                href={whatsappUrl(whatsappText)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-white text-primary font-semibold py-3 px-5 rounded-lg hover:bg-primary-light transition-colors w-full"
              >
                <MessageCircle className="w-5 h-5" />
                {tc("bookWhatsApp")}
              </a>
              <Link
                href={`/citas?servicio=${service.slug}`}
                className="flex items-center justify-center gap-2 border border-white/30 text-white py-3 px-5 rounded-lg hover:bg-white/10 transition-colors w-full mt-3 text-sm"
              >
                {tc("bookAppointment")}
              </Link>
            </div>
            ) : (
            // Servicios sin cita (urgencias, ambulancia, farmacia, banco de sangre): llamada directa
            <div className="bg-gradient-to-br from-ocean-from to-ocean-to rounded-2xl p-6 text-white">
              <h3 className="font-heading text-lg font-bold mb-2">{tc("needThisService")}</h3>
              <p className="text-white/70 text-sm mb-5">{tc("noAppointmentNeeded")}</p>
              <a
                href={CLINIC.emergencyPhoneHref}
                className="flex items-center justify-center gap-2 bg-white text-primary font-semibold py-3 px-5 rounded-lg hover:bg-primary-light transition-colors w-full"
              >
                <Phone className="w-5 h-5" />
                {tc("callUs")}: {CLINIC.emergencyPhone}
              </a>
              <p className="text-white/60 text-xs mt-4">{tc("emergency911")}</p>
            </div>
            )}

            {/* Médicos relacionados */}
            {relatedDoctors.length > 0 && (
              <div className="bg-white border border-brand-border rounded-2xl p-6">
                <h3 className="font-heading text-base font-bold text-brand-text mb-4">
                  {tc("relatedDoctors")}
                </h3>
                <div className="space-y-3">
                  {relatedDoctors.map((d) => (
                    <Link
                      key={d.slug}
                      href={`/medicos/${d.slug}`}
                      className="flex items-center gap-3 group"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-bold text-sm">{d.title.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium text-brand-text text-sm group-hover:text-primary transition-colors">
                          {d.name}
                        </p>
                        <p className="text-brand-muted text-xs">{td(`${d.slug}.specialty`)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
