export interface LinkItem {
  label: string;
  href: string;
  external?: boolean;
}

export type Resource = LinkItem & {
  description: string;
  group: "Estudio" | "Trámites" | "Desarrollo profesional";
};

export interface FaqItem {
  question: string;
  answer: string;
}

export const primaryNavigation = [
  { href: "/carrera", label: "Carrera" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/comunidad", label: "Comunidad" },
  { href: "/alumnos", label: "Alumnos" },
];

export const externalLinks = {
  admissions: "https://www.up.edu.mx/",
  campusMap:
    "https://www.up.edu.mx/sites/default/files/mapa_gdl_compressed.pdf",
  engineeringRegulations:
    "https://www.up.edu.mx/sites/default/files/ri_ingenieria_2017.pdf",
  facebook: "https://www.facebook.com/isgc.upgdl/",
  generalRegulations:
    "https://www.up.edu.mx/sites/default/files/reglamento_general_up_2020.pdf",
  instagram: "https://www.instagram.com/isgc_upgdl/",
  privacy: "https://www.up.edu.mx/aviso-de-privacidad/",
  scholarships: "http://apoyoeconomico.gdl.up.mx/",
  schoolServices:
    "https://sites.google.com/up.edu.mx/servicios-escolares-upgdl/normativa",
  tuRutaIdeal: "http://192.100.179.64/TuRutaIdeal/",
  up4u: "https://up4u.up.edu.mx/p/home",
};

export const quickAccess: LinkItem[] = [
  { external: true, href: externalLinks.up4u, label: "UP4U" },
  { external: true, href: externalLinks.tuRutaIdeal, label: "Tu Ruta Ideal" },
  {
    external: true,
    href: "https://www.up.edu.mx/directorio/",
    label: "Directorio institucional",
  },
];

export const studentResources: Resource[] = [
  {
    description: "Correo, archivos y herramientas de trabajo.",
    external: true,
    group: "Estudio",
    href: "https://portal.office.com/",
    label: "Office 365",
  },
  {
    description: "Convierte tu promedio al estándar GPA.",
    external: true,
    group: "Estudio",
    href: "https://www.scholaro.com/gpa-calculator/Mexico",
    label: "GPA Calculator",
  },
  {
    description: "Problemas para practicar entrevistas técnicas.",
    external: true,
    group: "Estudio",
    href: "https://leetcode.com/discuss/general-discussion/460599/blind-75-leetcode-questions",
    label: "LeetCode · Blind 75",
  },
  {
    description: "Realiza tus pagos en línea.",
    external: true,
    group: "Trámites",
    href: "https://portaldepagos.up.edu.mx/",
    label: "Portal de pagos",
  },
  {
    description: "Formas de pago, referencias y documentos.",
    external: true,
    group: "Trámites",
    href: "https://movil.gdl.up.mx/tesoreria/seccion/formas_de_pago/guadalajara",
    label: "Tesorería",
  },
  {
    description: "Solicita documentos y constancias.",
    external: true,
    group: "Trámites",
    href: "https://movil.gdl.up.mx/tesoreria/seccion/documentos/guadalajara",
    label: "Kardex",
  },
  {
    description: "Normativa y gestiones académicas.",
    external: true,
    group: "Trámites",
    href: externalLinks.schoolServices,
    label: "Servicios Escolares",
  },
  {
    description: "Reglamento general y de Ingenierías.",
    external: true,
    group: "Trámites",
    href: externalLinks.generalRegulations,
    label: "Reglamentos",
  },
  {
    description: "Construye tu perfil profesional.",
    external: true,
    group: "Desarrollo profesional",
    href: "https://mx.linkedin.com/",
    label: "LinkedIn",
  },
  {
    description: "Explora vacantes y oportunidades.",
    group: "Desarrollo profesional",
    href: "/oportunidades",
    label: "Portales de prácticas",
  },
  {
    description: "Organiza y comparte tu trabajo.",
    external: true,
    group: "Desarrollo profesional",
    href: "https://github.com/",
    label: "GitHub",
  },
];

export const homepageEvents = [
  {
    date: "24 de septiembre de 2026",
    expiresAt: "2026-10-01",
    id: "becas",
    owner: "Coordinación ISGC",
    published: false,
    reviewDate: "2026-09-01",
    text: "Consulta requisitos y documentación antes de iniciar tu solicitud.",
    title: "Convocatoria de becas",
  },
  {
    date: "10 de octubre de 2026",
    expiresAt: "2026-10-11",
    id: "egresados",
    owner: "Coordinación ISGC",
    published: false,
    reviewDate: "2026-09-01",
    text: "Conoce cómo nuestros egresados conectan la carrera con su campo profesional.",
    title: "Panel de egresados",
  },
];

export const getCurrentHomepageEvents = () =>
  homepageEvents.filter(
    (event) =>
      event.published &&
      new Date(`${event.expiresAt}T23:59:59-06:00`).getTime() >= Date.now()
  );

export const campusImage =
  "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1400&q=85";

export const capabilities = [
  {
    text: "Entiende un problema, ordénalo y encuentra una ruta clara para resolverlo.",
    title: "Piensa en sistemas",
  },
  {
    text: "Diseña software, datos y experiencias digitales que se pueden probar y mejorar.",
    title: "Prototipa y construye",
  },
  {
    text: "Colabora con claridad y crea productos que funcionen para quienes los usan.",
    title: "Trabaja con personas",
  },
];

export const specialties = [
  {
    subjects: ["Programación", "Probabilidad y estadística", "Bases de datos"],
    text: "Encuentra patrones, explica decisiones y construye soluciones a partir de información real.",
    title: "Ciencia de datos",
  },
  {
    subjects: ["Geometría computacional", "Modelado 3D", "Animación digital"],
    text: "Combina matemáticas, programación y sensibilidad visual para crear experiencias digitales.",
    title: "Efectos visuales",
  },
];

export const faculty = [
  {
    area: "Computación y formación profesional",
    email: "arodrig@up.edu.mx",
    name: "Arturo Jafet Rodríguez",
    role: "Dirección de ISGC",
  },
  {
    area: "Programación y proyectos aplicados",
    email: "cvalle@up.edu.mx",
    name: "Carolina del Valle",
    role: "Academia de Cómputo",
  },
];

export const projects = [
  {
    authors: "Equipo Media Lab",
    date: "Archivo · 2015",
    image:
      "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1200&q=85",
    learning:
      "Diseñar una experiencia que conecte investigación, tecnología y divulgación.",
    process:
      "Modelado, interacción y visualización digital para acercar piezas paleontológicas al público.",
    title: "Realidad aumentada para descubrir el pasado",
  },
  {
    authors: "Ejemplo ilustrativo",
    date: "Ejemplo de aplicación",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85",
    learning:
      "Comunicar hallazgos con claridad y tomar decisiones a partir de datos.",
    process:
      "Análisis y visualización para convertir información compleja en preguntas que se puedan discutir.",
    title: "Datos para entender nuestro entorno",
  },
];

export const mediaLabArchive = [
  { date: "2013", title: "Pirámide de Chichén Itzá" },
  { date: "2014", title: "LARVA Game Studios" },
  { date: "2014", title: "Montaña rusa virtual" },
  { date: "2015", title: "Fósiles en realidad aumentada" },
];

export const audienceFaqs = {
  alumnos: [
    {
      answer:
        "Abre Tu Ruta Ideal para planear tus materias y solicita a Coordinación el plan oficial vigente.",
      question: "¿Dónde consulto mi plan de estudios?",
    },
    {
      answer:
        "Busca el recurso en Alumnos para encontrar el área responsable y su acceso directo.",
      question: "¿A quién contacto para un trámite?",
    },
    {
      answer:
        "Están agrupados en el Centro de alumnos, junto con los accesos de Tesorería y Servicios Escolares.",
      question: "¿Dónde veo reglamentos y servicios escolares?",
    },
  ] satisfies FaqItem[],
  aspirantes: [
    {
      answer:
        "Programación, sistemas, datos y gráficas computacionales a través de proyectos y fundamentos técnicos.",
      question: "¿Qué aprenderé en ISGC?",
    },
    {
      answer:
        "Consulta el proceso oficial y las fechas directamente en Admisiones de la Universidad Panamericana.",
      question: "¿Dónde consulto admisiones?",
    },
    {
      answer:
        "Revisa la convocatoria de becas y financiamiento, sus requisitos y fechas en el portal institucional.",
      question: "¿Hay opciones de apoyo económico?",
    },
  ] satisfies FaqItem[],
};

export const campusSpaces = [
  {
    location: "Edificio A · Ingenierías · 2.º piso",
    text: "Espacio para prácticas y proyectos de computación.",
    title: "Laboratorios CIAC",
  },
  {
    location: "Edificio C · 3.º piso",
    text: "Resuelve dudas sobre la carrera, materias y proyectos.",
    title: "Oficina de Dirección",
  },
  {
    location: "Edificio C · 3.º piso",
    text: "Encuentra orientación sobre materias, profesores y procesos académicos.",
    title: "Coordinación",
  },
];

export const coordination = {
  email: "arodrig@up.edu.mx",
  location: "Edificio C · 3.º piso",
  name: "Arturo Jafet Rodríguez",
};
