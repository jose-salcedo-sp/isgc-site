export interface LinkItem {
  label?: string;
  href: string;
  external?: boolean;
  id: string;
}

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
  { external: true, href: externalLinks.up4u, id: "up4u" },
  { external: true, href: externalLinks.tuRutaIdeal, id: "ruta" },
  {
    external: true,
    href: "https://www.up.edu.mx/directorio/",
    id: "directory",
  },
];

export const studentResources = [
  {
    external: true,
    href: "https://portal.office.com/",
    id: "office365",
  },
  {
    external: true,
    href: "https://www.scholaro.com/gpa-calculator/Mexico",
    id: "gpa",
  },
  {
    external: true,
    href: "https://leetcode.com/discuss/general-discussion/460599/blind-75-leetcode-questions",
    id: "leetcode",
  },
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
    id: "becas",
    published: false,
    reviewDate: "2026-09-01",
  },
  {
    expiresAt: "2026-10-11",
    id: "egresados",
    published: false,
    reviewDate: "2026-09-01",
  },
] as const;

export const getCurrentHomepageEvents = () =>
  homepageEvents.filter(
    (event) =>
      event.published &&
      new Date(`${event.expiresAt}T23:59:59-06:00`).getTime() >= Date.now()
  );

export const faculty = [
  {
    email: "arodrig@up.edu.mx",
    id: "arturo",
    name: "Arturo Jafet Rodríguez",
  },
  {
    email: "cvalle@up.edu.mx",
    id: "carolina",
    name: "Carolina del Valle",
  },
] as const;

export const coordination = {
  email: "arodrig@up.edu.mx",
  name: "Arturo Jafet Rodríguez",
};
