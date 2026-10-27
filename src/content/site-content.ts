export const externalLinks = {
  absenceForm:
    "https://docs.google.com/forms/d/179G__cx4hu5BhpMQG-Tr7bviZyBi0Sp86mQYMDbshbM/viewform",
  admissions: "https://www.up.edu.mx/",
  campusMap:
    "https://www.up.edu.mx/sites/default/files/mapa_gdl_compressed.pdf",
  coordinationAppointments: "https://calendar.app.google/tXpr8jedMtw7C7jw9",
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

export const studentResources = [
  {
    external: true,
    href: "https://portal.office.com/",
    id: "office365",
  },
  { external: true, href: externalLinks.tuRutaIdeal, id: "ruta" },
  { href: "/carrera#gpa", id: "gpa" },
  {
    external: true,
    href: "https://leetcode.com/discuss/general-discussion/460599/blind-75-leetcode-questions",
    id: "leetcode",
  },
  { external: true, href: externalLinks.up4u, id: "up4u" },
  {
    external: true,
    href: "https://portaldepagos.up.edu.mx/",
    id: "payments",
  },
  {
    external: true,
    href: "https://movil.gdl.up.mx/tesoreria/seccion/formas_de_pago/guadalajara",
    id: "treasury",
  },
  {
    external: true,
    href: "https://movil.gdl.up.mx/tesoreria/seccion/documentos/guadalajara",
    id: "kardex",
  },
  {
    external: true,
    href: externalLinks.schoolServices,
    id: "school-services",
  },
  {
    external: true,
    href: externalLinks.generalRegulations,
    id: "regulations",
  },
  {
    external: true,
    href: "https://www.up.edu.mx/directorio/",
    id: "directory",
  },
  { external: true, href: externalLinks.campusMap, id: "map" },
  {
    external: true,
    href: "https://mx.linkedin.com/",
    id: "linkedin",
  },
  {
    href: "/oportunidades",
    id: "internships",
  },
  {
    external: true,
    href: "https://github.com/",
    id: "github",
  },
] as const;

export const homepageEvents = [
  {
    expiresAt: "2026-10-01",
    href: externalLinks.scholarships,
    id: "becas",
    pinned: false,
    published: false,
    reviewDate: "2026-09-01",
    startsAt: "2026-09-24",
  },
  {
    expiresAt: "2026-10-11",
    href: null,
    id: "egresados",
    pinned: false,
    published: false,
    reviewDate: "2026-09-01",
    startsAt: "2026-10-10",
  },
] as const;

export const getCurrentHomepageEvents = () =>
  homepageEvents
    .filter(
      (event) =>
        event.published &&
        new Date(`${event.expiresAt}T23:59:59-06:00`).getTime() >= Date.now()
    )
    .toSorted((a, b) => Number(b.pinned) - Number(a.pinned));

/** Whole days from `now` until the start of `date` in Guadalajara; 0 on the day itself. */
export const daysUntil = (date: string, now = Date.now()) =>
  Math.ceil(
    (new Date(`${date}T00:00:00-06:00`).getTime() - now) / 86_400_000
  ) || 0;

export const faculty = [
  {
    email: "bmoya@up.edu.mx",
    id: "bernardo",
    name: "Bernardo Moya de la Mora",
  },
  {
    email: "malvarezg@up.edu.mx",
    id: "marcelo",
    name: "Marcelo Alvarez García",
  },
] as const;
