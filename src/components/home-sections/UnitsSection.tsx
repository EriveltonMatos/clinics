"use client"
import { Carousel, CarouselResponsiveOption } from "primereact/carousel";
import clinicaOdonto from "@/assets/unidades/clinica-odonto.jpg";
import clinicaSaude from "@/assets/unidades/ces.jpeg";
import clinicaPsicologia from "@/assets/unidades/clinica-psicologia.jpg";
import clinicaFisioterapia from "@/assets/unidades/clinica-fisio.jpeg";
import clinicaFisioteraria2 from "@/assets/unidades/clinica-fisio.png";
import unitsBackground from "@/assets/units-background.png";
import clinicaCesiu from "@/assets/unidades/cesiu.jpeg";
import clinicaLeac from "@/assets/unidades/leac.jpg";
import { FaMapMarkerAlt } from "react-icons/fa";
import { ScrollFromBottom } from "../ScrollComponent";
import { FaLocationDot } from "react-icons/fa6";
import Image from "next/image";

export default function UnitsSection() {
  const cards = [
    {
      src: clinicaOdonto.src,
      alt: "Clínica Escola de Odontologia",
      description:
        "Rua Vereador Paulo Mamede, 130 - Cocó, Fortaleza - CE, 60192-350",
      url: "https://www.google.com/maps/dir/?api=1&destination=Rua+Vereador+Paulo+Mamede,+130+-+Cocó,+Fortaleza+-+CE,+60192-350",
    },
    {
      src: clinicaSaude.src,
      alt: "Clínica Escola de Saúde",
      description:
        "R. Vicente Linhares, 308 - Aldeota, Fortaleza - CE, 60135-270",
      url: "https://www.google.com/maps/dir/?api=1&destination=Rua+Vicente+Linhares,+308+-+Aldeota,+Fortaleza+-+CE,+60125-058",
    },
    {
      src: clinicaPsicologia.src,
      alt: "Serviço Escola de Psicologia Aplicada (SEPA)",
      description:
        "Av. Des. Moreira, 2120 - Aldeota, Fortaleza - CE, 60170-002",
      url: "https://www.google.com/maps/dir/?api=1&destination=Av.+Des.+Moreira,+2120+-+Aldeota,+Fortaleza+-+CE,+60170-002",
    },
    {
      src: clinicaFisioterapia.src,
      alt: "Clínica Escola de Fisioterapia - Campus Parque Ecológico",
      description: "Rua Vereador Paulo Mamede, 130 - Cocó, Fortaleza - CE,60192-350",
      url: "https://www.google.com/maps/dir/?api=1&destination=Rua+Vereador+Paulo+Mamede,130+-+Cocó,+Fortaleza+-+CE,+60192-350",
    },
    {
      src: clinicaFisioteraria2.src,
      alt: "Clínica Escola de Fisioterapia - Campus Parquelândia",
      description: "Rua Uruguai, 11 - Bela vista - CEP: 60442-590",
      url: "https://www.google.com/maps/dir/?api=1&destination=Rua+Uruguai,11+-+Bela+Vista,+Fortaleza+-+CE,+60442-590",
    },
    {
      src: clinicaCesiu.src,
      alt: "Clínica Escola de Saúde e Imagem (CESIU)",
      description:
        "R. Vicente Linhares, 308 - Aldeota, Fortaleza - CE, 60135-270",
      url: "https://www.google.com/maps/dir/?api=1&destination=R.+Vicente+Linhares,+308+-+Aldeota,+Fortaleza+-+CE,+60135-270",
    },
    {
      src: clinicaLeac.src,
      alt: "Laboratório Escola de Análises Clínicas - LEAC",
      description:
        "R. Vicente Linhares, 308 - Aldeota, Fortaleza - CE, 60135-270",
      url: "https://www.google.com/maps/dir/?api=1&destination=R.+Vicente+Linhares,+308+-+Aldeota,+Fortaleza+-+CE,+60135-270",
    },
  ];
  
  const images = [...cards];


  const responsiveOptions: CarouselResponsiveOption[] = [
    {
      breakpoint: "1400px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "1200px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "1000px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const imageTemplate = (image: {
    src: string;
    alt: string;
    description: string;
    url: string;
    className?: string;
  }) => {
    return (
      <div className="rounded-xl m-7 text-center border-gray-300 shadow-xl hover:shadow-3xl transition-shadow duration-300 max-h-screen border-2 border-b-blue-900 md:h-[65vh] ">
        <div className="shadow-xl overflow-hidden w-full rounded-t-xl">
          <Image
            src={image.src}
            alt={image.alt}
            className="w-full h-64 md:h-[40vh] shadow-lg rounded-t-xl transition-transform brightness-105 hover:brightness-90 duration-300 transform hover:scale-110 object-cover"
            width={1000}
            height={1000}
          />
        </div>
        <div className="rounded-lg md:h-[5vh] mt-3 flex justify-center items-center">
          <a
            href={image.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto p-2 px-4 text-[2vh] flex justify-center items-center gap-2 rounded-lg bg-[#1F2B6C] hover:bg-blue-900 text-white transition-all duration-300 shadow-lg mt-2"
          >
            <FaMapMarkerAlt className="rounded-full bg-neutral-400 shadow-lg flex justify-center items-center p-2 text-[4vh]" />
            Como Chegar
          </a>
        </div>
        <h4 className="md:text-[2.2vh]  text-[1.8vh] font-bold mt-6 text-[#1F2B6C] p-0.5">{image.alt}</h4>
        <p className="md:text-[1.5vh] text-[1.5vh] p-5 whitespace-pre-line text-gray-700 flex justify-center gap-1">
        <FaLocationDot/>
          {image.description}
        </p>
      </div>
    );
  };

  return (
    <>
      <section id="units" className="md:h-[calc(100vh+5rem)]">
        <div
          className="py-24 bg-blue-100 border-t-2 border-sky-50 md:h-[calc(100vh+5rem)]"
          style={{
            backgroundImage: `url(${unitsBackground.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="relative container mx-auto">
            <div>
              <ScrollFromBottom>
                <h1 className="relative text-[#1F2B6C] w-full text-5xl md:text-[6vh] font-bold md:-mb-[5vh] -mt-5 md:mt-[1vh] mb-5 text-center">
                  Nossas <span className="text-[#159EEC]">Unidades</span>
                  <div className="flex justify-center mt-[2vh] space-x-4">
                    <div className="w-[1.5vh] h-[1.5vh] bg-[#2A5ECB] rounded-full hover:scale-150 transition-all"></div>
                    <div className="w-[1.5vh] h-[1.5vh] bg-[#2A5ECB] rounded-full hover:scale-150 transition-all"></div>
                    <div className="w-[1.5vh] h-[1.5vh] bg-[#2A5ECB] rounded-full hover:scale-150 transition-all"></div>
                  </div>
                </h1>
              </ScrollFromBottom>
            </div>
            <ScrollFromBottom>
              <div className="mx-auto md:mt-[6vh]">
                <Carousel
                  value={images}
                  numVisible={3}
                  numScroll={1}
                  responsiveOptions={responsiveOptions}
                  circular
                  autoplayInterval={5000}
                  itemTemplate={imageTemplate}
                  showIndicators={true}
                />
              </div>
            </ScrollFromBottom>
          </div>
        </div>
      </section>
    </>
  );
}
