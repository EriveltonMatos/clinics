"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";

const locales = ["pt", "en", "es"] as const;
type Locale = (typeof locales)[number];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale() as Locale;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLanguageChange = (newLocale: Locale) => {
    const segments = pathname.split("/");
    if (locales.includes(segments[1] as Locale)) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    const newPath = segments.join("/") || "/";
    router.push(newPath);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getCurrentFlag = () => {
    if (currentLocale === "pt") {
      return (
        <svg viewBox="0 0 640 480" className="w-6 h-4">
          <rect width="640" height="480" fill="#009639" />
          <path d="M81 240l240-160 240 160-240 160z" fill="#fedf00" />
          <circle cx="320" cy="240" r="80" fill="#002776" />
        </svg>
      );
    }
    if (currentLocale === "en") {
      return (
        <svg viewBox="0 0 640 480" className="w-6 h-4">
          <rect width="640" height="480" fill="#b22234" />
          <rect width="640" height="37" y="37" fill="#fff" />
          <rect width="640" height="37" y="111" fill="#fff" />
          <rect width="640" height="37" y="185" fill="#fff" />
          <rect width="640" height="37" y="259" fill="#fff" />
          <rect width="640" height="37" y="333" fill="#fff" />
          <rect width="640" height="37" y="407" fill="#fff" />
          <rect width="247" height="259" fill="#3c3b6e" />
          <g fill="#fff">
            {Array.from({ length: 50 }).map((_, i) => {
              const row = Math.floor(i / 10);
              const col = i % 10;
              const x = 25 + col * 22;
              const y = 25 + row * 24;
              return <circle key={i} cx={x} cy={y} r="2" />;
            })}
          </g>
        </svg>
      );
    }
    if (currentLocale === "es") {
      return (
        <svg viewBox="0 0 640 480" className="w-6 h-4">
          <rect width="640" height="480" fill="#c60b1e" />
          <rect width="640" height="160" y="160" fill="#ffc400" />
        </svg>
      );
    }
    return null;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-all duration-200"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="rounded overflow-hidden border border-gray-200">
          {getCurrentFlag()}
        </div>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        className={`absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 min-w-full overflow-hidden transition-all duration-200 ${
          isOpen
            ? "opacity-100 transform scale-100"
            : "opacity-0 transform scale-95 pointer-events-none"
        }`}
      >
        <button
          onClick={() => handleLanguageChange("pt")}
          className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors duration-150 ${
            currentLocale === "pt"
              ? "bg-blue-50 border-l-4 border-blue-500"
              : ""
          }`}
          disabled={currentLocale === "pt"}
        >
          <div className="rounded overflow-hidden border border-gray-200">
            <svg viewBox="0 0 640 480" className="w-6 h-4">
              <rect width="640" height="480" fill="#009639" />
              <path d="M81 240l240-160 240 160-240 160z" fill="#fedf00" />
              <circle cx="320" cy="240" r="80" fill="#002776" />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-700">Português</span>
          {currentLocale === "pt" && (
            <svg
              className="w-4 h-4 text-blue-500 ml-auto"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>

        {/* Opção English */}
        <button
          onClick={() => handleLanguageChange("en")}
          className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors duration-150 ${
            currentLocale === "en"
              ? "bg-blue-50 border-l-4 border-blue-500"
              : ""
          }`}
          disabled={currentLocale === "en"}
        >
          <div className="rounded overflow-hidden border border-gray-200">
            <svg viewBox="0 0 640 480" className="w-6 h-4">
              <rect width="640" height="480" fill="#b22234" />
              <rect width="640" height="37" y="37" fill="#fff" />
              <rect width="640" height="37" y="111" fill="#fff" />
              <rect width="640" height="37" y="185" fill="#fff" />
              <rect width="640" height="37" y="259" fill="#fff" />
              <rect width="640" height="37" y="333" fill="#fff" />
              <rect width="640" height="37" y="407" fill="#fff" />
              <rect width="247" height="259" fill="#3c3b6e" />
              <g fill="#fff">
                {Array.from({ length: 50 }).map((_, i) => {
                  const row = Math.floor(i / 10);
                  const col = i % 10;
                  const x = 25 + col * 22;
                  const y = 25 + row * 24;
                  return <circle key={i} cx={x} cy={y} r="2" />;
                })}
              </g>
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-700">English</span>
          {currentLocale === "en" && (
            <svg
              className="w-4 h-4 text-blue-500 ml-auto"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>

        <button
          onClick={() => handleLanguageChange("es")}
          className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors duration-150 ${
            currentLocale === "es"
              ? "bg-blue-50 border-l-4 border-blue-500"
              : ""
          }`}
          disabled={currentLocale === "es"}
        >
          <div className="rounded overflow-hidden border border-gray-200">
            <svg viewBox="0 0 640 480" className="w-6 h-4">
              <rect width="640" height="480" fill="#c60b1e" />
              <rect width="640" height="160" y="160" fill="#ffc400" />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-700">Español</span>
          {currentLocale === "es" && (
            <svg
              className="w-4 h-4 text-blue-500 ml-auto"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
