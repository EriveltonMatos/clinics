import unichristusNavbar from "@/assets/u-unichristus.png";
import MobileNav from "@/components/navbar-components/MobileNav";
import NavBar from "@/components/navbar-components/Navbar";
import SecondNavbar from "@/components/navbar-components/SecondNavbar";
import { FaHome, FaInfoCircle, FaVial, FaMapMarkerAlt } from "react-icons/fa";
import LandingPage from "@/components/home-sections/LandingPage"; // Desativado por enquanto
import AboutSection from "@/components/home-sections/AboutSection";
//import ScheduleSection from "@/components/home-sections/ScheduleSection"; // Vai ficar desativado por enquanto
import ExamSection from "@/components/home-sections/ExamSection";
import UnitsSection from "@/components/home-sections/UnitsSection";
import FooterSection from "@/components/home-sections/FooterSection";
import ButtonContact from "@/components/ButtonContact";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations('Navbar');
  const links = [
    { href: "#", label: "Home" },
    { href: "#about", label: t("about") },
    //{ href: "#schedule", label: "Marcar Consulta" }, Vai ficar desativado por enquanto
    { href: "#exam", label: t("exam") },
    { href: "#units", label: t("unit") },
  ];

  const mobLinks = [
    { href: "#", label: "Home", icon: <FaHome /> },
    { href: "#about", label: t("about"), icon: <FaInfoCircle /> },
    //{ href: "#schedule", label: "Marcar Consulta", icon: <FaCalendarCheck /> }, Vai ficar desativado por enquanto
    { href: "#exam", label: t("exam"), icon: <FaVial /> },
    { href: "#units", label: t("unit"), icon: <FaMapMarkerAlt /> },
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
        <UnitsSection />
        <FooterSection />
      </>
  );
}
