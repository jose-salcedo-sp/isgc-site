import type { ProjectShowcaseData } from "@/components/project-showcase";

export type Project = ProjectShowcaseData & {
  cover?: { alt: string; src: string };
  githubUrl?: string;
  projectUrl?: string;
  metaDescription: string;
  metaTitle?: string;
  slug: string;
};

export const projects: Project[] = [
  {
    description:
      "Durante el hackathon Latin America vs. Covid-19 del MIT, estudiantes de la UP Guadalajara propusieron Pixan: una plataforma de realidad virtual y gamificación para apoyar la salud mental del personal médico en primera línea. El proyecto ganó en su eje temático y recibió apoyo para validación e implementación. Iván Ferrat representó a ISGC en el equipo de siete integrantes.",
    media: [],
    metaDescription:
      "Pixan, proyecto ISGC ganador en el MIT Covid-19 Challenge: VR y gamificación para la salud mental del personal médico; hackathon de 48 horas, 2020.",
    projectUrl:
      "https://www.informador.mx/tecnologia/UP-triunfa-en-el-MIT-COVID-19-Challenge-20200628-0014.html",
    result:
      "Ganador en su eje temático del MIT Latin America vs. Covid-19 Challenge; apoyo para validación e implementación.",
    slug: "pixan-mit-covid19-vr",
    team: [{ name: "Iván Ferrat", role: "Alumno ISGC · UP GDL" }],
    title: "Pixan — bienestar con realidad virtual",
    year: "2020",
  },
  {
    description:
      "Jonathan Castillo Aguilar desarrolló un motor de ray tracing en Java presentado en la convocatoria estudiantil de ACM SIGGRAPH. La UP Guadalajara fue la única universidad latinoamericana con proyectos seleccionados en esa edición, junto a instituciones como Carnegie Mellon y Texas A&M.",
    media: [],
    metaDescription:
      "Motor de ray tracing en Java de ISGC en la exhibición estudiantil de ACM SIGGRAPH 2021; UP Guadalajara, única universidad latinoamericana seleccionada.",
    metaTitle: "Ray tracing en Java — SIGGRAPH",
    result:
      "Proyecto seleccionado para la exhibición estudiantil de ACM SIGGRAPH 2021.",
    slug: "siggraph-ray-tracing-java",
    team: [
      { name: "Jonathan Castillo Aguilar", role: "Creador · ISGC 7.º" },
      { name: "Felipe López Valdez", role: "Participante institución" },
      { name: "María Fernanda Gallo Cruz", role: "Participante institución" },
      { name: "Sebastian Woolfolk", role: "Participante institución" },
      {
        name: "Saúl Eduardo Zepeda de la Torre",
        role: "Participante institución",
      },
      { name: "Sebastián García Aguirre", role: "Participante institución" },
      { name: "Benjamín Santana Velázquez", role: "Participante institución" },
      { name: "Mauricio Castro Torres", role: "Participante institución" },
      {
        name: "Guillermo Asael Fernández Villalobos",
        role: "Participante institución",
      },
      {
        name: "Santiago Juárez Badillo Chávez",
        role: "Participante institución",
      },
    ],
    title: "Ray tracing en Java — exhibición estudiantil SIGGRAPH",
    year: "2021",
  },
  {
    cover: {
      alt: "Estudiantes de ingeniería en el campus de UP Guadalajara.",
      src: "/proyectos/covers/icpc-testigos-de-german.jpg",
    },
    description:
      "En la etapa nacional de la ICPC celebrada en el ITESO, el equipo Testigos de Germán obtuvo medalla de oro y cuarto lugar nacional, avanzando a la Súper Regional Latinoamericana. El Dr. Miguel Alcaraz, co-coach, vincula el resultado con años de trabajo del Club de Programación en UP Guadalajara.",
    media: [],
    metaDescription:
      "Equipo Testigos de Germán (ISGC/SC UP Guadalajara): medalla de oro y 4.º lugar nacional en ICPC 2025; clasificación a Súper Regional Latinoamericana.",
    projectUrl:
      "https://www.up.edu.mx/escuelas-y-facultades/facultad-de-ingenieria/up-guadalajara-semestre-historico-para-la-facultad-de-ingenieria/",
    result:
      "Medalla de oro y 4.º lugar nacional; clasificación a la Súper Regional Latinoamericana.",
    slug: "icpc-testigos-de-german",
    team: [
      { name: "Álvaro Gallo Cruz", role: "Alumno" },
      { name: "Miguel Rincón Burboa", role: "Alumno" },
      { name: "Santiago de la Torre Zamudio", role: "Alumno" },
      { name: "Dr. Miguel Alcaraz", role: "Coach" },
    ],
    title: "Testigos de Germán — ICPC nacional",
    year: "2025",
  },
  {
    cover: {
      alt: "Estudiantes de ingeniería en el campus de UP Guadalajara.",
      src: "/proyectos/covers/icpc-software-chasers-2022.jpg",
    },
    description:
      "Dos equipos de Ingeniería en Sistemas y Gráficas Computacionales de UP Guadalajara clasificaron a la etapa regional de la ICPC por segundo año consecutivo. Software Chasers integró a Héctor Manuel Eguiarte Carlos, Regina Ochoa Gispert y Eduardo Ulises Martínez Vaca, entrenados por el Dr. Miguel Alcaraz.",
    media: [],
    metaDescription:
      "Software Chasers, equipo ISGC UP Guadalajara clasificado a la etapa regional ICPC 2022; competencia algorítmica internacional del Club de Programación.",
    projectUrl:
      "https://www.up.edu.mx/escuelas-y-facultades/facultad-de-ingenieria/up-guadalajara-semestre-historico-para-la-facultad-de-ingenieria/",
    result: "Clasificación a la etapa regional ICPC 2022.",
    slug: "icpc-software-chasers-2022",
    team: [
      { name: "Héctor Manuel Eguiarte Carlos", role: "Alumno" },
      { name: "Regina Ochoa Gispert", role: "Alumna" },
      { name: "Eduardo Ulises Martínez Vaca", role: "Alumno" },
      { name: "Dr. Miguel Alcaraz", role: "Coach" },
    ],
    title: "Software Chasers — ICPC regional",
    year: "2022",
  },
  {
    cover: {
      alt: "Estudiantes de ingeniería en el campus de UP Guadalajara.",
      src: "/proyectos/covers/icpc-hololive-2022.jpg",
    },
    description:
      "El equipo Hololive fue el segundo representante de UP Guadalajara en la regional ICPC 2022. Integró a Damián López Virgen, Juan Enrique Luna García y Jonathan Oswualdo Cuevas Jiménez, bajo la dirección del Club de Programación de la Facultad de Ingeniería.",
    media: [],
    metaDescription:
      "Hololive, segundo equipo ISGC UP Guadalajara en la regional ICPC 2022; programación competitiva y trabajo en equipo bajo el Club de Programación.",
    projectUrl:
      "https://www.up.edu.mx/escuelas-y-facultades/facultad-de-ingenieria/up-guadalajara-semestre-historico-para-la-facultad-de-ingenieria/",
    result: "Clasificación a la etapa regional ICPC 2022.",
    slug: "icpc-hololive-2022",
    team: [
      { name: "Damián López Virgen", role: "Alumno" },
      { name: "Juan Enrique Luna García", role: "Alumno" },
      { name: "Jonathan Oswualdo Cuevas Jiménez", role: "Alumno" },
      { name: "Dr. Miguel Alcaraz", role: "Coach" },
    ],
    title: "Hololive — ICPC regional",
    year: "2022",
  },
  {
    description:
      "Panteras Vortex es el grupo estudiantil de la Facultad de Ingenierías de la UP enfocado en videojuegos. Desde 2019 organiza talleres de Blender y Unity, la Game Jam UP y un laboratorio de desarrollo; la comunidad supera 65 miembros de distintas carreras.",
    media: [],
    metaDescription:
      "Panteras Vortex UP: grupo estudiantil de ingeniería en la UP Guadalajara; talleres Unity y Blender, Game Jam UP y laboratorio de videojuegos desde 2019.",
    projectUrl: "https://panteras-vortex-up.itch.io/",
    result:
      "Grupo activo desde 2019 con talleres, Game Jam UP y laboratorio; más de 65 integrantes.",
    slug: "panteras-vortex-up",
    team: [],
    title: "Panteras Vortex UP — laboratorio de videojuegos",
    year: "2019",
  },
  {
    description:
      "Juego de acción HTML5 creado en la Game Jam UP 3, organizada por Panteras Vortex UP en mayo de 2024. La mecánica pide impedir que Terry cruce el puente; fue desarrollado con Unity y publicado en itch.io por el autor «Javi».",
    media: [],
    metaDescription:
      "Jom VS Terry: juego de acción de la Game Jam UP 3 (2024) en UP Guadalajara; proyecto de Panteras Vortex UP publicado en itch.io con Unity.",
    projectUrl: "https://ariastroki2.itch.io/jom-vs-terry",
    result: "Entrega oficial de la Game Jam UP 3 (mayo 2024).",
    slug: "jom-vs-terry-game-jam-up-3",
    team: [{ name: "Javi", role: "Autor itch.io" }],
    title: "Jom VS Terry",
    year: "2024",
  },
  {
    description:
      "Visual novel jugable en navegador presentada en la Game Jam UP 3 de Panteras Vortex UP. El proyecto fue enviado por la cuenta itch.io «Sara_pg» dentro del plazo de la jam de mayo de 2024.",
    media: [],
    metaDescription:
      "Dive In: visual novel de la Game Jam UP 3 (2024) en UP Guadalajara; entrega de Panteras Vortex UP en itch.io, jugable en navegador.",
    projectUrl: "https://itch.io/jam/game-jam-up-3",
    result: "Entrega oficial de la Game Jam UP 3 (mayo 2024).",
    slug: "dive-in-game-jam-up-3",
    team: [{ name: "Sara_pg", role: "Autora itch.io" }],
    title: "Dive In",
    year: "2024",
  },
  {
    description:
      "Tercera entrega registrada en la Game Jam UP 3, publicada por «lolsalas» en itch.io. Forma parte del ciclo semestral de jams del grupo Panteras Vortex en la Facultad de Ingenierías UP.",
    media: [],
    metaDescription:
      "BOB: juego de la Game Jam UP 3 (2024) en Universidad Panamericana Guadalajara; proyecto estudiantil de Panteras Vortex UP en itch.io.",
    projectUrl: "https://itch.io/jam/game-jam-up-3",
    result: "Entrega oficial de la Game Jam UP 3 (mayo 2024).",
    slug: "bob-game-jam-up-3",
    team: [{ name: "lolsalas", role: "Autor itch.io" }],
    title: "BOB",
    year: "2024",
  },
  {
    description:
      "Videojuego para Windows de la Game Jam UP 4 (mayo 2025): Jade intenta reconquistar a su ex en una feria mediante un medley de minijuegos. Publicado por «Javi» en itch.io como entrega oficial de la jam.",
    media: [],
    metaDescription:
      "Fair Game: minijuegos en feria de la Game Jam UP 4 (2025) en UP Guadalajara; descarga Windows en itch.io, entrega de Panteras Vortex UP.",
    projectUrl: "https://ariastroki2.itch.io/fair-game",
    result: "Entrega oficial de la Game Jam UP 4 (mayo 2025).",
    slug: "fair-game-game-jam-up-4",
    team: [{ name: "Javi", role: "Autor itch.io" }],
    title: "Fair Game",
    year: "2025",
  },
  {
    description:
      "FPS ambientado en el Mictlán, entregado en la Game Jam UP 4 por chaiii22. En la ficha de la jam figuran integrantes Gianlucca, Isai y Juan Pablo (primeros nombres sin apellidos en fuente pública).",
    media: [],
    metaDescription:
      "Retorno del Mictlán: FPS de Game Jam UP 4 (2025) en UP Guadalajara; proyecto estudiantil Panteras Vortex con temática de Mictlán en itch.io.",
    projectUrl: "https://itch.io/jam/game-jam-up-4",
    result: "Entrega oficial de la Game Jam UP 4 (mayo 2025).",
    slug: "retorno-del-mictlan-game-jam-up-4",
    team: [
      { name: "chaiii22", role: "Autor itch.io" },
      { name: "Gianlucca", role: "Integrante (jam)" },
      { name: "Isai", role: "Integrante (jam)" },
      { name: "Juan Pablo", role: "Integrante (jam)" },
    ],
    title: "Retorno del Mictlán",
    year: "2025",
  },
  {
    description:
      "Second_Leaf (visual novel, Santin399) y Larry's Limbo (acción, Narumimin) completaron las cuatro entregas de la Game Jam UP 4 en mayo de 2025, todas bajo el paraguas de Panteras Vortex UP.",
    media: [],
    metaDescription:
      "Second_Leaf y Larry's Limbo en Game Jam UP 4 (2025): visual novel y acción de estudiantes UP en itch.io vía Panteras Vortex.",
    metaTitle: "Second_Leaf y Larry's Limbo",
    projectUrl: "https://itch.io/jam/game-jam-up-4",
    result: "Dos entregas oficiales de la Game Jam UP 4 (mayo 2025).",
    slug: "second-leaf-larrys-limbo-game-jam-up-4",
    team: [
      { name: "Santin399", role: "Autor Second_Leaf" },
      { name: "Narumimin", role: "Autor Larry's Limbo" },
    ],
    title: "Second_Leaf / Larry's Limbo",
    year: "2025",
  },
  {
    cover: {
      alt: "Sesión de producción digital con equipo de Halberd Studios y estudiantes UP.",
      src: "/proyectos/covers/halberd-studios-colaboracion-up.jpg",
    },
    description:
      "La UP Guadalajara formalizó colaboración con Halberd Studios para proyectos que integran comunicación, ingeniería, animación y programación. Estudiantes destacados participan en producción digital real; el estudio desarrolla títulos como Nine Years of Shadows y Mariachi Legends.",
    media: [],
    metaDescription:
      "Alianza UP Guadalajara y Halberd Studios: estudiantes de ingeniería en videojuegos y animación con proyectos profesionales como Mariachi Legends.",
    projectUrl:
      "https://www.up.edu.mx/noticias/innovacion-y-emprendimiento/universidad-panamericana-y-halberd-studios-intercambio-de-talento-y-aprendizaje/",
    result:
      "Colaboración académica formalizada entre UP Guadalajara y Halberd Studios.",
    slug: "halberd-studios-colaboracion-up",
    team: [{ name: "Raúl Bonillas", role: "Profesor vinculado (UP)" }],
    title: "Colaboración académica con Halberd Studios",
    year: "2026",
  },
];

export const getProject = (slug: string): Project | undefined =>
  projects.find((project) => project.slug === slug);

export const projectsSortedByYear = [...projects].toSorted(
  (left, right) => Number(right.year) - Number(left.year)
);
