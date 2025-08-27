import xRay from "@/assets/x-ray.png";
import blood from "@/assets/blood.png";
import { MdBloodtype } from "react-icons/md";
import { FaMicroscope, FaStethoscope, FaXRay } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { BiTestTube } from "react-icons/bi";

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

  const imageExams = [
    { name: t("imageExams.items.mri"), icon: <FaStethoscope /> },
    { name: t("imageExams.items.ct"), icon: <FaMicroscope /> },
    { name: t("imageExams.items.ultrasound"), icon: <BiTestTube /> },
    { name: t("imageExams.items.xray"), icon: <FaXRay /> },
  ];

  const labExams = [
    { name: t("labExams.items.clinicalAnalysis"), icon: <BiTestTube /> },
    { name: t("labExams.items.biopsies"), icon: <FaMicroscope /> },
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
                    <span className="relative">{t("title")}</span>
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
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="group relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-300"></div>
                    <div className="relative bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:-rotate-1">
                      <Link
                        href="https://unichristus.naja.app/portal/login"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <div className="p-6 pb-4 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                          <div className="flex items-center space-x-3 relative z-10">
                            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                              <FaXRay className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-white font-bold text-lg lg:text-xl">
                              {t("imageExams.title")}
                            </h3>
                          </div>
                        </div>

                        <div className="px-6 pb-6">
                          <div className="grid grid-cols-2 gap-3">
                            {imageExams.map((exam, index) => (
                              <div
                                key={index}
                                className="flex items-center space-x-2 p-3 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-200 text-sm text-white font-medium"
                              >
                                <span className="flex-shrink-0">
                                  {exam.icon}
                                </span>
                                <span className="truncate">{exam.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>

                  <div className="group relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-300"></div>
                    <div className="relative bg-gradient-to-br from-red-500 to-red-700 rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:rotate-1">
                      <a href="/maintenance" className="block">
                        <div className="p-6 pb-4 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                          <div className="flex items-center space-x-3 relative z-10">
                            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                              <MdBloodtype className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-white font-bold text-lg lg:text-xl">
                              {t("labExams.title")}
                            </h3>
                          </div>
                        </div>

                        <div className="px-6 pb-6">
                          <div className="space-y-3">
                            {labExams.map((exam, index) => (
                              <div
                                key={index}
                                className="flex items-center space-x-2 p-3 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-200 text-sm text-white font-medium"
                              >
                                <span className="flex-shrink-0">
                                  {exam.icon}
                                </span>
                                <span>{exam.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollFromLeft>
            </div>

            <div className="relative w-1/2 mb-28 md:mt-36 mt-8">
              <div className="absolute inset-0 flex justify-center items-center z-0 md:ml-[5vh] overflow-hidden">
                <div className="absolute md:w-80 md:h-80 w-32 h-32 bg-gradient-to-r from-blue-500/70 via-cyan-400/80 to-blue-600/70 rounded-full md:blur-2xl blur-xl animate-pulse-smooth"></div>

                <div className="absolute md:w-96 md:h-96 w-32 h-32 border-4 border-cyan-400/60 rounded-full animate-expand-ring-1"></div>
                <div className="absolute md:w-96 md:h-96 w-32 h-32 border-4 border-cyan-400/60 rounded-full animate-expand-ring-2"></div>
                <div className="absolute md:w-96 md:h-96 w-32 h-32 border-4 border-cyan-400/60 rounded-full animate-expand-ring-3"></div>

                <div className="absolute md:w-4 md:h-4 w-2 h-2 bg-cyan-400 rounded-full animate-particle-border-1 shadow-lg shadow-cyan-400/60 top-10 right-20"></div>
                <div className="absolute md:w-3 md:h-3 w-2 h-2 bg-blue-500 rounded-full animate-particle-border-2 shadow-lg shadow-blue-500/60 bottom-16 left-24"></div>
                <div className="absolute md:w-5 md:h-5 w-2 h-2 bg-purple-400 rounded-full animate-particle-border-3 shadow-lg shadow-purple-400/60 top-24 left-16"></div>
                <div className="absolute md:w-3 md:h-3 w-2 h-2 bg-cyan-300 rounded-full animate-particle-border-4 shadow-lg shadow-cyan-300/60 bottom-20 right-16"></div>
                <div className="absolute md:w-4 md:h-4 w-2 h-2 bg-blue-400 rounded-full animate-particle-border-5 shadow-lg shadow-blue-400/60 top-32 right-32"></div>
                <div className="absolute md:w-2 md:h-2 w-2 h-2 bg-white rounded-full animate-particle-border-6 shadow-lg shadow-white/80 bottom-32 left-32"></div>

                <div className="absolute md:w-3 md:h-3 w-2 h-2 bg-cyan-500 rounded-full animate-particle-far-1 shadow-lg shadow-cyan-500/60 top-8 left-40"></div>
                <div className="absolute md:w-2 md:h-2 w-2 h-2 bg-blue-300 rounded-full animate-particle-far-2 shadow-lg shadow-blue-300/60 bottom-12 right-40"></div>
                <div className="absolute md:w-4 md:h-4 w-2 h-2 bg-purple-300 rounded-full animate-particle-far-3 shadow-lg shadow-purple-300/60 top-40 right-8"></div>
                <div className="absolute md:w-3 md:h-3 w-2 h-2 bg-cyan-200 rounded-full animate-particle-far-4 shadow-lg shadow-cyan-200/60 bottom-40 left-8"></div>

                <div className="absolute w-full h-full bg-gradient-radial from-blue-300/20 via-transparent to-transparent animate-glow-subtle"></div>
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
