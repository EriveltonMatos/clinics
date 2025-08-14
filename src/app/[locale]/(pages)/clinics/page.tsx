import clinicaOdonto from "@/assets/unidades/clinica-odonto.jpg";
import clinicaSaude from "@/assets/unidades/clinica-saude.jpg";
import clinicaPsicologia from "@/assets/unidades/clinica-psicologia.jpg";
import clinicaFisioterapia from "@/assets/unidades/clinica-fisio.jpeg";
import clinicaCesiu from "@/assets/unidades/cesiu.jpeg";
import clinicaLeac from "@/assets/unidades/leac.jpg";
import MobileNav from "@/components/navbar-components/MobileNav";
import unichristusAldeota from "@/assets/unichristus.jpg";
import NavbarReturn from "@/components/navbar-components/NavbarReturn";
import { FaArrowLeft } from "react-icons/fa";
import { ScrollFromBottom } from "@/components/ScrollComponent";
import NavBar from "@/components/navbar-components/Navbar";
import ClinicComponent from "@/components/ClinicComponent";
import FooterSection from "@/components/home-sections/FooterSection";
import Image from "next/image";
import { useTranslations } from 'next-intl';

export default function Clinics() {
  const t = useTranslations('Clinics');

  return (
    <>
      <div>
        <NavBar />
        <NavbarReturn />
        <MobileNav
          links={[
            { href: "/", label: "Voltar ao site", icon: <FaArrowLeft /> },
          ]}
        />
      </div>

      <div className="relative w-full mt-16 md:mt-0 animate-fade">
        <Image
          src={unichristusAldeota.src}
          alt="Unichristus Aldeota"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="z-0"
        />
        <div className="absolute inset-0 bg-black bg-opacity-65"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-blue-900/70"></div>

        <div className="relative z-10 flex md:py-40 py-12 md:text-start md:ml-10 text-white px-4 text-center">
          <div>
            <div className="inline-block mb-3 px-4 py-1 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-400/30">
              <span className="text-blue-300 font-medium text-sm md:text-base tracking-wider">
                {t('badgeText')}
              </span>
            </div>
            <h1 className="text-4xl md:text-[13vh] font-extrabold mb-6 text-white leading-tight">
              {t('title')}{" "}
              <span className="text-[#159EEC] inline-block">{t('titleHighlight')}</span>,{" "}
              <br className="hidden md:block" /> {t('subtitle')}{" "}
              <span className="text-[#159EEC] inline-block relative">
                {t('subtitleHighlight')}
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
            <p className="md:text-3xl ml-4 md:ml-2 text-lg mt-4 ">
              {t('description')}
            </p>
          </div>
        </div>
      </div>
      <section className="py-12 bg-gradient-to-br from-blue-100 to-indigo-200">
        <h2 className="text-[#1F2B6C] text-4xl md:text-6xl font-bold md:mb-8 md:mt-10 mt-5 text-center">
          {t('units.title')} <span className="text-[#159EEC]">{t('units.titleHighlight')}</span>
          <div className="flex justify-center mt-4 space-x-4">
            <div className="w-3 h-3 bg-[#3575FE] rounded-full hover:scale-150 transition-all"></div>
            <div className="w-3 h-3 bg-[#3575FE] rounded-full hover:scale-150 transition-all"></div>
            <div className="w-3 h-3 bg-[#3575FE] rounded-full hover:scale-150 transition-all"></div>
          </div>
        </h2>
        <ScrollFromBottom>
          <ClinicComponent
            imageBackground={clinicaOdonto.src}
            imageSrc={clinicaOdonto.src}
            title={t('dentistry.title')}
            description={t.raw('dentistry.description')}
            address={t.raw('dentistry.address')}
            services={t.raw('dentistry.services')}
            buttonLink={[
              "https://www.google.com/maps/dir/?api=1&destination=Rua+Vereador+Paulo+Mamede,+130+-+Cocó,+Fortaleza+-+CE,+60192-350",
            ]}
            buttonText={t.raw('dentistry.buttonText')}
            reverse={false}
          />
        </ScrollFromBottom>

        <ScrollFromBottom>
          <ClinicComponent
            imageBackground={clinicaSaude.src}
            imageSrc={clinicaSaude.src}
            title={t('health.title')}
            description={t.raw('health.description')}
            address={t.raw('health.address')}
            services={t.raw('health.services')}
            buttonLink={[
              "https://www.google.com/maps/dir/?api=1&destination=R.+Vicente+Linhares,+308+-+Aldeota,+Fortaleza+-+CE,+60135-270",
            ]}
            buttonText={t.raw('health.buttonText')}
            reverse={true}
          />
        </ScrollFromBottom>
        <ScrollFromBottom>
          <ClinicComponent
            imageBackground={clinicaFisioterapia.src}
            imageSrc={clinicaFisioterapia.src}
            title={t('physiotherapy.title')}
            description={t.raw('physiotherapy.description')}
            address={t.raw('physiotherapy.address')}
            services={t.raw('physiotherapy.services')}
            buttonLink={[
              "https://www.google.com/maps/dir/?api=1&destination=Rua+Vereador+Paulo+Mamede+-+Cocó,+Fortaleza+-+CE,+60192-350",
              "https://www.google.com/maps/dir/?api=1&destination=Rua+Uruguai,11+-+Bela+Vista,+Fortaleza+-+CE,+60442-590",
            ]}
            buttonText={t.raw('physiotherapy.buttonText')}
            reverse={false}
          />
        </ScrollFromBottom>

        <ScrollFromBottom>
          <ClinicComponent
            imageBackground={clinicaCesiu.src}
            imageSrc={clinicaCesiu.src}
            title={t('imaging.title')}
            description={t.raw('imaging.description')}
            address={t.raw('imaging.address')}
            services={t.raw('imaging.services')}
            buttonLink={[
              "https://www.google.com/maps/dir/?api=1&destination=R.+Vicente+Linhares,+308+-+Aldeota,+Fortaleza+-+CE,+60135-270",
            ]}
            buttonText={t.raw('imaging.buttonText')}
            reverse={true}
          />
        </ScrollFromBottom>

        <ScrollFromBottom>
          <ClinicComponent
            imageBackground={clinicaPsicologia.src}
            imageSrc={clinicaPsicologia.src}
            title={t('psychology.title')}
            description={t.raw('psychology.description')}
            address={t.raw('psychology.address')}
            services={t.raw('psychology.services')}
            buttonLink={[
              "https://www.google.com/maps/dir/?api=1&destination=Av.+Des.+Moreira,+2120+-+Aldeota,+Fortaleza+-+CE,+60170-002",
              "https://www.google.com/maps/dir/?api=1&destination=R.+Vicente+Linhares,+308+-+Aldeota,+Fortaleza+-+CE,+60135-270",
            ]}
            buttonText={t.raw('psychology.buttonText')}
            reverse={false}
          />
        </ScrollFromBottom>

        <ScrollFromBottom>
          <ClinicComponent
            imageBackground={clinicaLeac.src}
            imageSrc={clinicaLeac.src}
            title={t('laboratory.title')}
            description={t.raw('laboratory.description')}
            address={t.raw('laboratory.address')}
            services={t.raw('laboratory.services')}
            buttonLink={[
              "https://www.google.com/maps/dir/?api=1&destination=R.+Vicente+Linhares,+308+-+Aldeota,+Fortaleza+-+CE,+60135-270",
            ]}
            buttonText={t.raw('laboratory.buttonText')}
            reverse={true}
          />
        </ScrollFromBottom>
      </section>
      <div>
        <FooterSection />
      </div>
    </>
  );
}