import { FaWhatsapp } from 'react-icons/fa';

export default function IconPhone() {
  return (
    <div>
      <a 
        href="tel:+5511999999999" 
        className="fixed bottom-6 right-6 bg-[#00D757] text-white p-3 rounded-full shadow-lg hover:bg-emerald-700 transition flex items-center justify-center md:animate-pulse z-40"
      >
        <FaWhatsapp className="md:text-3xl text-xl" />
      </a>
    </div>
  );
}

