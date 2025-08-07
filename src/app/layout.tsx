import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/api/AuthContext";
import { ThemeProvider } from "@/components/ThemeProvider";


export const metadata: Metadata = {
  title: "Clinicas Unichristus",
  description: "Portal de clínicas escola Unichristus",
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
