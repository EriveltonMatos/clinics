"use client"
import bannerPt from "@/assets/bannerPt.png";
import bannerEn from "@/assets/bannerEn.png";
import bannerEs from "@/assets/bannerEs.png";
import Image from "next/image";
import { useLocale } from "next-intl";

const getLocalizedBanner = (locale: string) => {
  switch (locale) {
    case 'pt':
      return {
        image: bannerPt,
        alt: "Logo do site em português"
      };
    case 'en': 
      return {
        image: bannerEn,
        alt: "Logo do site em Inglês"
      };
    case 'es':
      return {
        image: bannerEs,
        alt: "Logo do site em Espanhol"
      };
    default: 
      return {
        image: bannerPt,
        alt: "Logo do site em português"
      }
  }
}

export default function Banner() {
  const locale = useLocale();
  const banner = getLocalizedBanner(locale);

  return (
    <div>
      <Image
      src={banner.image.src}
      alt={banner.alt}
      className="w-full h-full object-center object-cover md:mt-0 mt-16 animate-fade"
      height={5000}
      width={5000}
      priority
    />
  </div>
  );
}