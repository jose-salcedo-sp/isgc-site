/*
 * Topics for the moving study plan on the home page: each one lists the
 * courses (ids from src/data/curriculum.json) it lights up. A course can
 * belong to more than one topic. Topic names live in the dictionaries under
 * pages.home.plan.topics.
 */
export const studyTopics = [
  {
    courses: [
      "analisis-y-diseno-de-algoritmos",
      "programacion-orientada-a-objetos",
      "programacion-avanzada",
      "programacion-y-estructura-de-datos",
      "desarrollo-de-plugins",
      "compiladores",
      "ingenieria-de-software",
      "direccion-de-proyectos",
      "seminario-de-aplicaciones-alternativas",
    ],
    id: "software",
  },
  {
    courses: [
      "desarrollo-de-aplicaciones-web",
      "diseno-de-interfaces",
      "soluciones-graficas-para-moviles",
    ],
    id: "web",
  },
  {
    courses: [
      "introduccion-a-las-bases-de-datos",
      "probabilidad-y-estadistica",
      "computo-distribuido",
      "procesamiento-de-imagenes",
      "inteligencia-artificial-en-videojuegos",
    ],
    id: "dataAi",
  },
  {
    courses: [
      "circuitos-digitales-y-electricos",
      "sistemas-operativos",
      "computo-distribuido",
      "fundamentos-de-programacion-en-paralelo",
      "programacion-avanzada-en-paralelo",
      "compiladores",
    ],
    id: "systems",
  },
  {
    courses: [
      "calculo-diferencial",
      "algebra",
      "fisica",
      "calculo-integral",
      "algebra-lineal",
      "quimica",
      "calculo-vectorial",
      "matematicas-de-la-computacion",
      "probabilidad-y-estadistica",
      "ecuaciones-diferenciales",
      "metodos-numericos",
      "algebra-geometrica-conformal",
    ],
    id: "math",
  },
  {
    courses: [
      "modelacion-digital",
      "multimedios-y-graficas-computacionales",
      "desarrollo-de-videojuegos",
      "geometria-computacional",
      "algebra-geometrica-conformal",
      "soluciones-graficas-para-moviles",
      "realidad-aumentada",
      "inteligencia-artificial-en-videojuegos",
      "graficacion-avanzada-por-computadora",
      "tecnicas-de-interpretacion-avanzadas",
      "simulacion-grafica",
    ],
    id: "graphics",
  },
] as const;

/** Ids of the topics a course belongs to. */
export const topicsOf = (courseId: string): string[] => {
  const ids: string[] = [];
  for (const topic of studyTopics) {
    for (const course of topic.courses) {
      if (course === courseId) {
        ids.push(topic.id);
      }
    }
  }
  return ids;
};
