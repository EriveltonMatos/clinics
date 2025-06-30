import unichristusNavbar from "../assets/u-unichristus.png";
import MobileNav from "@/components/navbar-components/MobileNav";
import NavBar from "@/components/navbar-components/Navbar";
import SecondNavbar from "@/components/navbar-components/SecondNavbar";
import { FaHome, FaInfoCircle, FaCalendarCheck, FaVial, FaMapMarkerAlt, FaHospital } from "react-icons/fa";
import LandingPage from "@/components/home-sections/LandingPage"; // Desativado por enquanto
import AboutSection from "@/components/home-sections/AboutSection";
//import ScheduleSection from "@/components/home-sections/ScheduleSection"; // Vai ficar desativado por enquanto
import ExamSection from "@/components/home-sections/ExamSection";
//import ServicesSection from "@/components/home-sections/ServicesSection"; // Desativado por ordem do reitor
import UnitsSection from "@/components/home-sections/UnitsSection";
import FooterSection from "@/components/home-sections/FooterSection";
import ButtonContact from "@/components/ButtonContact";

export default function Home() {
  
  const links = [
    { href: "#", label: "Home" },
    { href: "#about", label: "Sobre Nós" },
    //{ href: "#schedule", label: "Marcar Consulta" }, Vai ficar desativado por enquanto
    { href: "#exam", label: "Resultado de Exame" },
    //{ href: "#services", label: "Nossos Serviços" }, Vai ficar desativado por enquanto
    { href: "#units", label: "Unidades" },
  ];

  const mobLinks = [
    { href: "#", label: "Home", icon: <FaHome /> },
    { href: "#about", label: "Sobre Nós", icon: <FaInfoCircle /> },
    //{ href: "#schedule", label: "Marcar Consulta", icon: <FaCalendarCheck /> }, Vai ficar desativado por enquanto
    { href: "#exam", label: "Resultado de Exame", icon: <FaVial /> },
    //{ href: "#services", label: "Nossos Serviços", icon: <FaHospital /> },
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
        {/*<ScheduleSection /> Vai ficar desativado por enquanto */}
        <ExamSection />
        {/*<ServicesSection /> Desativado por ordem do reitor */}
        <UnitsSection />
        <FooterSection />
      </>
  );
}
