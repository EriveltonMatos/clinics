import IconPhone from "@/components/IconPhone";
import unichristusNavbar from "../assets/u-unichristus.png";
import MobileNav from "@/components/MobileNav";
import NavBar from "@/components/Navbar";
import SecondNavbar from "@/components/SecondNavbar";
import { FaHome, FaInfoCircle, FaCalendarCheck, FaVial, FaMapMarkerAlt, FaHospital } from "react-icons/fa";
import LandingPage from "@/components/home-sections/LandingPage";
import AboutSection from "@/components/home-sections/AboutSection";
import ScheduleSection from "@/components/home-sections/ScheduleSection";
import ExamSection from "@/components/home-sections/ExamSection";
import ServicesSection from "@/components/home-sections/ServicesSection";
import UnitsSection from "@/components/home-sections/UnitsSection";
import FooterSection from "@/components/home-sections/FooterSection";
import ButtonContact from "@/components/ButtonContact";

export default function Home() {
  
  const links = [
    { href: "#", label: "Home" },
    { href: "#about", label: "Sobre Nós" },
    { href: "#schedule", label: "Marcar Consulta" },
    { href: "#exam", label: "Consultar Exame" },
    { href: "#services", label: "Nossos Serviços" },
    { href: "#units", label: "Unidades" },
  ];

  const mobLinks = [
    { href: "#", label: "Home", icon: <FaHome /> },
    { href: "#about", label: "Sobre Nós", icon: <FaInfoCircle /> },
    { href: "#schedule", label: "Marcar Consulta", icon: <FaCalendarCheck /> },
    { href: "#exam", label: "Consultar Exame", icon: <FaVial /> },
    { href: "#services", label: "Nossos Serviços", icon: <FaHospital /> },
    { href: "#units", label: "Unidades", icon: <FaMapMarkerAlt /> },
  ];

  return (
      <>
        <NavBar />
        <SecondNavbar links={links} logoSrc={unichristusNavbar.src} />
        <MobileNav links={mobLinks} />
        <ButtonContact />
        <LandingPage />
        <AboutSection />
        <ScheduleSection />
        <ExamSection />
        <ServicesSection />
        <UnitsSection />
        <FooterSection />
      </>
  );
}
