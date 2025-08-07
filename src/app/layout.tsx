import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/api/AuthContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import ressonancia from "../assets/ressonancia.jpg";

const imageUrl = `${ressonancia.src}?v=${Date.now()}`;

export const metadata: Metadata = {
  title: "Clínicas Unichristus",
  description: "Portal de clínicas escola Unichristus",
  openGraph: {
    title: "Clínicas Unichristus",
    description: "Conheça o portal das clínicas escola da Unichristus. Atendimento, agendamento e muito mais.",
    url: "https://clinicas.unichristus.edu.br", // Altere para o link real
    siteName: "Clínicas Unichristus",
    images: [
      {
        url: imageUrl, 
        width: 1000,
        height: 630,
        alt: "Clínicas Unichristus",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        {children}
        </ThemeProvider>
      </AuthProvider>
      </body>
    </html>
  );
}
