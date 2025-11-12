import React from "react";
import { ThemeProvider } from "./components/theme/ThemeContext";
import localFont from "next/font/local";
import type { Metadata } from "next";
import "./globals.css";

// Fuentes locales
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Metadatos de la aplicación
export const metadata: Metadata = {
  title: " Mena Dev",
  description:
    "Explora los proyectos y habilidades de Mena Dev, un desarrollador con experiencia en frontend y backend, utilizando tecnologías modernas como React, Tailwind CSS, y Next.js.",
};

// RootLayout con ThemeProvider
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
