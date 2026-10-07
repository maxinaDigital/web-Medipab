export type Service = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  icon: string;
  shortDescription: string;
  fullDescription: string;
  conditions: string[];
  process: { step: number; title: string; description: string }[];
  faq: { question: string; answer: string }[];
  doctorSlugs: string[];
};

export const services: Service[] = [
  {
    id: "medicina-general",
    slug: "medicina-general",
    name: "Medicina General",
    shortName: "Medicina General",
    icon: "Stethoscope",
    shortDescription: "Consulta médica integral para toda la familia.",
    fullDescription:
      "Nuestros médicos generales brindan atención médica completa para pacientes de todas las edades. Desde enfermedades comunes hasta el seguimiento de condiciones crónicas, estamos aquí para cuidar tu salud en cada etapa de la vida.",
    conditions: [
      "Resfriados, gripe y enfermedades respiratorias",
      "Infecciones y fiebre",
      "Dolores musculares y articulares",
      "Control de diabetes e hipertensión",
      "Revisiones preventivas y chequeos anuales",
      "Certificados médicos",
    ],
    process: [
      { step: 1, title: "Agenda tu cita", description: "Por WhatsApp, teléfono o nuestro formulario en línea." },
      { step: 2, title: "Consulta médica", description: "El médico te evalúa, escucha tus síntomas y realiza la exploración física." },
      { step: 3, title: "Diagnóstico y plan", description: "Recibes tu diagnóstico, tratamiento y las instrucciones de seguimiento." },
    ],
    faq: [
      { question: "¿Necesito cita previa?", answer: "Sí, recomendamos agendar tu cita para reducir tiempos de espera. También atendemos urgencias." },
      { question: "¿Cuánto dura una consulta?", answer: "Aproximadamente 20–30 minutos dependiendo del motivo de consulta." },
      { question: "¿Atienden a niños?", answer: "Medicina General atiende a partir de los 12 años. Para menores, contamos con Pediatría." },
    ],
    doctorSlugs: ["dr-carlos-medina", "dra-sofia-torres"],
  },
  {
    id: "pediatria-neonatologia",
    slug: "pediatria-neonatologia",
    name: "Pediatría y Neonatología",
    shortName: "Pediatría",
    icon: "Baby",
    shortDescription: "Cuidado especializado para recién nacidos, bebés, niños y adolescentes.",
    fullDescription:
      "Contamos con 3 quirófanos exclusivos de maternidad y un equipo de pediatras y neonatólogos altamente capacitados para acompañar a tu bebé desde los primeros instantes de vida. Nuestra UCIN (Unidad de Cuidados Intensivos Neonatales) brinda atención de primer nivel para recién nacidos que requieren vigilancia especial.",
    conditions: [
      "Atención del recién nacido sano y de riesgo",
      "Control del niño sano (0–17 años)",
      "Enfermedades respiratorias pediátricas",
      "Infecciones y fiebre en niños",
      "Alergias y dermatitis",
      "Seguimiento del desarrollo infantil",
    ],
    process: [
      { step: 1, title: "Registro prenatal", description: "Te registramos antes del parto para preparar todo para la llegada de tu bebé." },
      { step: 2, title: "Atención al nacimiento", description: "Nuestro neonatólogo recibe al bebé en sala de partos o quirófano." },
      { step: 3, title: "Seguimiento y alta", description: "Revisamos al bebé y te enseñamos los cuidados antes de salir a casa." },
    ],
    faq: [
      { question: "¿Tienen UCIN?", answer: "Sí, contamos con unidad de cuidados neonatales para bebés prematuros o de riesgo." },
      { question: "¿Puedo elegir el pediatra que atenderá a mi bebé?", answer: "Sí, puedes solicitar un médico de preferencia al registrar tu embarazo con nosotros." },
      { question: "¿Qué edad atiende el pediatra?", answer: "Desde el nacimiento hasta los 17 años." },
    ],
    doctorSlugs: ["dr-carlos-medina"],
  },
  {
    id: "ginecologia-obstetricia",
    slug: "ginecologia-obstetricia",
    name: "Ginecología y Obstetricia",
    shortName: "Ginecología",
    icon: "Heart",
    shortDescription: "Atención integral de la salud femenina en todas las etapas de la vida.",
    fullDescription:
      "Nuestras ginecólogas acompañan a la mujer en cada etapa: desde la adolescencia hasta la menopausia. Con tres quirófanos exclusivos de maternidad y tecnología de imagenología in-house, brindamos atención completa del embarazo, parto y posparto.",
    conditions: [
      "Control prenatal y seguimiento del embarazo",
      "Parto natural y cesárea programada",
      "Papanicolaou y detección de cáncer cervical",
      "Trastornos menstruales",
      "Anticoncepción y planificación familiar",
      "Menopausia y climaterio",
    ],
    process: [
      { step: 1, title: "Primera consulta", description: "Evaluación completa, historia clínica y estudios iniciales si son necesarios." },
      { step: 2, title: "Seguimiento prenatal", description: "Consultas mensuales (o según semana de gestación) con ultrasonido incluido." },
      { step: 3, title: "Parto o cesárea", description: "Atención en nuestros quirófanos de maternidad con el equipo completo." },
    ],
    faq: [
      { question: "¿Atienden partos de urgencia?", answer: "Sí, contamos con guardia obstétrica las 24 horas para emergencias." },
      { question: "¿El ultrasonido obstétrico se hace en la clínica?", answer: "Sí, tenemos imagenología propia, no necesitas ir a otro lugar." },
      { question: "¿Puedo tener a mi pareja en el parto?", answer: "Sí, permitimos acompañante durante el parto vaginal y en la recuperación." },
    ],
    doctorSlugs: ["dra-sofia-torres"],
  },
  {
    id: "cardiologia",
    slug: "cardiologia",
    name: "Cardiología",
    shortName: "Cardiología",
    icon: "Activity",
    shortDescription: "Diagnóstico y tratamiento de enfermedades del corazón.",
    fullDescription:
      "Nuestro cardiólogo realiza evaluaciones completas del sistema cardiovascular, incluyendo electrocardiograma, ecocardiograma y prueba de esfuerzo. El diagnóstico oportuno puede salvar vidas.",
    conditions: [
      "Hipertensión arterial",
      "Arritmias cardíacas",
      "Insuficiencia cardíaca",
      "Dolor en el pecho y palpitaciones",
      "Control de riesgo cardiovascular",
      "Seguimiento postinfarto",
    ],
    process: [
      { step: 1, title: "Consulta inicial", description: "Historia clínica, exploración y electrocardiograma en la misma consulta." },
      { step: 2, title: "Estudios complementarios", description: "Ecocardiograma o prueba de esfuerzo según el caso, en nuestra clínica." },
      { step: 3, title: "Plan de tratamiento", description: "Ajuste de medicación, cambios en estilo de vida y citas de seguimiento." },
    ],
    faq: [
      { question: "¿Se hace el ecocardiograma en la clínica?", answer: "Sí, lo realizamos con nuestro equipo de imagenología in-house." },
      { question: "¿Cuándo debo ir a urgencias cardiológicas?", answer: "Ante dolor en el pecho, dificultad para respirar o desmayos, acude de inmediato." },
      { question: "¿Cada cuánto me debo checar el corazón?", answer: "Se recomienda un chequeo anual a partir de los 40 años o antes si hay factores de riesgo." },
    ],
    doctorSlugs: ["dr-raul-herrera"],
  },
  {
    id: "cirugia-general",
    slug: "cirugia-general",
    name: "Cirugía General",
    shortName: "Cirugía",
    icon: "Scissors",
    shortDescription: "Procedimientos quirúrgicos con 2 quirófanos equipados.",
    fullDescription:
      "Contamos con 2 quirófanos de cirugía general totalmente equipados con tecnología de última generación. Nuestro equipo quirúrgico realiza desde procedimientos menores hasta cirugías de mayor complejidad con estándares de seguridad internacionales.",
    conditions: [
      "Apendicitis",
      "Hernia inguinal, umbilical y abdominal",
      "Colecistitis (cálculos en la vesícula)",
      "Cirugía laparoscópica (mínima invasión)",
      "Procedimientos cutáneos (quistes, lipomas)",
      "Cirugía de emergencia",
    ],
    process: [
      { step: 1, title: "Valoración preoperatoria", description: "El cirujano evalúa el caso, indica laboratorios y estudios de imagen necesarios." },
      { step: 2, title: "Cirugía programada", description: "Se realiza en uno de nuestros 2 quirófanos con anestesiólogo certificado." },
      { step: 3, title: "Recuperación y alta", description: "Vigilancia posquirúrgica y plan de cuidados para tu recuperación en casa." },
    ],
    faq: [
      { question: "¿Hacen cirugía laparoscópica?", answer: "Sí, la mayoría de cirugías abdominales las realizamos por laparoscopía cuando es posible." },
      { question: "¿Tienen anestesiólogo propio?", answer: "Sí, nuestros anestesiólogos certificados están presentes en todas las cirugías." },
      { question: "¿Cuánto tiempo de recuperación tiene una cirugía?", answer: "Depende del procedimiento. La cirugía laparoscópica permite una recuperación más rápida (2–5 días)." },
    ],
    doctorSlugs: ["dr-raul-herrera"],
  },
  {
    id: "nutricion-clinica",
    slug: "nutricion-clinica",
    name: "Nutrición Clínica",
    shortName: "Nutrición",
    icon: "Apple",
    shortDescription: "Planes de alimentación personalizados para tu salud.",
    fullDescription:
      "Nuestra nutrióloga diseña planes de alimentación personalizados basados en tu estado de salud, objetivos y preferencias. Trabajamos de la mano con el resto del equipo médico para un enfoque integral.",
    conditions: [
      "Control de peso (sobrepeso y obesidad)",
      "Diabetes y resistencia a la insulina",
      "Nutrición durante el embarazo y lactancia",
      "Enfermedades cardiovasculares",
      "Trastornos gastrointestinales",
      "Nutrición deportiva",
    ],
    process: [
      { step: 1, title: "Evaluación nutricional", description: "Bioimpedancia, medidas antropométricas y análisis de tu dieta actual." },
      { step: 2, title: "Plan personalizado", description: "Recibes un plan de alimentación adaptado a tu estilo de vida y condición de salud." },
      { step: 3, title: "Seguimiento mensual", description: "Revisamos tu evolución y ajustamos el plan según tus avances." },
    ],
    faq: [
      { question: "¿La nutrióloga trabaja con el médico?", answer: "Sí, nuestro enfoque es multidisciplinario para resultados más efectivos." },
      { question: "¿Cuántas consultas necesito?", answer: "Recomendamos mínimo 3 consultas de seguimiento en los primeros 3 meses." },
      { question: "¿Puedo seguir comiendo lo que me gusta?", answer: "El plan se adapta a tus preferencias; no se trata de eliminar, sino de equilibrar." },
    ],
    doctorSlugs: ["dra-mariana-villa"],
  },
  {
    id: "laboratorio-clinico",
    slug: "laboratorio-clinico",
    name: "Laboratorio Clínico",
    shortName: "Laboratorio",
    icon: "FlaskConical",
    shortDescription: "Análisis clínicos con resultados el mismo día.",
    fullDescription:
      "Nuestro laboratorio clínico in-house procesa la mayoría de los estudios el mismo día. Sin necesidad de salir de la clínica: el médico solicita los estudios y tú los realizas aquí mismo, lo que agiliza tu diagnóstico y tratamiento.",
    conditions: [
      "Biometría hemática (BH) y química sanguínea",
      "Glucosa, colesterol y triglicéridos",
      "Examen general de orina",
      "Cultivos y antibiograma",
      "Prueba de embarazo",
      "Perfil tiroideo (T3, T4, TSH)",
    ],
    process: [
      { step: 1, title: "Solicitud médica", description: "Tu médico te indica los estudios necesarios según tu caso." },
      { step: 2, title: "Toma de muestra", description: "Personal capacitado toma la muestra de sangre, orina u otro material." },
      { step: 3, title: "Resultados", description: "La mayoría de estudios están listos en el mismo día; tu médico los interpreta." },
    ],
    faq: [
      { question: "¿Necesito venir en ayunas?", answer: "Para estudios de glucosa, colesterol y química sanguínea sí (8–12 horas de ayuno)." },
      { question: "¿En cuánto tiempo tengo mis resultados?", answer: "Estudios básicos: 2–4 horas. Cultivos: 24–72 horas según el estudio." },
      { question: "¿Puedo ir sin orden médica?", answer: "Sí, algunos estudios de rutina los puedes solicitar directamente. Consúltanos." },
    ],
    doctorSlugs: [],
  },
  {
    id: "imagenologia",
    slug: "imagenologia",
    name: "Imagenología",
    shortName: "Imagenología",
    icon: "ScanLine",
    shortDescription: "Ultrasonido y rayos X dentro de la clínica.",
    fullDescription:
      "Contamos con equipo de imagenología propio para ultrasonido y rayos X. Al tener estos estudios disponibles internamente, el tiempo de diagnóstico se reduce significativamente y el médico puede revisar los resultados de inmediato.",
    conditions: [
      "Ultrasonido abdominal y pélvico",
      "Ultrasonido obstétrico (embarazo)",
      "Ultrasonido mamario",
      "Radiografía de tórax, columna y extremidades",
      "Ultrasonido de tejidos blandos",
      "Estudios de seguimiento posquirúrgico",
    ],
    process: [
      { step: 1, title: "Indicación médica", description: "Tu médico indica el estudio de imagen y lo registramos en el sistema." },
      { step: 2, title: "Realización del estudio", description: "Nuestro radiólogo o técnico realiza el ultrasonido o radiografía." },
      { step: 3, title: "Interpretación y reporte", description: "El médico recibe el resultado e informe radiológico en el mismo día." },
    ],
    faq: [
      { question: "¿Se realizan ultrasonidos obstétricos en la clínica?", answer: "Sí, es uno de los estudios más frecuentes que realizamos, ideal para el control prenatal." },
      { question: "¿Necesito preparación especial?", answer: "Para ultrasonido abdominal se recomienda ayuno de 4 horas. El obstétrico no requiere preparación especial." },
      { question: "¿En cuánto tiempo tengo mi reporte?", answer: "El médico revisará los resultados el mismo día, generalmente en 1–2 horas." },
    ],
    doctorSlugs: [],
  },
];

export const getServiceBySlug = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug);
