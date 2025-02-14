"use client"
import logoClinica from "../assets/logo-clinica.png";
import logoBranca from "../assets/logo-branca.png";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CiMenuFries } from "react-icons/ci";
import { Link as ScrollLink } from "react-scroll"; // Importa o Link do react-scroll
import { JSX } from "react";

interface Link {
  href: string;
  label: string;
  icon: JSX.Element;
}

interface MobileNavProps {
  links: Link[];
}

export default function MobileNav({ links }: MobileNavProps) {
  // Recebe os links via props
  return (
    <div className="max-lg:fixed top-0 right-0 w-full flex justify-end items-center z-50 p-3 h-16 bg-white shadow-lg lg:hidden">
      <Sheet>
        <img
          src={logoClinica.src}
          alt="Logo da clínica"
          className="object-cover w-44 mt-4 mr-auto"
        />
        <SheetTrigger className="flex justify-center items-center">
          <CiMenuFries className="text-[32px] text-blue-600 cursor-pointer hover:text-blue-800 transition-all duration-300 " />
        </SheetTrigger>
        <SheetContent className="z-50 flex flex-col items-center bg-gradient-to-br from-gray-900 via-indigo-900 to-blue-950 shadow-lg rounded-lg p-6 overflow-y-auto">
          <div className="mt-3 mb-5 text-center text-2xl ">
            <ScrollLink to="home" smooth={true} duration={500}>
              <img
                src={logoBranca.src}
                alt="Logo da clínica"
                className="object-cover animate-fade"
              />
            </ScrollLink>
          </div>
          <nav className="flex flex-col gap-4 -mt-7">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="flex flex-wrap gap-2 items-center text-lg capitalize text-white hover:text-blue-600 transition-all duration-300 cursor-pointer"
              >
                {link.icon}
                {link.label}
              </a>
            ))}
          </nav>
          <span className="border border-white/50 w-full mt-4"></span>
          <div className="flex gap-5 flex-col justify-center items-center">
          <a
            href="/clinics"
            className="rgb-button w-full text-center text-base capitalize text-white hover:text-blue-600 transition-all duration-300 cursor-pointer mt-3 border border-white/50 rounded-lg p-2"
          >
            Conheça Nossas Unidades
          </a>
          <a
            href="https://unichristus.naja.app/portal/login"
            className="rgb-button w-full text-center text-base capitalize text-white hover:text-blue-600 transition-all duration-300 cursor-pointer mt-3 border border-white/50 rounded-lg p-2"
          >
            Exames de Imagem
          </a>
          <a
            href="/login"
            className="rgb-button2 w-full text-center text-base capitalize text-white hover:text-blue-600 transition-all duration-300 cursor-pointer mt-3 border border-white/50 rounded-lg p-2"
          >
            Exames Laboratoriais
          </a>
          <a
            href="/services"
            className="rgb-button w-full text-center text-base capitalize text-white hover:text-blue-600 transition-all duration-300 cursor-pointer mt-3 border border-white/50 rounded-lg p-2"
          >
            Conheça Todos os Serviços
          </a>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
