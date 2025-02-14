"use client"
import { useEffect, useState } from "react";

interface Link {
  href: string;
  label: string;
}

interface SecondNavbarProps {
  links: Link[];
  logoSrc: string;
}

export default function SecondNavbar({ links, logoSrc }: SecondNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 95);

      if (window.scrollY < 50) {
        setActiveSection("home");
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        let foundActive = false;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            foundActive = true;
          }
        });
        if (!foundActive && window.scrollY < 50) {
          setActiveSection("home");
        }
      },
      { threshold: 0.6 }
    );

    links.forEach((link) => {
      const section = document.getElementById(link.href.replace("#", ""));
      if (section) observer.observe(section);
    });

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [links]);

  return (
    <nav
      className={`${
        isScrolled ? "top-0 shadow-md" : "top-[4rem]"
      } bg-[#142960] w-full flex justify-end items-center h-16 fixed z-30 transition-all duration-300 ease-in-out bg-opacity-90 max-lg:hidden`}
    >
      <div className="mr-auto mx-72">
        <a
          href="https://www.unichristus.edu.br/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={logoSrc}
            alt="U em cor branca"
            className="w-[5vh] hover:animate-jump"
          />
        </a>
      </div>
      <div className="flex justify-center items-center space-x-20 text-lg mr-20">
        <div className="flex gap-8">
          {links.map((link, index) => {
            const sectionId = link.href.replace("#", "") || "home";
            const isActive = activeSection === sectionId;

            return (
              <a
                key={index}
                href={link.href}
                className={`relative font-semibold text-[2vh] cursor-pointer transition group ${
                  isActive ? "text-[#159EEC]" : "text-white hover:text-gray-300"
                }`}
              >
                <span
                  className={`relative z-10 ${
                    isActive
                      ? "text-[#159EEC]"
                      : "group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-[#159EEC]"
                  }`}
                >
                  {link.label}
                </span>
                <div
                  className={`absolute bottom-0 left-0 h-[2px] w-full bg-[#159EEC] transition-transform duration-300 ${
                    isActive
                      ? "scale-x-100"
                      : "transform scale-x-0 group-hover:scale-x-100"
                  }`}
                ></div>
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
