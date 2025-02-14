"use client"
import { useEffect, useState } from "react";
import unichristusNavbar from "../assets/u-unichristus.png";
import Link from "next/link";

export default function SecondNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 95) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`${
        isScrolled ? "top-0 shadow-md" : "top-[4rem]"
      } bg-[#142960] w-full flex justify-end items-center h-16 fixed z-20 transition-all duration-300 ease-in-out bg-opacity-90 max-lg:hidden`}
    >
      <div className="mr-auto mx-72">
        <a
          href="https://www.unichristus.edu.br/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={unichristusNavbar.src}
            alt="U em cor branca"
            className="w-11 h-11 hover:animate-jump"
          />
        </a>
      </div>
      <div className="flex justify-center items-center space-x-20 text-lg max-xl:text-xs mr-20">
        <div className="flex gap-8">
          <Link
            href="/"
            className="relative px-6 py-2 font-bold text-white border border-white/30 group rounded-lg overflow-hidden hover:border-[#159EEC] transition-all duration-300 flex items-center gap-2"
          >
            <span className="transform group-hover:-translate-x-1 transition-transform duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="group-hover:stroke-[#159EEC] transition-colors duration-300"
              >
                <path
                  d="m15 18-6-6 6-6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="relative z-10 group-hover:text-[#159EEC] transition-colors duration-300">
              Voltar ao Site
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
