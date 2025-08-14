
"use client"
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import carrossel1 from "@/assets/carrosel1.png";
import carrossel2 from "@/assets/carrosel2.png";
import Image from "next/image";
import { useLocale } from "next-intl";
//import { Link } from "react-router-dom";

// Função para obter as imagens baseadas no locale
const getLocalizedSlides = (locale: string) => {
  // Para inglês, usar carrossel1 (ou você pode adicionar carrossel2-en.jpg)
  // Para português e espanhol, usar carrossel2
  const carrossel2Image = locale === 'pt' ? carrossel1 : carrossel2;
  
  return [
    {
      id: 1,
      image: carrossel2Image,
      alt: locale === 'pt' ? "Clinic Logo" : "Logo da clínica",
      url: "/",
    },
  ];
};

export default function LandingPage() {
    const locale = useLocale();
    const slidesData = getLocalizedSlides(locale);

  return (
    // O swiper vai ficar aqui caso peçam carrosséis na página inicial.
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      loop={true}
      autoplay={{ delay: 2500, disableOnInteraction: true }}
      speed={2500}
      effect="fade"
      modules={[Autoplay]}
      className="w-full"
    >
      {slidesData.map((slide) => (
        <SwiperSlide key={slide.id}>
          {/*<Link // O Link não vai ser necessário no momento, mas pode ser útil futuramente caso precisem que o link redirecione para uma página de evento.
           to={slide.url}
            className="block h-auto md:h-screen md:w-screen relative"
            onClick={(e) => {
              e.stopPropagation(); // Impede que o Swiper capture o evento
            }}
         >*/}
          <div className="w-full md:h-screen md:w-screen flex justify-center items-center md:mt-16 mt-16 animate-fade">
            <Image
              src={slide.image.src}
              alt={slide.alt}
              className="w-full h-full object-center object-cover "
              height={5000}
              width={5000}
            />
          </div>
          <div className="absolute inset-0 flex flex-col items-start pl-4 sm:pl-8 md:pl-20 lg:pl-72 justify-center tracking-widest">
            <div className="flex justify-center items-center drop-shadow-md"></div>
          </div>
          {/*</Link>*/}
        </SwiperSlide>
      ))}

      {/*<SliderBtns
        containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] z-20 w-full justify-between xl:justify-none"
        btnStyles="bg-blue-300 hover:bg-blue-400 text-primary md:text-[44px] md:w-[66px] md:h-[66px] flex justify-center items-center transition-all"
        iconsStyles={""}
      />
      */}
    </Swiper>
  );
}
