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
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function ExamSection() {

  const t = useTranslations("ExamResults");
  
  const labExams = [t('imageExams.items.mri'), t('imageExams.items.ct'), t('imageExams.items.ultrasound'), t('imageExams.items.xray')];

  const imageExams = [t('labExams.items.clinicalAnalysis'), t('labExams.items.biopsies')];  
  
  return (
    <section id="exam" className=" md:h-screen">
     <div className="min-h-screen w-full bg-white relative text-gray-800">
  {/* Concentric Squares - Light Pattern */}
  <div
    className="absolute inset-0 z-0 pointer-events-none"
    style={{
      backgroundImage: `
        repeating-linear-gradient(0deg, transparent, transparent 5px, rgba(75, 85, 99, 0.06) 5px, rgba(75, 85, 99, 0.06) 6px, transparent 6px, transparent 15px),
        repeating-linear-gradient(90deg, transparent, transparent 5px, rgba(75, 85, 99, 0.06) 5px, rgba(75, 85, 99, 0.06) 6px, transparent 6px, transparent 15px),
        repeating-linear-gradient(0deg, transparent, transparent 10px, rgba(107, 114, 128, 0.04) 10px, rgba(107, 114, 128, 0.04) 11px, transparent 11px, transparent 30px),
        repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(107, 114, 128, 0.04) 10px, rgba(107, 114, 128, 0.04) 11px, transparent 11px, transparent 30px)
      `
    }}
  />
  {/* Your Content/Components */}

      <div className=" mx-auto max-lg:text-center md:h-screen -mt-2">
        <div className="flex justify-center items-center md:p-40 max-lg:flex-col p-0 md:h-screen">
          <div className="w-3/4 md:w-1/2 ml-20 max-lg:ml-0 mt-10 ">
            <ScrollFromRight>
              <div className="w-32 md:w-[20vh] h-2 bg-[#1F2B6C] mb-8 mx-auto md:mx-0"></div>
              <div>
                <h2 className="text-[#1F2B6C] tracking-wider md:leading-none md:text-[9vh]  font-bold mb-8 md:mb-[6vh] max-lg:text-center text-4xl">
                  {t("title")} <span className="text-[#159EEC]"> {t("subtitle")} </span>
                </h2>
              </div>
            </ScrollFromRight>
            <div className="md:mr-20">
              <ScrollFromBottom>
                <h1 className="text-[#212124] mb-12 md:mb-[7vh] text-sm md:text-left text-justify md:text-[2.5vh] leading-tight">
                  {t("description")}
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
                        <button className="rgb-button md:w-full w-64 text-white font-bold py-4 px-8 rounded-3xl shadow-lg border border-white transform transition-transform duration-300 hover:scale-110 flex items-center gap-2">
                          <FaXRay className="md:text-[4vh] text-lg" />
                          <span className="text- md:text-[2vh]">
                            {t("imageExams.title")}
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
                    <div className=" border border-[#FF0000] rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl rounded-br-3xl rgb-button2">
                      <Link href="/maintenance">
                        <button className=" rgb-button2 text-white font-bold py-4 px-8 rounded-3xl shadow-lg border border-white transform transition-transform duration-300 hover:scale-110 flex items-center gap-1">
                          <MdBloodtype className="text-lg md:text-[4vh]" />
                          <span className=" text-ls md:text-[2vh] text-base">
                            {t("labExams.title")}
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
          <div className="relative w-1/2 mb-28 md:mt-36 mt-8">
            <div className="absolute inset-0 flex justify-center items-center z-0 md:ml-[5vh]" >
              <Image
                src={backgroundExam.src}
                alt="Background Image"
                className="md:w-[70vh] md:h-auto mx-auto md:scale-100 scale-[20vh]"
                width={1000}
                height={1000}
              />
            </div>

            <div className="relative z-10 md:bottom-32 bottom-16 md:ml-[8vh]">
              <ScrollFadeIn>
                <Image
                  src={blood.src}
                  alt="Imagem na frente 1"
                  className="md:w-[35vh] w-32 h-auto md:-ml-1 -ml-7 mt-10 md:mt-0 animate-updown-slow"
                  width={1000}
                  height={1000}
                />
              </ScrollFadeIn>
            </div>

            <div className="absolute inset-0 z-10 md:ml-[14vh]">
              <ScrollFadeIn>
                <Image
                  src={xRay.src}
                  alt="Imagem na frente 2"
                  className="md:w-[60vh] w-48 h-auto md:scale-75 md:ml-36 ml-20 animate-downup-slow md:mt-14 mt-24"
                  width={1000}
                  height={1000}
                />
              </ScrollFadeIn>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
