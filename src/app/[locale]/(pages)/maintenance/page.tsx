"use client";
import Link from "next/link";
import { ArrowLeft, Settings, ArrowRight } from "lucide-react";
import footerBackground from "@/assets/footer-background.jpg";
import logoClinica from "@/assets/logo-clinica.png";
import Image from "next/image";

export default function Maintenance() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: `url(${footerBackground.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60" />

      <div className="w-full max-w-4xl flex flex-col rounded-2xl shadow-2xl overflow-hidden bg-white/10 backdrop-blur-lg relative z-10 animate-fade">
        <div className="text-center pt-8 pb-4">
          <Image
            src={logoClinica.src}
            className="w-64 mx-auto mb-6 bg-white p-3 rounded-lg"
            alt="Logo"
            height={1000}
            width={1000}
          />
          <h1 className="text-4xl font-bold text-white mb-2">
            Portal em Manutenção
          </h1>
          <div className="w-24 h-1 bg-blue-400 mx-auto rounded-full mb-4"></div>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto px-4">
            Estamos realizando melhorias em nosso sistema para oferecer uma
            experiência ainda melhor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
          <div className="bg-white/10 rounded-xl p-6 backdrop-blur flex flex-col items-center text-center">
            <div className="bg-blue-500/20 p-4 rounded-full mb-4">
              <Settings
                className="w-10 h-10 text-blue-300 animate-spin"
                style={{ animationDuration: "3s" }}
              />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Atualizações do Sistema
            </h3>
            <p className="text-blue-100">
              Estamos implementando novos recursos e melhorando a segurança do
              portal.
            </p>
          </div>

          <div className="bg-white/10 rounded-xl p-6 backdrop-blur flex flex-col items-center text-center">
            <div className="bg-blue-500/20 p-4 rounded-full mb-4">
              <ArrowRight className="w-10 h-10 text-blue-300" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Próximos Passos
            </h3>
            <p className="text-blue-100">
              Volte em breve para acessar seus resultados com nossa nova
              interface.
            </p>
          </div>
        </div>

        <div className="bg-blue-900/40 p-8 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar ao site
            </Link>
          </div>
        </div>

        <div className="p-4 text-center text-blue-100/70 text-sm">
          © {new Date().getFullYear()} Unichristus - Todos os direitos
          reservados
        </div>
      </div>
    </div>
  );
}
