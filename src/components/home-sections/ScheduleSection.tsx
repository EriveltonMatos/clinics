import scheduleImage from "@/assets/schedule-image.jpg";
import scheduleImage2 from "@/assets/schedule-image-2.jpg";
import scheduleImage3 from "@/assets/schedule-image-3.jpg";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { ScrollFromLeft } from "../ScrollComponent";
import Link from "next/link";
import Image from "next/image";

export default function ScheduleSection() {
  return (
    <section
      id="schedule"
      className="relative flex justify-center items-center bg-gradient-to-r bg-[#1A2A6C] text-white overflow-hidden md:p-10 p-5 h-[30rem] md:h-screen"
    >
      <div className="flex justify-end container md:mx-auto bg-slate-100 relative p-4 h-[24rem] md:h-[70vh] md:w-[80rem] border rounded-2xl shadow-2xl overflow-hidden transition-transform duration-700 ease-in-out">
        <div className="w-4/4 container relative z-20 bg-[#1A2A6C] p-8 md:p-10 rounded-lg md:w-full md:mr-10 my-auto md:h-auto h-[auto] shadow-neon-left max-w-lg max-lg:text-center transition-transform transform hover:scale-105 duration-500 ease-in-out border border-[#00FFFF]">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-4">
            <Sparkles className="w-4 h-4 text-white mr-2" />
            <span className="text-white md:text-sm text-xs font-medium">
              Agendamento Online
            </span>
          </div>
          <h2 className="flex justify-center items-center md:text-6xl text-3xl font-extrabold mb-4 bg-white bg-clip-text text-transparent animate-pulse">
            AGENDE SUA CONSULTA
          </h2>
          <p className="mb-6 md:text-lg text-gray-300 max-lg:text-sm">
            Acesse nossa página de agendamento e marque sua consulta de forma
            rápida e fácil.
          </p>

          <div className="flex justify-center md:justify-normal space-x-20 text-lg max-xl:text-xs ">
            <div className="flex gap-8">
              <Link
                href="/maintenance"
                className="relative px-6 py-2 font-bold bg-blue-800 text-white border border-white group rounded-2xl overflow-hidden hover:border-[#159EEC] transition-all duration-300 flex items-center gap-2"
              >
                <span className="relative z-10 group-hover:text-[#159EEC] transition-colors duration-300">
                  Marcar Consulta
                </span>
                <ArrowUpRight className="w-5 h-5 relative transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#159EEC]" />

                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute z-10 left-1 md:top-9 md:ml-6 top-1 shadow-xl transition-transform hover:rotate-3 hover:scale-110 duration-500 ease-in-out hidden md:block">
          <ScrollFromLeft>
            <Image
              src={scheduleImage.src}
              alt="Consulta"
              className="object-cover md:h-80 md:w-80 h-40 w-40 rounded-lg border border-[#00FFFF]"
              height={1000}
              width={1000}
            />
          </ScrollFromLeft>
        </div>

        <div className="absolute z-10 md:left-96 md:top-9 md:ml-6 top-1 shadow-xl transition-transform hover:rotate-3 hover:scale-110 duration-500 ease-in-out hidden md:block">
        <ScrollFromLeft>
        
            <Image
              src={scheduleImage2.src}
              alt="Consulta"
              className="object-cover md:h-80 md:w-80 h-40 w-40 rounded-lg border border-[#00FFFF]"
              height={1000}
              width={1000}
            />
          </ScrollFromLeft>
          </div>

        <div className="absolute z-10 md:left-44 left-28 md:bottom-9 bottom-1 md:mx-auto md:ml-6 shadow-xl transition-transform hover:rotate-3 hover:scale-110 duration-500 ease-in-out hidden md:block">
        <ScrollFromLeft>

            <Image
              src={scheduleImage3.src}
              alt="Consulta"
              className="object-cover md:h-80 md:w-80 h-40 w-40 rounded-lg border border-[#00FFFF]"
              height={1000}
              width={1000}
            />
          </ScrollFromLeft>
          </div>
      </div>
    </section>
  );
}
