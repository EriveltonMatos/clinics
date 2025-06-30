{/*"use client"
import ressonancia from "@/assets/exams/resonance/ressonancia.jpeg";
import hemograma from "@/assets/exams/blood/hemograma.jpg";
import colesterol from "@/assets/exams/blood/colesterol.jpg";
import fezes from "@/assets/exams/blood/fezes.jpg";
import glicemia from "@/assets/exams/blood/glicemia.jpg";
import citologia from "@/assets/exams/woman/citologia.jpg";
import backgroundService from "@/assets/background-service.png";
import {
  ScrollFadeIn,
  ScrollFromLeft,
  ScrollFromRight,
  ScrollFromTop,
} from "../ScrollComponent";
import { useEffect, useState } from "react";
import InfoCardWithButton from "../InfoCardWithButton";
import ImagingClinicCard from "../service-cards/ImagingClinicCard";
import HealthClinicCard from "../service-cards/HealthClinicCard";
import Link from "next/link";

export default function ServicesSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Define o breakpoint para mobile (768px)
    };

    // Verifica o tamanho da tela na primeira renderização
    handleResize();
    // Adiciona o event listener para atualizar no redimensionamento
    window.addEventListener("resize", handleResize);

    // Remove o event listener na desmontagem do componente
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const ScrollComponentMobile = isMobile ? ScrollFromLeft : ScrollFromRight;


  return (
    <section
      id="services"
      className="-mt-20 md:-mt-[0.2vh] md:h-[calc(100vh+5rem)]"
    >
      <div
          className="py-24 bg-blue-100 border-t-2 border-sky-50 md:h-[calc(100vh+5rem)]"
          style={{
          backgroundImage: `url(${backgroundService.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
          <div className="relative container mx-auto">
          <ScrollFadeIn>
            <h1 className="relative text-[#1F2B6C] w-full text-5xl md:text-[6vh] font-bold md:-mb-[5vh] -mt-5 md:mt-[0.1vh] mb-5 text-center">
              Nossos <span className="text-[#159EEC]">Serviços</span>
              <div className="flex justify-center mt-[2vh] space-x-4">
              <div className="w-[1.5vh] h-[1.5vh] bg-[#2A5ECB] rounded-full hover:scale-150 transition-all"></div>
                <div className="w-[1.5vh] h-[1.5vh] bg-[#2A5ECB] rounded-full hover:scale-150 transition-all"></div>
                <div className="w-[1.5vh] h-[1.5vh] bg-[#2A5ECB] rounded-full hover:scale-150 transition-all"></div>
              </div>
            </h1>
          </ScrollFadeIn>
          <ScrollFromTop>
            <p className="text-[#1F2B6C] items-center w-full md:mt-[7vh] h-[10vh] text-5xl md:text-[2.5vh] font-normal text-center max-lg:text-sm max-lg:mt-0">
              Uma equipe completa e multidisciplinar para cuidar da sua saúde.
            </p>
          </ScrollFromTop>

          <div className="container mx-auto md:flex md:justify-center md:-mt-[5vh]">
            <div className="grid grid-cols-1 text-center md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[16rem] max-lg:h-[50rem] md:min-h-[0rem] max-lg:w-auto md:w-[110vh] md:h-[30vh] md:text-[1.5vh] ">
              <ScrollFromLeft>
                <InfoCardWithButton
                  imageSrc={ressonancia.src}
                  title="Ressonância Magnética"
                  titleCard="Ressonância Magnética:"
                  description="A ressonância magnética (RM) é uma técnica de imagem médica que utiliza campos magnéticos e ondas de rádio para gerar imagens detalhadas dos órgãos e 
                  tecidos internos do corpo. Diferentemente de raios-X ou tomografias, a RM não usa radiação ionizante, o que a torna uma opção mais segura para muitos pacientes."
                  imageCard={ressonancia.src}
                  additionalContent={<ImagingClinicCard />}
                />
              </ScrollFromLeft>
              <ScrollFromLeft>
                <InfoCardWithButton
                  imageSrc={hemograma.src}
                  title="Hemograma Completo"
                  titleCard="Hemograma Completo"
                  description="O hemograma é um exame de sangue que fornece informações sobre os principais componentes do sangue, como glóbulos vermelhos, glóbulos brancos e plaquetas. 
                  Ele é útil para diagnosticar e monitorar diversas condições médicas."
                  imageCard={hemograma.src}
                  additionalContent={<HealthClinicCard />}
                />
              </ScrollFromLeft>

              <ScrollFromLeft>
                <InfoCardWithButton
                  imageSrc={fezes.src}
                  title="Parasitológico de fezes"
                  titleCard="Parasitológico de fezes"
                  description="O exame parasitológico de fezes é um procedimento que identifica a presença de parasitas nas fezes, por meio de diversos métodos de análise. 
                  O exame é indicado para diagnosticar alterações gastrointestinais, causadas por protozoários e helmintos. "
                  imageCard={fezes.src}
                  additionalContent={<HealthClinicCard />}
                />
              </ScrollFromLeft>
            </div>
          </div>

          <div className="container mx-auto md:flex md:justify-center md:mt-[2vh]">
            <h1 className="text-[#1F2B6C] text-5xl md:text-5xl font-bold mb-8 font-yeseva tracking-wider text-center"></h1>
            <div className="grid grid-cols-1 text-center md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[16rem] max-lg:h-[50rem] md:min-h-[0rem] max-lg:w-auto md:w-[110vh] md:h-[30vh] md:text-[1.5vh] ">
              <ScrollComponentMobile>
                <InfoCardWithButton
                  imageSrc={glicemia.src}
                  title="Glicemia"
                  titleCard="Glicemia"
                  description="O exame de glicemia, também conhecido como exame de glicose, é um teste laboratorial que mede o nível de glicose no sangue. 
                  É um exame importante para o diagnóstico e monitoramento de diversas condições de saúde, principalmente diabetes."
                  imageCard={glicemia.src}
                  additionalContent={<HealthClinicCard />}
                />
              </ScrollComponentMobile>

              <ScrollComponentMobile>
                <InfoCardWithButton
                  imageSrc={colesterol.src}
                  title="Colesterol Total"
                  titleCard="Colesterol Total"
                  description="No exame de colesterol total, uma amostra de sangue do paciente é retirada e posteriormente levada ao laboratório para que seja analisada. O técnico então 
                  irá avaliar a quantidade de colesterol LDL, HDL e VLDL que está presente na amostra de sangue e somar os valores, chegando ao valor do colesterol total."
                  imageCard={colesterol.src}
                  additionalContent={<HealthClinicCard />}
                />
              </ScrollComponentMobile>

              <ScrollComponentMobile>
                <InfoCardWithButton
                  imageSrc={citologia.src}
                  title="Citologia Convencional"
                  titleCard="Citologia convencional"
                  description="A citologia convencional, também conhecida como exame de Papanicolau, é um exame ginecológico preventivo que analisa células do colo do útero e da 
                  vagina para detectar alterações e lesões que possam indicar a presença de câncer"
                  imageCard={citologia.src}
                  additionalContent={<HealthClinicCard />}
                />
              </ScrollComponentMobile>
            </div>
          </div>

          <div className="flex justify-center mt-16 md:mt-[2vh]">
            <Link
              className="
        group
        p-5
        cursor-pointer 
        relative  
        text-[2vh]
        md:text-[2vh]
        font-normal 
        border-0 
        flex 
        items-center 
        justify-center
        bg-transparent
         text-white 
         h-[4vh]
         w-[16vh] 
         overflow-hidden   
         transition-all
         duration-100
         md:mt-[2vh]"
              href={"/services"}
            >
              <span
                className="
        group-hover:w-full
        absolute 
        left-0 
        h-full 
        w-5 
        border-y
        border-l
         border-white
           transition-all
         duration-500"
              ></span>

              <p
                className="group-hover:opacity-0 group-hover:translate-x-[-100%] absolute translate-x-0 transition-all
         duration-200"
              >
                Clique aqui!
              </p>

              <span className="group-hover:translate-x-0  group-hover:opacity-100 absolute  translate-x-full opacity-0  transition-all duration-200">
                E saiba mais!
              </span>

              <span className="group-hover:w-full absolute right-0 h-full w-5  border-y border-r  border-white transition-all duration-500"></span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
*/}
