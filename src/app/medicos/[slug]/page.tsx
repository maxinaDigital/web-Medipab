import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { User, GraduationCap, Clock, CheckCircle2, MessageCircle, ChevronRight } from "lucide-react";
import { doctors, getDoctorBySlug } from "@/lib/data/doctors";
import { services } from "@/lib/data/services";
import { CLINIC } from "@/lib/data/clinic";

// Solo existen los perfiles de doctors.ts; cualquier otro slug es 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return doctors.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const doctor = getDoctorBySlug(params.slug);
  if (!doctor) return {};
  return {
    title: `${doctor.name} — ${doctor.specialty}`,
    description: doctor.bio.slice(0, 160),
  };
}

export default async function DoctorPage({ params }: { params: { slug: string } }) {
  const doctor = getDoctorBySlug(params.slug);
  if (!doctor) notFound();

  const tc = await getTranslations("common");
  const tn = await getTranslations("nav");
  const ta = await getTranslations("appointmentPage");
  const td = await getTranslations("doctors");
  const translatedSpecialty = td(`${doctor.slug}.specialty`);

  const relatedServices = services.filter((s) =>
    doctor.servicesSlugs.includes(s.slug)
  );

  const whatsappText = encodeURIComponent(
    `Hola, me gustaría agendar una cita con ${doctor.name} (${doctor.specialty}).`
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: doctor.name,
    medicalSpecialty: doctor.specialty,
    worksFor: { "@type": "Hospital", name: CLINIC.fullName },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div>
        {/* Hero */}
        <section className="py-16 bg-gradient-to-br from-ocean-from to-ocean-to">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center gap-2 text-white/60 text-sm mb-6">
              <Link href="/medicos" className="hover:text-white transition-colors">
                {tn("doctors")}
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">{doctor.name}</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-8 items-start">
              <div className="w-28 h-28 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <User className="w-14 h-14 text-white/50" />
              </div>
              <div>
                <p className="text-primary-light text-sm font-semibold uppercase tracking-widest mb-2">
                  {translatedSpecialty}
                </p>
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-2">
                  {doctor.name}
                </h1>
                <p className="text-white/60 text-sm mb-4">{tc("cedula")}: {doctor.cedula}</p>
                <p className="text-white/80 leading-relaxed max-w-2xl">{doctor.bio}</p>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main */}
          <div className="lg:col-span-2 space-y-12">
            {/* Formación */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-brand-text mb-6 flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-primary" />
                {tc("education")}
              </h2>
              <div className="space-y-4">
                {doctor.education.map((e) => (
                  <div key={e.degree} className="flex gap-4 p-5 rounded-xl bg-brand-bg border border-brand-border">
                    <span className="w-12 h-12 rounded-full bg-primary-light text-primary text-sm font-bold flex items-center justify-center flex-shrink-0">
                      {e.year}
                    </span>
                    <div>
                      <p className="font-semibold text-brand-text">{e.degree}</p>
                      <p className="text-brand-muted text-sm">{e.institution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Condiciones que atiende */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-brand-text mb-6">
                {tc("doctorsConditions")}
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {doctor.conditions.map((c) => (
                  <li key={c} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-brand-muted text-sm">{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Horario */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-brand-text mb-6 flex items-center gap-2">
                <Clock className="w-6 h-6 text-primary" />
                {tc("schedule")}
              </h2>
              <div className="space-y-3">
                {doctor.schedule.map((s) => (
                  <div
                    key={s.days}
                    className="flex items-center justify-between p-4 rounded-xl bg-brand-bg border border-brand-border"
                  >
                    <span className="text-brand-muted text-sm">{s.days}</span>
                    <span className="font-medium text-brand-text text-sm">{s.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-gradient-to-br from-ocean-from to-ocean-to rounded-2xl p-6 text-white">
              <h3 className="font-heading text-lg font-bold mb-2">
                {ta("bookWith")} {doctor.title} {doctor.name.split(" ")[1]}
              </h3>
              <p className="text-white/70 text-sm mb-5">
                {tc("immediateResponse")}
              </p>
              <a
                href={`https://wa.me/${CLINIC.whatsapp}?text=${whatsappText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-white text-primary font-semibold py-3 px-5 rounded-lg hover:bg-primary-light transition-colors w-full"
              >
                <MessageCircle className="w-5 h-5" />
                {tc("bookWhatsApp")}
              </a>
              <Link
                href={`/citas?medico=${doctor.slug}${doctor.servicesSlugs[0] ? `&servicio=${doctor.servicesSlugs[0]}` : ""}`}
                className="flex items-center justify-center gap-2 border border-white/30 text-white py-3 px-5 rounded-lg hover:bg-white/10 transition-colors w-full mt-3 text-sm"
              >
                {tc("bookAppointment")}
              </Link>
            </div>

            {relatedServices.length > 0 && (
              <div className="bg-white border border-brand-border rounded-2xl p-6">
                <h3 className="font-heading text-base font-bold text-brand-text mb-4">
                  {tc("relatedServices")}
                </h3>
                <div className="space-y-2">
                  {relatedServices.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/servicios/${s.slug}`}
                      className="flex items-center gap-2 text-sm text-brand-muted hover:text-primary transition-colors"
                    >
                      <ChevronRight className="w-4 h-4 flex-shrink-0" />
                      {s.name}
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
