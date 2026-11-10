import type {
  ProjectMedia,
  ProjectShowcaseData,
} from "@/components/project-showcase";

export type Project = ProjectShowcaseData & {
  cover: { alt: string; src: string };
  githubUrl?: string;
  metaDescription: string;
  metaTitle?: string;
  slug: string;
};

const demoMedia: ProjectMedia[] = [
  {
    alt: "Diagrama de rayos que atraviesan una lente positiva y convergen en el plano focal.",
    caption:
      "Trazado de rayos en una lente positiva. Imagen: Goodphy, CC BY-SA 4.0.",
    kind: "photo",
    src: "/proyectos/demo/raytrace-1.png",
  },
  {
    alt: "Renderizado de vasos de vidrio con líquidos, reflejos y cáusticas.",
    caption:
      "Renderizado con trazado de rayos: refracción, reflexión y cáusticas. Imagen: Gilles Tran, dominio público.",
    kind: "photo",
    src: "/proyectos/demo/raytrace-2.jpg",
  },
  {
    caption:
      "Cáusticas y aberración de un espejo parabólico. Video: wgxli, CC0.",
    captions: "/proyectos/demo/video-captions.vtt",
    kind: "video",
    poster: "/proyectos/demo/raytrace-poster.jpg",
    src: "/proyectos/demo/raytrace-video.webm",
    type: "video/webm",
  },
  {
    alt: "Modelo 3D de ejemplo: una tetera de Utah.",
    caption:
      "Modelo 3D de ejemplo: la tetera de Utah, objeto de prueba clásico del trazado de rayos (three.js, MIT).",
    kind: "model",
    src: "/proyectos/demo/tetera.glb",
  },
];

export const projects: Project[] = [
  {
    cover: {
      alt: "Entrada del teatro de realidad virtual Tyffonium.",
      src: "/proyectos/covers/realidad-aumentada.jpg",
    },
    description:
      "Modelado, interacción y visualización digital para acercar piezas paleontológicas al público.",
    media: [],
    metaDescription:
      "Proyecto de realidad aumentada del archivo CSE: modelado e interacción para acercar piezas paleontológicas al público con visualización digital.",
    result:
      "Diseñar una experiencia que conecte investigación, tecnología y divulgación.",
    slug: "realidad-aumentada-descubrir-el-pasado",
    team: [],
    title: "Realidad aumentada para descubrir el pasado",
    year: "2015",
  },
  {
    cover: {
      alt: "Sala con pantallas de visualización de datos.",
      src: "/proyectos/covers/datos-entorno.jpg",
    },
    description:
      "Análisis y visualización para convertir información compleja en preguntas que se puedan discutir.",
    media: [],
    metaDescription:
      "Ejemplo ilustrativo de datos en CSE: análisis y visualización que convierten información compleja en preguntas claras para debatir y decidir.",
    result:
      "Comunicar hallazgos con claridad y tomar decisiones a partir de datos.",
    slug: "datos-para-entender-nuestro-entorno",
    team: [],
    title: "Datos para entender nuestro entorno",
    year: "2020",
  },
  {
    cover: {
      alt: "Reconstrucción ilustrada del Caracol en Chichén Itzá.",
      src: "/proyectos/covers/chichen-itza.jpg",
    },
    description:
      "Reconstrucción digital e interactiva inspirada en la Pirámide de Chichén Itzá, parte del archivo histórico del laboratorio de medios.",
    media: [],
    metaDescription:
      "Archivo CSE 2013: proyecto sobre la Pirámide de Chichén Itzá con reconstrucción digital e interacción para explorar el patrimonio desde la computación.",
    result: "Pirámide de Chichén Itzá",
    slug: "piramide-de-chichen-itza",
    team: [],
    title: "Pirámide de Chichén Itzá",
    year: "2013",
  },
  {
    cover: {
      alt: "Manual de programación BASIC en un ordenador retro.",
      src: "/proyectos/covers/larva-game-studios.jpg",
    },
    description:
      "Colaboración estudiantil con LARVA Game Studios: prototipos de juego y herramientas para un estudio local de entretenimiento digital.",
    githubUrl: "https://github.com/example/larva-game-studios",
    media: [],
    metaDescription:
      "Proyecto 2014 con LARVA Game Studios: prototipos de juego y pipelines de producción que conectan la carrera con la industria de videojuegos en la región.",
    result: "LARVA Game Studios",
    slug: "larva-game-studios",
    team: [],
    title: "LARVA Game Studios",
    year: "2014",
  },
  {
    cover: {
      alt: "Montaña rusa en un parque de atracciones.",
      src: "/proyectos/covers/montana-rusa.jpg",
    },
    description:
      "Simulación inmersiva de montaña rusa: física, cámara y render en tiempo real para una experiencia de parque virtual.",
    media: [],
    metaDescription:
      "Montaña rusa virtual (2014): simulación con física, cámaras y render en tiempo real; archivo histórico de experiencias inmersivas en CSE Guadalajara.",
    result: "Montaña rusa virtual",
    slug: "montana-rusa-virtual",
    team: [],
    title: "Montaña rusa virtual",
    year: "2014",
  },
  {
    cover: {
      alt: "Sala de exposición de fósiles en un museo.",
      src: "/proyectos/covers/fosiles-ra.jpg",
    },
    description:
      "Fósiles en realidad aumentada: marcadores, modelos 3D y narración para museo, hermano del archivo de divulgación paleontológica.",
    media: [],
    metaDescription:
      "Fósiles en realidad aumentada (2015): marcadores y modelos 3D con narración museográfica; archivo histórico de divulgación paleontológica en CSE.",
    result: "Fósiles en realidad aumentada",
    slug: "fosiles-en-realidad-aumentada",
    team: [],
    title: "Fósiles en realidad aumentada",
    year: "2015",
  },
  {
    cover: {
      alt: "Renderizado con trazado de rayos: vasos, refracción y cáusticas.",
      src: "/proyectos/demo/raytrace-2.jpg",
    },
    description:
      "Demostración de trazado de rayos con fotos, video WebVTT y modelo 3D de la tetera de Utah; contenido de ejemplo para el componente de proyecto.",
    githubUrl: "https://github.com/example/lorem-ipsum-trazado-de-rayos",
    media: demoMedia,
    metaDescription:
      "Demo de trazado de rayos en CSE: fotos, video con subtítulos y modelo 3D interactivo. Ejemplo de ficha de proyecto con galería mixta y equipo.",
    metaTitle: "Demo: trazado de rayos",
    result:
      "Lorem ipsum: 42% menos tiempo de espera en el proceso de catalogación.",
    slug: "lorem-ipsum-trazado-de-rayos",
    team: [
      { name: "Lorem Ipsum", role: "Alumno" },
      { name: "Dolor Sit Amet", role: "Profesor" },
      { name: "Consectetur Adipiscing", role: "Colaborador" },
    ],
    title: "Lorem ipsum dolor sit amet",
    year: "2025",
  },
  {
    cover: {
      alt: "Placa de circuito impreso recién grabada.",
      src: "/proyectos/covers/red-mesh.jpg",
    },
    description:
      "Nodos ESP32 en una red mesh para monitorear humedad en invernaderos escolares.",
    githubUrl: "https://github.com/example/red-mesh-iot",
    media: [],
    metaDescription:
      "Red mesh con microcontroladores en CSE: nodos de bajo costo, telemetría y un tablero web para leer sensores de humedad en tiempo real en el campus.",
    result: "Red estable con ocho nodos y alertas por umbral.",
    slug: "red-mesh-iot",
    team: [{ name: "Mateo Herrera", role: "Alumno" }],
    title: "Red mesh",
    year: "2026",
  },
  {
    cover: {
      alt: "Laboratorio de cómputo con equipos de escritorio.",
      src: "/proyectos/covers/galeria-multimedia.jpg",
    },
    description:
      "Sensores LoRa, ETL en Python y tableros para leer indicadores de movilidad urbana en el campus.",
    media: [
      {
        alt: "Sala de servidores con racks de red.",
        caption: "Rack de servidores usado para ingesta de datos.",
        kind: "photo",
        src: "/proyectos/covers/servidor-datos.jpg",
      },
      {
        alt: "Cables de red en un centro de datos.",
        caption: "Cableado de red del laboratorio.",
        kind: "photo",
        src: "/proyectos/covers/cable-red.jpg",
      },
      {
        alt: "Sala de cómputo con perspectiva ojo de pez.",
        caption:
          "Laboratorio de cómputo del campus. Imagen: Addjimedu, CC0 vía Wikimedia Commons.",
        kind: "photo",
        src: "/proyectos/covers/app-campus.jpg",
      },
    ],
    metaDescription:
      "Plataforma de analítica urbana con sensores LoRa en CSE: ingesta, limpieza y tableros para visualizar movilidad y ocupación en tiempo real en el campus.",
    metaTitle: "Plataforma de analítica urbana con sensores LoRa",
    result: "Tablero con seis indicadores actualizados cada cinco minutos.",
    slug: "plataforma-analitica-urbana-lora",
    team: [
      { name: "Valeria Núñez", role: "Alumna" },
      { name: "Luis Ortega", role: "Profesor" },
    ],
    title: "Plataforma de analítica urbana con sensores LoRa y tableros",
    year: "2024",
  },
  {
    cover: {
      alt: "Cables de red en un centro de datos.",
      src: "/proyectos/covers/cable-red.jpg",
    },
    description:
      "Archivo fotográfico del laboratorio: tres tomas documentan cableado, impresión 3D y robótica.",
    media: [
      {
        alt: "Placa de circuito recién grabada.",
        caption: "Placa prototipo. Imagen: Tinux, CC0 vía Wikimedia Commons.",
        kind: "photo",
        src: "/proyectos/covers/red-mesh.jpg",
      },
      {
        alt: "Impresora 3D de sinterizado en laboratorio.",
        caption: "Impresora 3D industrial. Imagen: Johannes-at-voxeljet, CC0.",
        kind: "photo",
        src: "/proyectos/covers/impresion-3d-modelo.jpg",
      },
      {
        alt: "Brazo robótico manipulando placas en laboratorio.",
        caption:
          "Brazo robótico en banco de pruebas. Imagen: dominio público, NIH.",
        kind: "photo",
        src: "/proyectos/covers/brazo-robotico.jpg",
      },
    ],
    metaDescription:
      "Archivo fotográfico del laboratorio CSE: tres escenas de red, fabricación aditiva y automatización que documentan infraestructura y prototipos del programa.",
    result: "Set publicado para material de divulgación interna.",
    slug: "archivo-fotografico-laboratorio",
    team: [],
    title: "Archivo fotográfico del laboratorio",
    year: "2022",
  },
  {
    cover: {
      alt: "Laboratorio de cómputo con equipos en filas.",
      src: "/proyectos/covers/video-documental.jpg",
    },
    description:
      "Corto documental sobre paneles solares en el campus: foto de campo y clip editado con subtítulos.",
    githubUrl: "https://github.com/example/documental-energia-solar",
    media: [
      {
        alt: "Sala de cómputo del campus.",
        caption:
          "Toma de apoyo en laboratorio. Imagen: Addjimedu, CC0 vía Wikimedia Commons.",
        kind: "photo",
        src: "/proyectos/covers/video-documental.jpg",
      },
      {
        caption:
          "Cáusticas y aberración de un espejo parabólico. Video: wgxli, CC0.",
        captions: "/proyectos/demo/video-captions.vtt",
        kind: "video",
        poster: "/proyectos/demo/raytrace-poster.jpg",
        src: "/proyectos/demo/raytrace-video.webm",
        type: "video/webm",
      },
    ],
    metaDescription:
      "Documental corto de energía solar en CSE: registro en campo, montaje con subtítulos y pieza de divulgación sobre paneles instalados en el campus universitario.",
    result: "Video de tres minutos con datos de generación diaria.",
    slug: "documental-energia-solar",
    team: [{ name: "Camila Reyes", role: "Alumna" }],
    title: "Documental de energía solar en campus",
    year: "2023",
  },
  {
    cover: {
      alt: "Impresora 3D de sinterizado en un laboratorio.",
      src: "/proyectos/covers/impresion-3d-modelo.jpg",
    },
    description:
      "Pieza impresa en 3D y modelo navegable de la misma geometría para revisar acabados.",
    githubUrl: "https://github.com/example/prototipo-impresion-3d",
    media: [
      {
        alt: "Equipo de impresión 3D de alta velocidad.",
        caption: "Impresora 3D. Imagen: Johannes-at-voxeljet, CC0.",
        kind: "photo",
        src: "/proyectos/covers/impresion-3d-modelo.jpg",
      },
      {
        alt: "Modelo 3D de la tetera de Utah.",
        caption:
          "Modelo 3D de prueba para comparar malla y pieza impresa (three.js, MIT).",
        kind: "model",
        src: "/proyectos/demo/tetera.glb",
      },
    ],
    metaDescription:
      "Prototipo con impresión 3D y modelo navegable en CSE: malla interactiva para comparar tolerancias de una pieza fabricada en el laboratorio de manufactura.",
    result: "Desviación máxima registrada menor a 0,4 mm.",
    slug: "prototipo-impresion-3d",
    team: [
      { name: "Diego Castillo", role: "Alumno" },
      { name: "María Solís", role: "Asesora" },
    ],
    title: "Prototipo de impresión 3D con vista 3D",
    year: "2021",
  },
  {
    cover: {
      alt: "Sala de servidores con racks iluminados.",
      src: "/proyectos/covers/servidor-datos.jpg",
    },
    description:
      "Cluster docente para simulaciones de n-cuerpos y prácticas de sistemas distribuidos a gran escala.",
    githubUrl: "https://github.com/example/cluster-simulacion-cse",
    media: [],
    metaDescription:
      "Cluster de cómputo docente en CSE: nueve integrantes, jobs MPI y prácticas de sistemas distribuidos para simulaciones de n-cuerpos a escala semestral.",
    result: "Cola de trabajos estable para laboratorios de séptimo semestre.",
    slug: "cluster-simulacion-cse",
    team: [
      { name: "Ana Ríos", role: "Alumna" },
      { name: "Bruno Lema", role: "Alumno" },
      { name: "Carla Méndez", role: "Alumna" },
      { name: "Daniel Vargas", role: "Alumno" },
      { name: "Elena Ponce", role: "Alumna" },
      { name: "Felipe Gómez", role: "Soporte TI" },
      { name: "Gabriela Nájera", role: "Profesora" },
    ],
    title: "Cluster de simulación para cómputo científico",
    year: "2019",
  },
  {
    cover: {
      alt: "Vista de laboratorio de cómputo del campus.",
      src: "/proyectos/covers/app-campus.jpg",
    },
    description:
      "Guía móvil para reservar cubículos y consultar horarios de la biblioteca central.",
    media: [],
    metaDescription:
      "Guía de app para biblioteca en CSE: reservas de cubículos, horarios y mapa del campus; prototipo de interacción pensado para estudiantes de primeros semestres.",
    result: "Flujo de reserva validado con diez usuarios en prueba piloto.",
    slug: "guia-app-biblioteca",
    team: [
      { name: "Héctor Ruiz", role: "Alumno" },
      { name: "Irene Campos", role: "Bibliotecaria" },
    ],
    title: "Guía de app para biblioteca del campus",
    year: "2018",
  },
  {
    cover: {
      alt: "Brazo robótico en un banco de laboratorio.",
      src: "/proyectos/covers/brazo-robotico.jpg",
    },
    description:
      "Control de un brazo robótico con ROS y visualización 3D de la trayectoria planeada.",
    githubUrl: "https://github.com/example/celda-robotica-laboratorio",
    media: [
      {
        alt: "Brazo robótico moviendo una placa de ensayo.",
        caption:
          "Celda robótica en banco. Imagen: dominio público, National Institute of Allergy and Infectious Diseases.",
        kind: "photo",
        src: "/proyectos/covers/brazo-robotico.jpg",
      },
      {
        alt: "Modelo 3D de la tetera de Utah.",
        caption: "Modelo 3D de referencia para calibrar la escena.",
        kind: "model",
        src: "/proyectos/demo/tetera.glb",
      },
    ],
    metaDescription:
      "Celda robótica con ROS y modelo 3D en CSE: trayectorias planificadas, simulación previa y control en banco para prácticas de automatización industrial.",
    result: "Repetibilidad dentro de 2 mm en diez ciclos de prueba.",
    slug: "celda-robotica-laboratorio",
    team: [
      { name: "Javier Ortiz", role: "Alumno" },
      { name: "Karen Delgado", role: "Alumna" },
      { name: "Laura Ibáñez", role: "Profesora" },
    ],
    title: "Celda robótica con simulación 3D",
    year: "2017",
  },
  {
    cover: {
      alt: "Captura de pantalla de una aplicación móvil.",
      src: "/proyectos/covers/smartphone-ui.jpg",
    },
    description:
      "Prototipo de interfaz móvil para reportar incidencias de mantenimiento en el campus.",
    githubUrl: "https://github.com/example/diseno-interfaz-movil",
    media: [
      {
        alt: "Interfaz móvil en orientación horizontal.",
        caption: "Exploración de layout móvil para reportes rápidos.",
        kind: "photo",
        src: "/proyectos/covers/smartphone-ui.jpg",
      },
      {
        alt: "Laboratorio de cómputo.",
        caption: "Contexto de prueba en laboratorio.",
        kind: "photo",
        src: "/proyectos/covers/galeria-multimedia.jpg",
      },
    ],
    metaDescription:
      "Diseño de interfaz móvil en CSE: flujo para reportar incidencias de mantenimiento, prototipo en Figma y pruebas de usabilidad con estudiantes del campus.",
    result: "Tiempo medio de reporte reducido a menos de un minuto.",
    slug: "diseno-interfaz-movil",
    team: [
      { name: "Miguel Arce", role: "Alumno" },
      { name: "Nora Jiménez", role: "Alumna" },
      { name: "Oscar Pineda", role: "Mentor" },
    ],
    title: "Diseño de interfaz móvil",
    year: "2016",
  },
];

export const getProject = (slug: string): Project | undefined =>
  projects.find((project) => project.slug === slug);

export const projectsSortedByYear = [...projects].toSorted(
  (left, right) => Number(right.year) - Number(left.year)
);
