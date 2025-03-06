"use client"
import logoClinica from "../assets/logo-clinica.png";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CiMenuFries } from "react-icons/ci";
import { Link as ScrollLink } from "react-scroll"; // Importa o Link do react-scroll
import { JSX, useState } from "react";
import ContactDialog from "./ContactDialog";

interface Link {
  href: string;
  label: string;
  icon: JSX.Element;
}

interface MobileNavProps {
  links: Link[];
}

export default function MobileNav({ links }: MobileNavProps) {
  const [visibleContacts, setVisibleContacts] = useState(false);

  const contacts = [
    { clinic: "Clínica Escola de Saúde e Imagem (CESIU)", phone: "3306-8232 e 3306-8933" },
    { clinic: "Serviço Escola de Psicologia Aplicada (SEPA)", phone: "3468-2500" },
  ];

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
        <SheetContent className="z-50 flex flex-col items-center bg-gradient-to-br from-blue-100 to-indigo-200 shadow-lg rounded-lg p-6 overflow-y-auto">
          <div className="mt-3 mb-5 text-center text-2xl ">
            <ScrollLink to="home" smooth={true} duration={500}>
              <img
                src={logoClinica.src}
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
                className="flex flex-wrap gap-2 items-center text-lg capitalize text-blue-950 hover:text-blue-600 transition-all duration-300 cursor-pointer rounded-lg border-black/50 border p-2 mt-2 bg-blue-300/50"
              >
                {link.icon}
                {link.label}
              </a>
            ))}
          </nav>
          <span className="border border-blue-950 w-full mt-4"></span>
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
          <a
            className="rgb-button w-full text-center text-base capitalize text-white hover:text-blue-600 transition-all duration-300 cursor-pointer mt-3 border border-white/50 rounded-lg p-2"
            onClick={() => setVisibleContacts(true)}
          >
            Contatos
           
          </a>
          <ContactDialog
              header="Contato das Clínicas"
              visible={visibleContacts}
              onHide={() => setVisibleContacts(false)}
              data={contacts}
              fieldName="clinic"
              fieldValue="phone"
              contactLabel="Whatsapp:"
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
