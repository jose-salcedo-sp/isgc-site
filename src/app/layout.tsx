import type { Metadata } from "next";

import { SiteMotion } from "@/components/site-motion";

import "./globals.css";

export const metadata: Metadata = {
  description:
    "Conoce la carrera de Ingeniería en Sistemas y Gráficas Computacionales de la Universidad Panamericana Guadalajara.",
  title: "ISGC | Ingeniería en Sistemas y Gráficas Computacionales",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="es">
    <body>
      {children}
      <SiteMotion />
    </body>
  </html>
);

export default RootLayout;
