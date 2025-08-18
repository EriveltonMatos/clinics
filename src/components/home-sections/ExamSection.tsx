import backgroundExam from "@/assets/background-exam.png";
import xRay from "@/assets/x-ray.png";
import blood from "@/assets/blood.png";
import { MdBloodtype } from "react-icons/md";
import { FaCircle, FaXRay } from "react-icons/fa";
import { HiSparkles, HiLightningBolt } from "react-icons/hi";

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

  const labExams = [
    t("imageExams.items.mri"),
    t("imageExams.items.ct"),
    t("imageExams.items.ultrasound"),
    t("imageExams.items.xray"),
  ];
  const imageExams = [
    t("labExams.items.clinicalAnalysis"),
    t("labExams.items.biopsies"),
  ];

  return (
    <section id="exam" className="md:h-screen relative overflow-hidden">
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-blue-50 relative">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(229,231,235,0.4) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(229,231,235,0.4) 1px, transparent 1px),
              radial-gradient(circle 800px at 20% 80%, rgba(59,130,246,0.15), transparent),
              radial-gradient(circle 600px at 80% 20%, rgba(139,92,246,0.12), transparent),
              radial-gradient(circle 400px at 60% 60%, rgba(16,185,129,0.08), transparent)
            `,
            backgroundSize:
              "60px 60px, 60px 60px, 100% 100%, 100% 100%, 100% 100%",
          }}
        />

        <div className="mx-auto max-lg:text-center md:h-screen relative z-10">
          <div className="flex justify-center items-center md:p-40 max-lg:flex-col p-0 md:h-screen">
            <div className="w-3/4 md:w-1/2 ml-20 max-lg:ml-0 mt-10 relative">
              <ScrollFromRight>
                {/* Modern Title Bar */}
                <div className="relative mb-8">
                  <div className="w-32 md:w-[20vh] h-1 bg-gradient-to-r from-[#1F2B6C] via-[#159EEC] to-purple-500 mb-8 mx-auto md:mx-0 rounded-full shadow-lg"></div>
                </div>

                {/* Enhanced Title */}
                <div className="relative">
                  <h2 className="text-[#1F2B6C] md:leading-none md:text-[9vh] font-black mb-10 md:mb-[6vh] max-lg:text-center text-4xl relative">
                    <span className="relative">
                      {t("title")}
                     
                    </span>
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-t from-[#159EEC] via-blue-500 to-purple-600 relative text-5xl md:text-[9vh]">
                      {t("subtitle")}
                       <div className="absolute -top-1 -right-4 md:-top-[-6] text-yellow-400">
                        <HiSparkles className="w-6 h-6 animate-spin-slow" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#159EEC] to-purple-600 opacity-10 blur-xl -z-10"></div>
                    </span>
                  </h2>
                </div>
              </ScrollFromRight>

              <div className="md:mr-20">
                <ScrollFromBottom>
                  <div className="relative mb-12 md:mb-[7vh]">
                    <p className="text-slate-700 text-sm md:text-left text-justify md:text-[2.2vh] leading-relaxed font-medium relative p-6 rounded-2xl bg-white/40 border border-white/20 shadow-2xl">
                      <span className="absolute top-2 left-2 w-3 h-3 bg-blue-400 rounded-full"></span>
                      <span className="absolute top-2 right-2 w-3 h-3 bg-red-600 rounded-full"></span>
                      {t("description")}
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-300/5 to-purple-300/5 rounded-2xl -z-10"></span>
                    </p>
                  </div>
                </ScrollFromBottom>
              </div>

              <ScrollFromLeft>
                <div className="w-full max-w-4xl mx-auto ">
                  <div className="flex space-y-5 md:space-y-0 md:space-x-5 flex-col md:flex-row justify-end items-center md:justify-normal">
                    {/* Enhanced X-Ray Button */}
                    <div className="group relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-3xl  blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                      <div className="relative bg-gradient-to-br from-blue-500 via-blue-600 to-purple-900 rounded-3xl  shadow-md transform transition-all duration-300 group-hover:scale-105 group-hover:rotate-1">
                        <a
                          href="https://unichristus.naja.app/portal/login"
                          target="_blank"
                        >
                          <button className="w-full md:w-full px-8 py-4 text-white font-bold rounded-3xl flex items-center gap-3 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                            <FaXRay className="md:text-[4vh] text-2xl relative z-10 animate-pulse" />
                            <span className="text-base md:text-[2vh] relative z-10 font-black tracking-wide">
                              {t("imageExams.title")}
                            </span>
                          </button>

                          <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-b-3xl shadow-inner">
                            <div className="grid grid-cols-2 gap-3">
                              {labExams.map((exam, index) => (
                                <div
                                  key={index}
                                  className="text-white md:text-[1.8vh] text-sm flex items-center p-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                                >
                                  <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mr-3 animate-pulse"></div>
                                  <span className="font-semibold">{exam}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>

                    <div className="group relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-pink-600 to-red-700 rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                      <div className="relative bg-gradient-to-br from-red-500 via-red-600 to-red-800 rounded-3xl shadow-md transform transition-all duration-300 group-hover:scale-105 group-hover:-rotate-1">
                        <Link href="/maintenance">
                          <button className="w-full md:w-auto px-8 py-4 text-white font-bold rounded-3xl flex items-center gap-3 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                            <MdBloodtype className="text-2xl md:text-[4vh] relative z-10 animate-pulse" />
                            <span className="text-base md:text-[2vh] relative z-10 font-black tracking-wide">
                              {t("labExams.title")}
                            </span>
                          </button>

                          {/* Enhanced Dropdown */}
                          <div className="bg-gradient-to-br from-red-600 to-red-700 p-6 rounded-b-3xl shadow-inner">
                            <div className="space-y-3">
                              {imageExams.map((exam, index) => (
                                <div
                                  key={index}
                                  className="text-white md:text-[1.8vh] text-sm flex items-center p-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                                >
                                  <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mr-3 animate-pulse"></div>
                                  <span className="font-semibold">{exam}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollFromLeft>
            </div>

            <div className="relative w-1/2 mb-28 md:mt-36 mt-8">
            
              <div className="absolute inset-0 flex justify-center items-center z-0 md:ml-[5vh]">
                
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
