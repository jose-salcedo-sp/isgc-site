export type LinkItem = {
  label: string;
  href: string;
  external?: boolean;
};

export type Resource = LinkItem & {
  description: string;
  group: "Estudio" | "Trámites" | "Desarrollo profesional";
};

export type FaqItem = {
  question: string;
  answer: string;
};

export const primaryNavigation = [
  { href: "/carrera", label: "Carrera" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/comunidad", label: "Comunidad" },
  { href: "/alumnos", label: "Alumnos" },
];

export const externalLinks = {
  up4u: "https://up4u.up.edu.mx/p/home",
  tuRutaIdeal: "http://192.100.179.64/TuRutaIdeal/",
  admissions: "https://www.up.edu.mx/",
  scholarships: "http://apoyoeconomico.gdl.up.mx/",
  campusMap: "https://www.up.edu.mx/sites/default/files/mapa_gdl_compressed.pdf",
  privacy: "https://www.up.edu.mx/aviso-de-privacidad/",
  generalRegulations: "https://www.up.edu.mx/sites/default/files/reglamento_general_up_2020.pdf",
  engineeringRegulations: "https://www.up.edu.mx/sites/default/files/ri_ingenieria_2017.pdf",
  schoolServices: "https://sites.google.com/up.edu.mx/servicios-escolares-upgdl/normativa",
  instagram: "https://www.instagram.com/isgc_upgdl/",
  facebook: "https://www.facebook.com/isgc.upgdl/",
};

export const quickAccess: LinkItem[] = [
  { label: "UP4U", href: externalLinks.up4u, external: true },
  { label: "Tu Ruta Ideal", href: externalLinks.tuRutaIdeal, external: true },
  { label: "Directorio institucional", href: "https://www.up.edu.mx/directorio/", external: true },
];

export const studentResources: Resource[] = [
  { label: "Office 365", description: "Correo, archivos y herramientas de trabajo.", group: "Estudio", href: "https://portal.office.com/", external: true },
  { label: "GPA Calculator", description: "Convierte tu promedio al estándar GPA.", group: "Estudio", href: "https://www.scholaro.com/gpa-calculator/Mexico", external: true },
  { label: "LeetCode · Blind 75", description: "Problemas para practicar entrevistas técnicas.", group: "Estudio", href: "https://leetcode.com/discuss/general-discussion/460599/blind-75-leetcode-questions", external: true },
  { label: "Portal de pagos", description: "Realiza tus pagos en línea.", group: "Trámites", href: "https://portaldepagos.up.edu.mx/", external: true },
  { label: "Tesorería", description: "Formas de pago, referencias y documentos.", group: "Trámites", href: "https://movil.gdl.up.mx/tesoreria/seccion/formas_de_pago/guadalajara", external: true },
  { label: "Kardex", description: "Solicita documentos y constancias.", group: "Trámites", href: "https://movil.gdl.up.mx/tesoreria/seccion/documentos/guadalajara", external: true },
  { label: "Servicios Escolares", description: "Normativa y gestiones académicas.", group: "Trámites", href: externalLinks.schoolServices, external: true },
  { label: "Reglamentos", description: "Reglamento general y de Ingenierías.", group: "Trámites", href: externalLinks.generalRegulations, external: true },
  { label: "LinkedIn", description: "Construye tu perfil profesional.", group: "Desarrollo profesional", href: "https://mx.linkedin.com/", external: true },
  { label: "Portales de prácticas", description: "Explora vacantes y oportunidades.", group: "Desarrollo profesional", href: "/oportunidades" },
  { label: "GitHub", description: "Organiza y comparte tu trabajo.", group: "Desarrollo profesional", href: "https://github.com/", external: true },
];

export const homepageEvents = [
  { id: "becas", published: false, title: "Convocatoria de becas", date: "24 de septiembre de 2026", text: "Consulta requisitos y documentación antes de iniciar tu solicitud.", expiresAt: "2026-10-01", owner: "Coordinación ISGC", reviewDate: "2026-09-01" },
  { id: "egresados", published: false, title: "Panel de egresados", date: "10 de octubre de 2026", text: "Conoce cómo nuestros egresados conectan la carrera con su campo profesional.", expiresAt: "2026-10-11", owner: "Coordinación ISGC", reviewDate: "2026-09-01" },
];

export function getCurrentHomepageEvents() {
  return homepageEvents.filter((event) => event.published && new Date(`${event.expiresAt}T23:59:59-06:00`).getTime() >= Date.now());
}

export const campusImage = "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1400&q=85";

export const capabilities = [
  { title: "Piensa en sistemas", text: "Entiende un problema, ordénalo y encuentra una ruta clara para resolverlo." },
  { title: "Prototipa y construye", text: "Diseña software, datos y experiencias digitales que se pueden probar y mejorar." },
  { title: "Trabaja con personas", text: "Colabora con claridad y crea productos que funcionen para quienes los usan." },
];

export const specialties = [
  { title: "Ciencia de datos", text: "Encuentra patrones, explica decisiones y construye soluciones a partir de información real.", subjects: ["Programación", "Probabilidad y estadística", "Bases de datos"] },
  { title: "Efectos visuales", text: "Combina matemáticas, programación y sensibilidad visual para crear experiencias digitales.", subjects: ["Geometría computacional", "Modelado 3D", "Animación digital"] },
];


export const faculty = [
  { name: "Arturo Jafet Rodríguez", role: "Dirección de ISGC", area: "Computación y formación profesional", email: "arodrig@up.edu.mx" },
  { name: "Carolina del Valle", role: "Academia de Cómputo", area: "Programación y proyectos aplicados", email: "cvalle@up.edu.mx" },
];

export const projects = [
  { title: "Realidad aumentada para descubrir el pasado", date: "Archivo · 2015", authors: "Equipo Media Lab", process: "Modelado, interacción y visualización digital para acercar piezas paleontológicas al público.", learning: "Diseñar una experiencia que conecte investigación, tecnología y divulgación.", image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1200&q=85" },
  { title: "Datos para entender nuestro entorno", date: "Ejemplo de aplicación", authors: "Ejemplo ilustrativo", process: "Análisis y visualización para convertir información compleja en preguntas que se puedan discutir.", learning: "Comunicar hallazgos con claridad y tomar decisiones a partir de datos.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85" },
];

export const mediaLabArchive = [
  { title: "Pirámide de Chichén Itzá", date: "2013" },
  { title: "LARVA Game Studios", date: "2014" },
  { title: "Montaña rusa virtual", date: "2014" },
  { title: "Fósiles en realidad aumentada", date: "2015" },
];

export const audienceFaqs = {
  aspirantes: [
    { question: "¿Qué aprenderé en ISGC?", answer: "Programación, sistemas, datos y gráficas computacionales a través de proyectos y fundamentos técnicos." },
    { question: "¿Dónde consulto admisiones?", answer: "Consulta el proceso oficial y las fechas directamente en Admisiones de la Universidad Panamericana." },
    { question: "¿Hay opciones de apoyo económico?", answer: "Revisa la convocatoria de becas y financiamiento, sus requisitos y fechas en el portal institucional." },
  ] satisfies FaqItem[],
  alumnos: [
    { question: "¿Dónde consulto mi plan de estudios?", answer: "Abre Tu Ruta Ideal para planear tus materias y solicita a Coordinación el plan oficial vigente." },
    { question: "¿A quién contacto para un trámite?", answer: "Busca el recurso en Alumnos para encontrar el área responsable y su acceso directo." },
    { question: "¿Dónde veo reglamentos y servicios escolares?", answer: "Están agrupados en el Centro de alumnos, junto con los accesos de Tesorería y Servicios Escolares." },
  ] satisfies FaqItem[],
};

export const campusSpaces = [
  { title: "Laboratorios CIAC", location: "Edificio A · Ingenierías · 2.º piso", text: "Espacio para prácticas y proyectos de computación." },
  { title: "Oficina de Dirección", location: "Edificio C · 3.º piso", text: "Resuelve dudas sobre la carrera, materias y proyectos." },
  { title: "Coordinación", location: "Edificio C · 3.º piso", text: "Encuentra orientación sobre materias, profesores y procesos académicos." },
];

export const coordination = {
  name: "Arturo Jafet Rodríguez",
  email: "arodrig@up.edu.mx",
  location: "Edificio C · 3.º piso",
};
