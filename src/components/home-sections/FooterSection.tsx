import footerBackground from "@/assets/footer-background.jpg";
import logoUnichristus from "@/assets/logo-unichristus.png";
import { useTranslations } from "next-intl";
import Image from "next/image";


export default function FooterSection() {
  const t = useTranslations('Footer');
  return (
    <div
      className="relative py-24 bg-blue-100 border-t-2 border-sky-50"
      style={{
        backgroundImage: `url(${footerBackground.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-70"></div>

      <footer className="relative container mx-auto text-white p-12 h-auto rounded-lg z-10">
        <div className="flex justify-center items-center flex-col mb-8 -mt-20">
          <Image
            src={logoUnichristus.src}
            alt="Logo Unichristus"
            className="w-72 mb-4 object-cover filter drop-shadow-neon transition-transform duration-500 ease-in-out transform hover:scale-110"
            width={1000}
            height={1000}
          />
           <p className="text-sm opacity-80 text-center">
              {t('description')}
            </p>
          
        </div>
        <div className="border-t border-gray-500 mt-12 pt-4 text-center">
          <p className="text-sm opacity-75">
            {t('about')}
          </p>
        </div>
      </footer>
    </div>
  );
}