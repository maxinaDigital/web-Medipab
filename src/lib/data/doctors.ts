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

export const doctors: Doctor[] = [
  {
    id: "dra-sofia-torres",
    slug: "dra-sofia-torres",
    name: "Dra. Sofía Torres Ramírez",
    title: "Dra.",
    specialty: "Ginecología y Obstetricia",
    cedula: "12345678",
    bio: "La Dra. Torres se dedica con profunda vocación a acompañar a las mujeres en los momentos más significativos de su vida. Con más de 8 años de experiencia en obstetricia, ha atendido cientos de partos y cesáreas en Aguascalientes. Su enfoque cálido y empático hace que sus pacientes se sientan en buenas manos desde la primera consulta.",
    education: [
      { degree: "Médico Cirujano", institution: "Universidad Autónoma de Aguascalientes", year: 2012 },
      { degree: "Especialidad en Ginecología y Obstetricia", institution: "Hospital Civil de Guadalajara", year: 2017 },
      { degree: "Diplomado en Medicina Fetal", institution: "UNAM", year: 2019 },
    ],
    conditions: [
      "Control prenatal",
      "Parto natural y cesárea",
      "Trastornos menstruales",
      "Planificación familiar",
      "Menopausia",
      "Papanicolaou",
    ],
    schedule: [
      { days: "Lunes, Miércoles, Viernes", hours: "9:00 – 14:00" },
      { days: "Martes, Jueves", hours: "16:00 – 19:00" },
    ],
    photo: "/images/doctors/dra-sofia-torres.jpg",
    servicesSlugs: ["ginecologia-obstetricia"],
  },
  {
    id: "dr-carlos-medina",
    slug: "dr-carlos-medina",
    name: "Dr. Carlos Medina Gutiérrez",
    title: "Dr.",
    specialty: "Pediatría y Neonatología",
    cedula: "23456789",
    bio: "El Dr. Medina tiene una pasión genuina por la salud infantil. Especializado en neonatología, ha atendido a recién nacidos en situaciones críticas con resultados sobresalientes. Con un estilo comunicativo y tranquilizador, sabe cómo hablarle tanto a los pequeños como a sus papás en los momentos de incertidumbre.",
    education: [
      { degree: "Médico Cirujano", institution: "Universidad de Guadalajara", year: 2011 },
      { degree: "Especialidad en Pediatría", institution: "Instituto Nacional de Pediatría", year: 2016 },
      { degree: "Sub-especialidad en Neonatología", institution: "Instituto Nacional de Perinatología", year: 2018 },
    ],
    conditions: [
      "Recién nacido sano y de riesgo",
      "Control del niño sano",
      "Enfermedades respiratorias pediátricas",
      "Alergias infantiles",
      "Desarrollo y crecimiento",
      "Vacunación",
    ],
    schedule: [
      { days: "Lunes – Viernes", hours: "10:00 – 14:00" },
      { days: "Sábado", hours: "9:00 – 13:00" },
    ],
    photo: "/images/doctors/dr-carlos-medina.jpg",
    servicesSlugs: ["pediatria-neonatologia", "medicina-general"],
  },
  {
    id: "dr-raul-herrera",
    slug: "dr-raul-herrera",
    name: "Dr. Raúl Herrera Castillo",
    title: "Dr.",
    specialty: "Cirugía General y Cardiología",
    cedula: "34567890",
    bio: "Con más de 10 años en quirófano, el Dr. Herrera combina la precisión técnica con un trato humano que da tranquilidad a sus pacientes. Es referente en cirugía laparoscópica en Aguascalientes y también atiende consulta cardiológica. Su lema: operar solo cuando es necesario, y siempre con el mínimo riesgo.",
    education: [
      { degree: "Médico Cirujano", institution: "Universidad Autónoma de Aguascalientes", year: 2009 },
      { degree: "Especialidad en Cirugía General", institution: "Hospital de Especialidades IMSS", year: 2015 },
      { degree: "Diplomado en Cirugía Laparoscópica Avanzada", institution: "UNAM", year: 2017 },
    ],
    conditions: [
      "Colecistectomía laparoscópica",
      "Apendicectomía",
      "Hernias",
      "Cirugía de mínima invasión",
      "Cardiología general",
      "Hipertensión",
    ],
    schedule: [
      { days: "Lunes, Martes, Jueves", hours: "8:00 – 13:00" },
      { days: "Miércoles, Viernes", hours: "16:00 – 20:00" },
    ],
    photo: "/images/doctors/dr-raul-herrera.jpg",
    servicesSlugs: ["cirugia-general", "cardiologia"],
  },
  {
    id: "dra-mariana-villa",
    slug: "dra-mariana-villa",
    name: "Dra. Mariana Villa Ochoa",
    title: "Dra.",
    specialty: "Nutrición Clínica",
    cedula: "45678901",
    bio: "La Dra. Villa cree que una buena alimentación es medicina preventiva. Trabaja de manera coordinada con los demás especialistas de Clínica Crystal para que el plan nutricional complemente el tratamiento médico de cada paciente. Su estilo práctico y sin restricciones extremas ha ayudado a cientos de pacientes a alcanzar sus metas de salud de forma sostenible.",
    education: [
      { degree: "Licenciatura en Nutrición", institution: "Universidad Autónoma de Aguascalientes", year: 2014 },
      { degree: "Maestría en Nutrición Clínica", institution: "Universidad de Monterrey", year: 2017 },
      { degree: "Diplomado en Nutrición Materno-Infantil", institution: "Tufts University (en línea)", year: 2020 },
    ],
    conditions: [
      "Sobrepeso y obesidad",
      "Diabetes tipo 2",
      "Nutrición en embarazo",
      "Enfermedades cardiovasculares",
      "Síndrome de intestino irritable",
      "Nutrición deportiva",
    ],
    schedule: [
      { days: "Lunes, Miércoles, Viernes", hours: "10:00 – 18:00" },
      { days: "Sábado", hours: "9:00 – 13:00" },
    ],
    photo: "/images/doctors/dra-mariana-villa.jpg",
    servicesSlugs: ["nutricion-clinica"],
  },
];

export const getDoctorBySlug = (slug: string): Doctor | undefined =>
  doctors.find((d) => d.slug === slug);
