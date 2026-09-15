import { SiteMotion } from "@/components/site-motion";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ISGC | Ingeniería en Sistemas y Gráficas Computacionales",
  description:
    "Conoce la carrera de Ingeniería en Sistemas y Gráficas Computacionales de la Universidad Panamericana Guadalajara.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}<SiteMotion /></body>
    </html>
  );
}
