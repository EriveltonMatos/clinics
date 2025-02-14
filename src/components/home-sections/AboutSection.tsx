import about1 from "@/assets/about/about1.jpg";
import about2 from "@/assets/about/about2.jpg";
import about3 from "@/assets/about/about3.jpg";
import { FaLongArrowAltRight } from "react-icons/fa";
import unichristus from "@/assets/unichristus.jpg";

import { ScrollFromBottom, ScrollFromLeft } from "../ScrollComponent";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section id="about" className="md:min-h-screen gap-2 ">
      <div
        className="relative py-12 bg-blue-100 border-t-2 border-sky-50 md:min-h-screen md:h-auto h-[50rem]"
        style={{
          backgroundImage: `url(${unichristus.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-blue-700 opacity-90 brightness-50 mx-auto"></div>
        <div className="relative mx-auto md:py-10 w-3/4 sm:w-3/4">
          <div className="flex flex-col justify-center items-center ">
            <div className="sm:w-2/2 md:w-3/4 text-center">
              <div>
                <ScrollFromBottom>
                  <h2
                    className="text-white md:tracking-widest tracking-widest font-bold text-4xl md:text-[7vh] md:mb-[4vh] w-full text-center Fraunces leading-none mb-6 "
                  >
                    CLÍNICAS ESCOLA UNICHRISTUS
                  </h2>
                  </ScrollFromBottom>
              </div>
              <div>
              <ScrollFromBottom>
                  <h1 className="text-[#71CFD5] text-base font-sans font-semibold tracking-wider mb-8 md:text-[3vh] md:mb-[5vh]">
                    Onde o cuidado com sua saúde encontra excelência e
                    dedicação.
                  </h1>
                  </ScrollFromBottom>
              </div>
              <div>
              <ScrollFromBottom>
                  <h1 className="text-white md:text-[2vh] mb-8 md:mb-[5vh]  text-sm leading-relaxed md:w-full">
                    As Clínicas Unichristus representam a excelência em
                    atendimento médico em Fortaleza, oferecendo uma ampla gama
                    de serviços de saúde de alta qualidade. Nossa rede de
                    clínicas é um centro de referência que combina atendimento
                    humanizado, tecnologia de ponta e expertise profissional.
                  </h1>
                  </ScrollFromBottom>
              </div>
            </div>

            <ScrollFromLeft>
              
              <div className="mb-10 md:mb-[5vh]">
                <Link
                  href="/clinics" 
                  className="group relative inline-flex items-center gap-3 rounded-2xl bg-blue-950 md:px-8 px-4 py-[1.5vh] md:text-[2vh] text-sm font-bold 
                            ring-2 ring-cyan-500 transition-all duration-300
                            hover:shadow-[0_0_10px_rgba(34,211,238,0.2),inset_0_0_8px_rgba(34,211,238,0.2)]
                          hover:bg-cyan-500/5"
                >
                  <span className="relative text-cyan-500 transition-all duration-300 group-hover:text-white">
                    Conheça todas as clínicas
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
              <img
                src={about1.src}
                alt="Imagem Sobre Nós"
                className="md:w-[40vh] h-auto relative z-10 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out "
              />
              <img
                src={about2.src}
                alt="Imagem Sobre Nós"
                className="absolute top-10 md:-left-[16vh] -left-28 md:w-[37vh] h-auto z-0 rounded-xl shadow-md opacity-75 hover:opacity-90 hover:scale-105 transform transition-all duration-300 ease-in-out"
              />

              <img
                src={about3.src}
                alt="Imagem Sobre Nós"
                className="absolute top-10 md:-right-[16vh] -right-24 md:w-[37vh] h-auto z-0 rounded-xl shadow-md opacity-75 hover:opacity-90 hover:scale-105 transform transition-all duration-300 ease-in-out"
              />
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
