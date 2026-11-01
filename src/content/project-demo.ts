import type { ProjectShowcaseData } from "@/components/project-showcase";

/*
 * Demo content for the before/after comparison on /proyectos. Copy and media
 * live here until the real projects arrive; the labels stay in Spanish on
 * purpose, since this block is temporary.
 */
export const demoProject: ProjectShowcaseData = {
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Donec ullamcorper nulla non metus auctor fringilla.",
  media: [
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
  ],
  result:
    "Lorem ipsum: 42% menos tiempo de espera en el proceso de catalogación.",
  team: [
    { name: "Lorem Ipsum", role: "Alumno" },
    { name: "Dolor Sit Amet", role: "Profesor" },
    { name: "Consectetur Adipiscing", role: "Colaborador" },
  ],
  title: "Lorem ipsum dolor sit amet",
  year: "2025",
};
