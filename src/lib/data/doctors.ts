// Directorio médico de Medipab.
// El hospital trabaja con ~52 médicos externos gestionados por el hospital (entrevista 2026-10-03).
// PENDIENTE: el cliente debe enviar nombre, especialidad, cédula profesional, foto y horario de cada médico
// que autorice publicar. Mientras la lista esté vacía, el sitio muestra el directorio por especialidad
// (TeamPreview / medicos) sin perfiles individuales. Nunca agregar médicos de ejemplo: las cédulas deben ser reales.

export type Doctor = {
  id: string;
  slug: string;
  name: string;
  title: string;
  specialty: string;
  cedula: string;
  bio: string;
  education: { degree: string; institution: string; year: number }[];
  conditions: string[];
  schedule: { days: string; hours: string }[];
  photo: string;
  servicesSlugs: string[];
};

export const doctors: Doctor[] = [];


export const getDoctorBySlug = (slug: string): Doctor | undefined =>
  doctors.find((d) => d.slug === slug);
