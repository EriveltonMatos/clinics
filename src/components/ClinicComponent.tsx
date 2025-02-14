interface ClinicComponentProps {
    imageSrc: string;
    title: string;
    description: string[];
    address: string;
    services: string[];
    buttonLink: string;
    reverse?: boolean;
    imageBackground: string; // Propriedade para a imagem de fundo
  }
  
  export default function ClinicComponent({
    imageSrc,
    title,
    description,
    address,
    services,
    buttonLink,
    reverse = false,
    imageBackground,
  }: ClinicComponentProps) {
    
    return (
      <div className="container mx-auto mt-16 relative bg-gradient-to-r from-blue-800 to-sky-400 border border-blue-500 rounded-xl shadow-xl overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50 rounded-xl"></div>
        <div
          className="absolute inset-0 bg-cover bg-center rounded-lg"
          style={{ backgroundImage: `url(${imageBackground})`, opacity: 0.15 }} // Opacidade ajustável
        />
        <div
          className={`flex flex-col lg:flex-row items-center relative ${
            reverse ? "lg:flex-row-reverse" : ""
          }`}
        >
          <div className="lg:w-1/2 p-4">
            <img
              src={imageSrc}
              alt={title}
              className="w-full h-full object-cover rounded-xl transition-transform transform hover:scale-105"
            />
          </div>
  
          <div className="lg:w-1/2 p-8 space-y-4">
            <h2 className="md:text-4xl text-3xl text-center font-bold text-white drop-shadow-lg">
              {title}
            </h2>
            <div>
              {description.map((text, index) => (
                <p key={index} className="mb-4 text-lg text-gray-200">
                  {text}
                </p>
              ))}
            </div>
  
            <p className="md:text-lg text-gray-300">{address}</p>
  
            <h3 className="md:text-2xl font-semibold text-white">Serviços:</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-disc pl-6 mb-6 gap-x-3">
              {services.map((service, index) => (
                <li
                  key={index}
                  className="text-gray-200 mb-2 text-sm font-semibold"
                >
                  {service}
                </li>
              ))}
            </ul>
  
            <a href={buttonLink} target="_blank" rel="noopener noreferrer">
              <button className="rgb-button mt-6 text-white font-bold py-4 px-8 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-110">
                Como Chegar
              </button>
            </a>
          </div>
        </div>
      </div>
    );
  }
  