import footerBackground from "@/assets/footer-background.jpg";
import logoUnichristus from "@/assets/logo-unichristus.png";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

export default function FooterSection() {
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
        {/* Centralizar logo */}
        <div className="flex justify-center items-center flex-col mb-8 -mt-20">
          <img
            src={logoUnichristus.src}
            alt="Logo Unichristus"
            className="w-72 mb-4 object-cover filter drop-shadow-neon transition-transform duration-500 ease-in-out transform hover:scale-110"
          />
           <p className="text-sm opacity-80 text-center">
              Unichristus © 2024. Todos os direitos reservados. 
            </p>
            <div className="flex justify-center mt-8 space-x-6">
          <a href="#" className="hover:text-cyan-300 transition transform hover:scale-125">
            <FaFacebookF />
          </a>
          <a href="#" className="hover:text-cyan-300 transition transform hover:scale-125">
            <FaTwitter />
          </a>
          <a href="#" className="hover:text-cyan-300 transition transform hover:scale-125">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-cyan-300 transition transform hover:scale-125">
            <FaLinkedin />
          </a>
        </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 place-items-center text-center md:text-left">
          <div className="flex flex-col md:mt-0">
            <h3 className="md:text-2xl text-xl font-bold mb-4 text-gradient">Cursos</h3>
            <ul className="space-y-2 md:text-lg text-sm">
              <li className="hover:text-cyan-300 transition cursor-pointer hover:shadow-neon">
                Graduação
              </li>
              <li className="hover:text-cyan-300 transition cursor-pointer hover:shadow-neon">
                Pós-graduação
              </li>
              <li className="hover:text-cyan-300 transition cursor-pointer hover:shadow-neon">
                Mestrado
              </li>
              
            </ul>
          </div>

          <div className="flex flex-col">
            <h3 className="md:text-2xl text-xl font-bold mb-4 text-gradient">Contato</h3>
            <ul className="space-y-2 md:text-lg text-sm">
              <li className="hover:text-cyan-300 transition cursor-pointer hover:shadow-neon">
                Fale conosco
              </li>
              <li className="hover:text-cyan-300 transition cursor-pointer hover:shadow-neon">
                Trabalhe conosco
              </li>
              <li className="hover:text-cyan-300 transition cursor-pointer hover:shadow-neon">
                Ouvidoria
              </li>
            </ul>
          </div>

          {/* Serviços */}
          <div className="flex flex-col">
            <h3 className="md:text-2xl text-xl font-bold mb-4 text-gradient">Serviços</h3>
            <ul className="space-y-2 md:text-lg text-sm">
              <li className="hover:text-cyan-300 transition cursor-pointer hover:shadow-neon">
                Aluno Online
              </li>
              <li className="hover:text-cyan-300 transition cursor-pointer hover:shadow-neon">
                Docente Online
              </li>
              <li className="hover:text-cyan-300 transition cursor-pointer hover:shadow-neon">
                Validação de Diploma
              </li>
              <li className="hover:text-cyan-300 transition cursor-pointer hover:shadow-neon">
                Autenticação
              </li>
            </ul>
          </div>

          {/* Contato */}
        </div>
       

        <div className="border-t border-gray-500 mt-12 pt-4 text-center">
          <p className="text-sm opacity-75">
            Desenvolvido por LIT - Laboratório de Inovações Tecnológicas
          </p>
        </div>
      </footer>
    </div>
  );
}