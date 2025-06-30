import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";

interface ClinicComponentProps {
  imageSrc: string;
  title: string;
  description: string[];
  address: string[];
  services: string[];
  buttonText?: string[];
  buttonLink?: string[];
  reverse?: boolean;
  imageBackground: string;
}

export default function ClinicComponent({
  imageSrc,
  title,
  description,
  address,
  services,
  buttonText = [],
  buttonLink = [],
  reverse = false,
  imageBackground,
}: ClinicComponentProps) {
  return (
    <div className="container mx-auto mt-16 relative bg-gradient-to-r from-blue-800 to-sky-400 border border-blue-500 rounded-xl shadow-xl overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-50 rounded-xl"></div>
      <div
        className="absolute inset-0 bg-cover bg-center rounded-lg"
        style={{ backgroundImage: `url(${imageBackground})`, opacity: 0.15 }}
      />

      <div
        className={`flex flex-col lg:flex-row items-center relative ${
          reverse ? "lg:flex-row-reverse" : ""
        }`}
      >
        <div className="lg:w-1/2 p-4">
          <Image
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover rounded-xl transition-transform transform hover:scale-105"
            height={1000}
            width={1000}
          />
        </div>

        <div className="lg:w-1/2 p-6 lg:p-10 space-y-6">
          <div className="relative">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center lg:text-left mb-2">
              {title}
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-sky-400 to-blue-500 rounded mx-auto lg:mx-0 mt-2"></div>
          </div>

          <div className="bg-blue-900/30 p-4 rounded-lg backdrop-blur-sm border border-blue-700/20">
            {description.map((text, index) => (
              <p
                key={index}
                className="mb-4 text-base md:text-lg text-gray-100 leading-relaxed last:mb-0"
              >
                {text}
              </p>
            ))}

            <div>
              {address.map((text, index) => (
                <p key={index} className="md:text-lg text-gray-300">
                  {text}
                </p>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-800/70 to-indigo-800/70 rounded-lg p-4 backdrop-blur-sm border border-blue-700/20">
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-sky-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                ></path>
              </svg>
              Serviços
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 bg-blue-700/30 p-2 rounded-lg transition-all hover:bg-blue-600/40 hover:translate-x-1"
                >
                  <svg
                    className="w-4 h-4 text-sky-300 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="text-gray-100 font-medium">{service}</span>
                </div>
              ))}
            </div>
          </div>

          {buttonLink.length > 0 && (
            <div className="flex flex-wrap gap-4 mt-6">
              {buttonLink.map((link, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <button className="rgb-button text-white font-bold py-4 px-8 rounded-3xl shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300/50">
                    <span className="flex items-center gap-2">
                      {buttonText[index]}
                      <FaLocationDot className="w-6 h-6 rounded-full border-black bg-sky-500 p-1" />
                    </span>
                  </button>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
