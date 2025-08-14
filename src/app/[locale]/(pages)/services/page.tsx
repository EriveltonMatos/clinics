import servicesBackground from "@/assets/services-background.png";
import NavbarReturn from "@/components/navbar-components/NavbarReturn";
import MobileNav from "@/components/navbar-components/MobileNav";
import { FaArrowLeft } from "react-icons/fa";
import NavBar from "@/components/navbar-components/Navbar";
import FooterSection from "@/components/home-sections/FooterSection";
import ServicesTabs from "@/components/ServicesTabs";
import Image from "next/image";

export default function Services() {
  const mobLink = [
    { href: "/", label: "Voltar ao Site", icon: <FaArrowLeft /> },
  ];

  return (
    <>
      <section className="bg-[#F0F9FF] w-auto">
        <div>
          <NavBar />
          <NavbarReturn />
          <MobileNav links={mobLink} />
        </div>

        <div className="relative w-full mt-16 md:mt-0 animate-fade">
          <Image
            src={servicesBackground.src}
            alt="Background dos serviços"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="z-0"
          />
          <div className="absolute inset-0 bg-black bg-opacity-65"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-blue-900/40"></div>
          <div className="relative z-10 flex md:py-40 py-12 md:text-start md:ml-10 text-white px-4 text-center">
            <div>
              <div className="inline-block mb-3 px-4 py-1 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-400/30">
                <span className="text-blue-300 font-medium text-sm md:text-base tracking-wider">
                  CLÍNICAS ESCOLAS UNICHRISTUS
                </span>
              </div>
              <h1 className="text-4xl md:text-[13vh] font-extrabold mb-6 text-white leading-tight">
                SAÚDE COMPLETA PARA{" "}
                <span className="text-[#159EEC] inline-block">VOCÊ</span>, E{" "}
                <span className="text-[#159EEC] inline-block relative">
                  SUA FAMÍLIA
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-2 text-[#159EEC]/60"
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
                </span>
              </h1>
              <p className="md:text-[3.5vh] ml-4 md:ml-2 text-lg mt-14 ">
                Serviços especializados com atendimento personalizado, cuidando
                da sua saúde de forma integral.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto p-8 rounded-lg -mt-24 md:mt-0">
          <h1 className=" text-[#1F2B6C] items-center w-full h-20 text-4xl md:mt-12 md:text-6xl font-bold mb-4 mt-32 text-center">
            Nossos <span className="text-[#159EEC]">serviços</span>
            <div className="flex justify-center mt-4 space-x-4">
              <div className="w-3 h-3 bg-[#2A5ECB] rounded-full hover:scale-150 transition-all"></div>
              <div className="w-3 h-3 bg-[#2A5ECB] rounded-full hover:scale-150 transition-all"></div>
              <div className="w-3 h-3 bg-[#2A5ECB] rounded-full hover:scale-150 transition-all"></div>
            </div>
          </h1>

          <p className="relative text-[#1F2B6C] items-center w-full md:mt-10 h-20 text-sm md:text-xl font-normal text-center">
            Expanda as seções abaixo e veja a lista <br /> completa de serviços
            que disponibilizamos.
          </p>
          <ServicesTabs />
        </div>
      </section>
      <FooterSection />
    </>
  );
}
