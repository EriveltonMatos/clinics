import backgroundExam from "@/assets/background-exam.png";
import xRay from "@/assets/x-ray.png";
import blood from "@/assets/blood.png";
import { MdBloodtype } from "react-icons/md";
import { FaCircle, FaXRay } from "react-icons/fa";

import {
  ScrollFadeIn,
  ScrollFromBottom,
  ScrollFromLeft,
  ScrollFromRight,
} from "../ScrollComponent";
import Link from "next/link";

export default function ExamSection() {
  const labExams = ["Ressonância", "Tomografia", "Ultrassom", "Raio-X"];

  const imageExams = ["Sanguíneos", "Biópsias"];

  return (
    <section id="exam" className="bg-sky-50 md:h-screen">
      <div className="container mx-auto max-lg:text-center md:h-screen">
        <div className="flex justify-center items-center md:p-20 max-lg:flex-col p-0 gap-20 md:h-screen">
          <div className="w-3/4 md:w-1/2 ml-20 max-lg:ml-0 mt-10 ">
            <ScrollFromRight>
              <div className="w-32 h-2 bg-[#1F2B6C] mb-8 mx-auto md:mx-0"></div>
              <div>
                <h2 className="text-[#1F2B6C] tracking-widest md:leading-none md:text-[10vh] font-bold mb-12 md:mb-[6vh] max-lg:text-center text-4xl">
                  CONSULTAR <span className="text-[#159EEC]">EXAMES</span>
                </h2>
              </div>
            </ScrollFromRight>
            <div>
              <ScrollFromBottom>
                <h1 className="text-[#212124] mb-8 md:mb-[6vh] text-sm md:text-left text-justify md:text-[2.5vh] leading-tight">
                  A Unichristus Clínicas oferece diversos exames laboratoriais e
                  de imagem para você e sua família. Contamos com uma equipe de
                  profissionais altamente qualificados e prontos para atender
                  você.
                </h1>
              </ScrollFromBottom>
            </div>
            <ScrollFromLeft>
              <div className="w-full max-w-4xl mx-auto">
                <div className="flex space-y-5 md:space-y-0 md:space-x-5 flex-col md:flex-row justify-end items-center md:justify-normal ">
                  <div className="relative rounded-tl-3xl rounded-tr-3xl ">
                    <div className="border border-blue-300 rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl rounded-br-3xl rgb-button">
                      <a
                        href="https://unichristus.naja.app/portal/login"
                        target="_blank"
                      >
                        <button className="rgb-button text-white font-bold py-4 px-8 rounded-3xl shadow-lg border border-white transform transition-transform duration-300 hover:scale-110 flex items-center gap-2">
                          <FaXRay className="md:text-[4vh] text-lg" />
                          <span className="text- md:text-[2vh]">
                            Exames de Imagem
                          </span>
                        </button>
                        <div className="rgb-button p-4 shadow-lg rounded-bl-3xl rounded-br-3xl">
                          <ul className="grid grid-cols-2">
                            {labExams.map((exam, index) => (
                              <li
                                key={index}
                                className="text-white md:text-[1.8vh] text-sm flex items-center"
                                >
                                <FaCircle
                                  className="text-white mr-2"
                                  size={7}
                                />{" "}
                                {exam}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </a>
                    </div>
                  </div>

                  <div className="relative  rounded-tl-3xl rounded-tr-3xl ">
                    <div className="border border-[#FF0000] rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl rounded-br-3xl rgb-button2">
                      <Link href="/login">
                        <button className="rgb-button2 text-white font-bold py-4 px-8 rounded-3xl shadow-lg border border-white transform transition-transform duration-300 hover:scale-110 flex items-center gap-1">
                          <MdBloodtype className="text-lg md:text-[4vh]" />
                          <span className="text-ls md:text-[2vh] text-base">
                            Exames Laboratóriais
                          </span>
                        </button>
                      </Link>
                      <div className="rgb-button2 p-4 shadow-lg rounded-bl-3xl rounded-br-3xl">
                        <ul>
                          {imageExams.map((exam, index) => (
                            <li
                              key={index}
                              className="text-white md:text-[1.8vh] text-sm flex items-center"
                            >
                              <FaCircle className="text-white mr-2" size={7} />{" "}
                              {/* Ícone de círculo vermelho */}
                              {exam}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollFromLeft>
          </div>
          <div className="relative w-1/2 mb-10 md:mt-36 mt-5">
            {/* Imagem de background */}
            <div className="absolute inset-0">
              <img
                src={backgroundExam.src}
                alt="Background Image"
                className="md:w-full md:h-auto scale-125 md:scale-110"
              />
            </div>

            {/* Imagem da frente 1 */}
            <div className="relative z-10 bottom-32">
              <ScrollFadeIn>
                <img
                  src={blood.src}
                  alt="Imagem na frente 1"
                  className="md:w-auto w-36 h-auto md:-ml-1 -ml-7 mt-10 md:mt-0 animate-updown-slow "
                />
              </ScrollFadeIn>
            </div>

            {/* Imagem da frente 2 */}
            <div className="absolute inset-0 z-10 ">
              <ScrollFadeIn>
                <img
                  src={xRay.src}
                  alt="Imagem na frente 2"
                  className="md:w-auto h-auto scale-75 md:ml-36 ml-20 animate-downup-slow"
                />
              </ScrollFadeIn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
