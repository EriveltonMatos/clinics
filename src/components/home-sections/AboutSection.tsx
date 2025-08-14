import about1 from "@/assets/about/about1.jpg";
import about2 from "@/assets/about/about2.jpg";
import about3 from "@/assets/about/about3.jpg";
import {
  FaLongArrowAltRight,
  FaStethoscope,
  FaTooth,
  FaRunning,
  FaBrain,
  FaXRay,
  FaFlask,
} from "react-icons/fa";
import unichristus from "@/assets/unichristus.jpg";

import { ScrollFromBottom, ScrollFromLeft } from "../ScrollComponent";
import Link from "next/link";
import Image from "next/image";
import { JSX } from "react";
import { useTranslations } from "next-intl";

interface Clinic {
  name: string;
  icon: JSX.Element;
}

export default function AboutSection() {
  const t = useTranslations("About");

  const clinics: Clinic[] = [
    {
      name: t('units.medicine'),
      icon: <FaStethoscope className="w-6 h-6" />,
    },
    {
      name: t('units.dentistry'),
      icon: <FaTooth className="w-6 h-6" />,
    },
    {
      name: t('units.physiotherapy'),
      icon: <FaRunning className="w-6 h-6" />,
    },
    {
      name: t('units.psychology'),
      icon: <FaBrain className="w-6 h-6" />,
    },
    {
      name: t('units.imaging'),
      icon: <FaXRay className="w-6 h-6" />,
    },
    {
      name: t('units.lab'),
      icon: <FaFlask className="w-6 h-6" />,
    },
  ];

  return (
    <section id="about" className="md:min-h-screen ">
      <div
        className="relative py-16 bg-gradient-to-r from-blue-50 to-cyan-50 border-t border-blue-900/90 md:min-h-screen md:h-auto h-auto shadow-[0_20px_50px_rgba(8,_112,_184,_0.15)]"
        style={{
          backgroundImage: `url(${unichristus.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "contrast(1.1) saturate(1.1)",
        }}
      >
        <div className="absolute inset-0  bg-[#011736]/80 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

        <div className="relative mx-auto md:py-10 w-3/4 sm:w-3/4 drop-shadow-2xl">
          <div className="flex flex-col justify-center items-center">
            <div className="sm:w-2/2 md:w-3/4 text-center">
              <div>
                <ScrollFromBottom>
                  <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                    {t("title")}
                    <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-100 bg-clip-text text-transparent">
                      UNICHRISTUS
                    </span>
                  </h2>
                </ScrollFromBottom>
              </div>
              <div>
                <ScrollFromBottom>
                  <h1 className="text-[#00E0FF] text-base font-sans font-bold tracking-wider mb-8 md:text-[2vh] md:mb-[3.5vh] pb-2 inline-block relative">
                    {t("description")}
                    <svg
                      className="absolute -bottom-1 left-0 w-full h-2 text-[#159EEC]/60"
                      viewBox="0 0 100 10"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0 5 Q 25 10, 50 5 Q 75 0, 100 5"
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                      />
                    </svg>
                  </h1>
                </ScrollFromBottom>
              </div>
              <div>
                <ScrollFromBottom>
                  <h1 className="text-white md:text-[1.5vh] mb-8 md:mb-[5vh] text-sm leading-relaxed md:w-full bg-black/20 p-4 rounded-lg">
                    {t("about")}
                  </h1>
                </ScrollFromBottom>
              </div>
            </div>

            <div className="w-auto mb-10 md:mb-[5vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
                {clinics.map((clinic, index) => (
                  <ScrollFromLeft key={index}>
                    <div
                      className="flex items-center justify-center group bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-cyan-500/20 
                                  hover:bg-white/15 hover:border-cyan-500/40 transition-all duration-300
                                  hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300 ">
                          {clinic.icon}
                        </div>
                        <h4 className="text-white font-semibold text-sm md:text-sm leading-tight">
                          {clinic.name}
                        </h4>
                      </div>
                    </div>
                  </ScrollFromLeft>
                ))}
              </div>
            </div>

            <ScrollFromLeft>
              <div className="mb-10 md:mb-[5vh]">
                <Link
                  href="/clinics"
                  className="group relative inline-flex items-center gap-3 rounded-2xl bg-blue-950 md:px-8 px-4 py-[1.5vh] md:text-[1.7vh] text-sm font-bold 
                            ring-2 ring-cyan-500 transition-all duration-300
                            hover:shadow-[0_0_10px_rgba(34,211,238,0.2),inset_0_0_8px_rgba(34,211,238,0.2)]
                          hover:bg-cyan-500/5"
                >
                  <span className="relative text-cyan-500 transition-all duration-300 group-hover:text-white">
                    {t("cta")}
                  </span>
                  <FaLongArrowAltRight
                    className="relative h-6 w-6 text-cyan-500 transition-all duration-300 
                  group-hover:text-white group-hover:translate-x-2"
                  />
                  <div className="absolute -inset-0.5 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/40 to-blue-500/40 blur-sm" />
                  </div>
                </Link>
              </div>
            </ScrollFromLeft>

            <div className="relative w-1/2 flex justify-center items-center space-x-4">
              <Image
                src={about1}
                alt="Imagem Sobre Nós"
                width={400}
                height={300}
                className="md:w-[40vh] h-auto relative z-10 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
              />
              <Image
                src={about2}
                alt="Imagem Sobre Nós"
                width={350}
                height={250}
                className="absolute top-10 md:-left-[16vh] -left-28 md:w-[37vh] h-auto z-0 rounded-xl shadow-md opacity-75 hover:opacity-90 hover:scale-105 transform transition-all duration-300 ease-in-out"
              />
              <Image
                src={about3}
                alt="Imagem Sobre Nós"
                width={350}
                height={250}
                className="absolute top-10 md:-right-[16vh] -right-24 md:w-[37vh] h-auto z-0 rounded-xl shadow-md opacity-75 hover:opacity-90 hover:scale-105 transform transition-all duration-300 ease-in-out"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
