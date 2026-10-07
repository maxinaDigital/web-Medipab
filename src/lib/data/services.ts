// Servicios de Medipab según la entrevista con Dirección Médica (2026-10-03).
// Los textos largos (descripción, padecimientos, proceso, FAQ) viven en messages/{es,en}.json
// bajo servicesSection.items.<slug>; aquí solo van los datos estructurales y el SEO en español.

export type ServiceCategory = "urgencias" | "especialidades" | "diagnostico" | "apoyo";

export type Service = {
  id: string;
  slug: string;
  name: string;
  icon: string;
  shortDescription: string;
  category: ServiceCategory;
  /** Se puede agendar cita (aparece en el formulario de citas). */
  bookable: boolean;
  /** Aparece en la vista previa del inicio. */
  featured: boolean;
  doctorSlugs: string[];
};

export const services: Service[] = [
  {
    id: "urgencias",
    slug: "urgencias",
    name: "Urgencias 24 horas",
    icon: "Siren",
    shortDescription: "Atención de urgencias médicas y quirúrgicas las 24 horas, los 365 días del año.",
    category: "urgencias",
    bookable: false,
    featured: true,
    doctorSlugs: [],
  },
  {
    id: "hospitalizacion",
    slug: "hospitalizacion",
    name: "Hospitalización",
    icon: "BedSingle",
    shortDescription: "Habitaciones individuales con vigilancia médica y de enfermería las 24 horas.",
    category: "urgencias",
    bookable: false,
    featured: true,
    doctorSlugs: [],
  },
  {
    id: "terapia-intensiva",
    slug: "terapia-intensiva",
    name: "Terapia Intensiva Adultos (UCI)",
    icon: "HeartPulse",
    shortDescription: "Unidad de cuidados intensivos para pacientes adultos en estado crítico.",
    category: "urgencias",
    bookable: false,
    featured: true,
    doctorSlugs: [],
  },
  {
    id: "neonatologia-ucin",
    slug: "neonatologia-ucin",
    name: "Neonatología y UCIN",
    icon: "Baby",
    shortDescription: "Cuidados intensivos neonatales para recién nacidos prematuros o de riesgo.",
    category: "urgencias",
    bookable: false,
    featured: true,
    doctorSlugs: [],
  },
  {
    id: "ginecologia-obstetricia",
    slug: "ginecologia-obstetricia",
    name: "Ginecología y Obstetricia",
    icon: "Heart",
    shortDescription: "Control prenatal, atención del parto y cesárea, y salud de la mujer.",
    category: "especialidades",
    bookable: true,
    featured: true,
    doctorSlugs: [],
  },
  {
    id: "pediatria",
    slug: "pediatria",
    name: "Pediatría",
    icon: "Smile",
    shortDescription: "Atención médica de bebés, niños y adolescentes.",
    category: "especialidades",
    bookable: true,
    featured: true,
    doctorSlugs: [],
  },
  {
    id: "cirugia-general",
    slug: "cirugia-general",
    name: "Cirugía General",
    icon: "Scissors",
    shortDescription: "Cirugía programada y de urgencia con quirófano y recuperación en el hospital.",
    category: "especialidades",
    bookable: true,
    featured: true,
    doctorSlugs: [],
  },
  {
    id: "ortopedia-traumatologia",
    slug: "ortopedia-traumatologia",
    name: "Ortopedia y Traumatología",
    icon: "Bone",
    shortDescription: "Fracturas, lesiones deportivas y padecimientos de huesos y articulaciones.",
    category: "especialidades",
    bookable: true,
    featured: true,
    doctorSlugs: [],
  },
  {
    id: "consulta-externa",
    slug: "consulta-externa",
    name: "Consulta Externa de Especialidades",
    icon: "Stethoscope",
    shortDescription: "Más de 50 médicos especialistas que consultan en el hospital.",
    category: "especialidades",
    bookable: true,
    featured: false,
    doctorSlugs: [],
  },
  {
    id: "laboratorio-clinico",
    slug: "laboratorio-clinico",
    name: "Laboratorio Clínico",
    icon: "FlaskConical",
    shortDescription: "Análisis clínicos dentro del hospital para pacientes internos y externos.",
    category: "diagnostico",
    bookable: true,
    featured: false,
    doctorSlugs: [],
  },
  {
    id: "imagenologia",
    slug: "imagenologia",
    name: "Imagenología",
    icon: "ScanLine",
    shortDescription: "Estudios de imagen para diagnóstico, dentro del mismo hospital.",
    category: "diagnostico",
    bookable: true,
    featured: false,
    doctorSlugs: [],
  },
  {
    id: "banco-de-sangre",
    slug: "banco-de-sangre",
    name: "Banco de Sangre",
    icon: "Droplet",
    shortDescription: "Disponibilidad de hemoderivados para cirugías, urgencias y terapia intensiva.",
    category: "apoyo",
    bookable: false,
    featured: false,
    doctorSlugs: [],
  },
  {
    id: "farmacia",
    slug: "farmacia",
    name: "Farmacia",
    icon: "Pill",
    shortDescription: "Farmacia abierta al público dentro del hospital.",
    category: "apoyo",
    bookable: false,
    featured: false,
    doctorSlugs: [],
  },
  {
    id: "ambulancia",
    slug: "ambulancia",
    name: "Servicio de Ambulancia",
    icon: "Ambulance",
    shortDescription: "Traslado de pacientes en ambulancia.",
    category: "apoyo",
    bookable: false,
    featured: false,
    doctorSlugs: [],
  },
];

export const getServiceBySlug = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug);
