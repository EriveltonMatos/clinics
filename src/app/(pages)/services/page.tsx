import servicesBackground from "@/assets/services-background.png";
import NavbarReturn from "@/components/NavbarReturn";
import MobileNav from "@/components/MobileNav";
import { FaArrowLeft } from "react-icons/fa";
import NavBar from "@/components/Navbar";
import FooterSection from "@/components/home-sections/FooterSection";
import ServicesTabs from "@/components/ServicesTabs";

export default function Services() {
  const mobLink = [{ href: "/", label: "Voltar ao Site", icon: <FaArrowLeft /> }];

  return (
    <>
      <section className="bg-[#F0F9FF] w-auto">
        <div>
          <NavBar />
          <NavbarReturn />
          <MobileNav links={mobLink} />
        </div>
        
        <div
          className="relative w-full bg-blue-100 border-t-2 border-sky-50 mt-16 md:mt-0  animate-fade"
          style={{
            backgroundImage: `url(${servicesBackground.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 "></div>
          <div className="relative z-10 flex md:py-40 py-12 md:text-start md:ml-10 text-white px-4 text-center">
            <div>
              <h1 className="md:text-8xl font-bold mb-4 text-4xl p-5">
                SAÚDE COMPLETA PARA <br />{" "}
                <span className="text-[#159EEC] ">VOCÊ</span> E{" "}
                <span className="text-[#159EEC] ">SUA FAMÍLIA</span>
              </h1>
              <p className="md:text-3xl md:ml-6 ml-4 text-lg mt-4 md:mt-0">
                Serviços especializados com atendimento personalizado, <br />
                cuidando da sua saúde de forma integral.
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
