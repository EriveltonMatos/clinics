"use client";
import logoClinica from "@/assets/logo-clinica.png";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CiMenuFries } from "react-icons/ci";
import { Link as ScrollLink } from "react-scroll";
import { JSX } from "react";
import Image from "next/image";
import { MdLocationOn } from "react-icons/md";
import { FaFlask, FaXRay } from "react-icons/fa";
import Link from "next/link";
import LanguageSwitcher from "../LocaleSwitcher";
import { useTranslations } from "next-intl";

interface Link {
  href: string;
  label: string;
  icon: JSX.Element;
}

interface MobileNavProps {
  links: Link[];
}

export default function MobileNav({ links }: MobileNavProps) {
  const t = useTranslations('MobileNav')
  return (
    <div className="max-lg:fixed top-0 right-0 w-full flex justify-end items-center z-50 p-3 h-16 bg-white shadow-lg lg:hidden">
      <Sheet>
        <Image
          src={logoClinica.src}
          alt="Logo da clínica"
          className="object-cover w-44 mr-auto"
          width={1000}
          height={1000}
        />
        <SheetTrigger className="flex justify-center items-center">
          <div className="p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-all duration-300 shadow-md">
            <CiMenuFries className="text-[26px] text-white" />
          </div>
        </SheetTrigger>
        <SheetContent className="z-50 flex flex-col items-center bg-gradient-to-b from-white to-blue-50 shadow-lg rounded-l-2xl p-6 overflow-y-auto border-l-2 border-blue-300">
          <div className="mt-3 text-center">
            <ScrollLink to="home" smooth={true} duration={500}>
              <div className="bg-white p-4 rounded-xl shadow-md mb-4">
                <Image
                  src={logoClinica.src}
                  alt="Logo da clínica"
                  className="object-cover"
                  width={1000}
                  height={1000}
                />
              </div>
            </ScrollLink>
          <LanguageSwitcher />
          </div>
          <nav className="flex flex-col gap-3 w-full mt-2">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="flex items-center gap-3 px-4 py-3 text-base font-semibold text-blue-700
                           bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300
                           hover:bg-blue-50 border border-blue-100"
              >
                <div className="text-blue-500 text-xl">{link.icon}</div>
                <span>{link.label}</span>
              </a>
            ))}
          </nav>
          <div className="w-full h-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent my-6" />
          <div className="flex gap-4 flex-col justify-center items-center w-full">
            <Link
              href="/clinics"
              className="w-full flex items-center justify-center gap-2 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 
               transition-all duration-300 cursor-pointer rounded-xl p-3 shadow-md"
            >
              <MdLocationOn className="text-xl" />
              {t("units")}
            </Link>
            <a
              href="https://unichristus.naja.app/portal/login"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 text-base font-medium text-white bg-teal-700 hover:bg-teal-800 
               transition-all duration-300 cursor-pointer rounded-xl p-3 shadow-md border border-teal-600"
            >
              <FaXRay className="text-xl" />
              {t("imageExam")}
            </a>
            <Link
              href="/maintenance"
              className="rgb-button2 w-full flex items-center justify-center gap-2 text-base font-medium text-white 
               transition-all duration-300 rounded-xl p-3 shadow-md"
            >
              <FaFlask className="text-xl" />
              {t("labExams")}
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}