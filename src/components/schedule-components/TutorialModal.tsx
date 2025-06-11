import Image, { StaticImageData } from 'next/image';
import { IoIosCloseCircle } from 'react-icons/io';

interface TutorialModalProps {
  showTutorial: boolean;
  onClose: () => void;
  logoUnichristus: StaticImageData;
}

export default function TutorialModal({ 
  showTutorial, 
  onClose, 
  logoUnichristus 
}: TutorialModalProps) {
  if (!showTutorial) return null;

  return (
    <>
      {/* Modal Tutorial Mobile */}
      <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-3">
        <div className="bg-white rounded-lg shadow-2xl max-w-sm w-full max-h-[85vh] overflow-hidden animate-fade">
          <div className="bg-gradient-to-r from-[#075E54] to-[#128C7E] text-white p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center">
                  <Image 
                    src={logoUnichristus}
                    alt="Logo Unichristus"
                    className="w-4 h-5"
                    width={16}
                    height={20}
                  />
                </div>
                <div>
                  <h2 className="text-sm font-bold">Agendamento</h2>
                  <p className="text-xs opacity-90">Sua consulta em poucos cliques</p>
                </div>
              </div>
              <div className="cursor-pointer" onClick={onClose}>
                <IoIosCloseCircle className="h-7 w-7 text-white"/>
              </div>
            </div>
          </div>

          <div className="p-3 bg-gradient-to-br from-gray-50 to-white max-h-80 overflow-y-auto">
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-3 shadow-md border-l-4 border-[#075E54]">
                <h3 className="text-sm font-semibold text-[#075E54] mb-2 flex items-center">
                  <span className="w-5 h-5 bg-[#075E54] text-white rounded-full flex items-center justify-center text-xs mr-2">1</span>
                  Como Funciona
                </h3>
                <p className="text-gray-700 text-xs leading-relaxed">
                  Nosso assistente virtual irá guiá-lo através de um processo simples e rápido para agendar sua consulta.
                </p>
              </div>

              <div className="bg-white rounded-lg p-3 shadow-md border-l-4 border-[#128C7E]">
                <h3 className="text-sm font-semibold text-[#128C7E] mb-2 flex items-center">
                  <span className="w-5 h-5 bg-[#128C7E] text-white rounded-full flex items-center justify-center text-xs mr-2">2</span>
                  Vantagens
                </h3>
                <ul className="text-gray-700 text-xs space-y-1">
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-green-500 rounded-full mr-2"></span>
                    Disponível 24 horas por dia
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-green-500 rounded-full mr-2"></span>
                    Agendamento em tempo real
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-green-500 rounded-full mr-2"></span>
                    Confirmação imediata
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-green-500 rounded-full mr-2"></span>
                    Sem filas ou espera
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-3 shadow-md border-l-4 border-[#25D366]">
                <h3 className="text-sm font-semibold text-[#25D366] mb-2 flex items-center">
                  <span className="w-5 h-5 bg-[#25D366] text-white rounded-full flex items-center justify-center text-xs mr-2">3</span>
                  Especialidades
                </h3>
                <div className="grid grid-cols-2 gap-1 text-xs text-gray-700">
                  <div className="flex items-center">
                    <span className="w-1 h-1 bg-[#25D366] rounded-full mr-1"></span>
                    Cardiologia
                  </div>
                  <div className="flex items-center">
                    <span className="w-1 h-1 bg-[#25D366] rounded-full mr-1"></span>
                    Dermatologia
                  </div>
                  <div className="flex items-center">
                    <span className="w-1 h-1 bg-[#25D366] rounded-full mr-1"></span>
                    Pediatria
                  </div>
                  <div className="flex items-center">
                    <span className="w-1 h-1 bg-[#25D366] rounded-full mr-1"></span>
                    Ginecologia
                  </div>
                  <div className="flex items-center">
                    <span className="w-1 h-1 bg-[#25D366] rounded-full mr-1"></span>
                    Ortopedia
                  </div>
                  <div className="flex items-center">
                    <span className="w-1 h-1 bg-[#25D366] rounded-full mr-1"></span>
                    E mais...
                  </div>
                </div>
              </div>                   
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#075E54] to-[#128C7E] rounded-b-lg p-3 text-white text-center">
            <p className="text-xs mb-1">Pronto para começar?</p>
            <p className="text-xs opacity-90">
              Use o chat para iniciar seu agendamento!
            </p>
          </div>
        </div>
      </div>

      {/* Modal Tutorial Desktop */}
      <div className="hidden md:flex md:w-1/2 bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="w-full flex flex-col h-full">
          <div className="bg-gradient-to-r from-[#075E54] to-[#128C7E] text-white p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <Image 
                  src={logoUnichristus}
                  alt="Logo Unichristus"
                  className="w-8 h-9"
                  width={32}
                  height={36}
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Agendamento Inteligente</h2>
                <p className="text-sm opacity-90">Sua consulta em poucos cliques</p>
              </div>
              <div className="cursor-pointer " onClick={onClose}>
                <IoIosCloseCircle className="h-10 w-10 text-white ml-20"/>
              </div>
            </div>
          </div>

          <div className="flex-1 p-6 bg-gradient-to-br from-gray-50 to-white">
            <div className="space-y-3 h-96 overflow-y-auto">
              <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-[#075E54]">
                <h3 className="text-lg font-semibold text-[#075E54] mb-3 flex items-center">
                  <span className="w-6 h-6 bg-[#075E54] text-white rounded-full flex items-center justify-center text-sm mr-2">1</span>
                  Como Funciona
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Nosso assistente virtual irá guiá-lo através de um processo simples e rápido para agendar sua consulta. 
                  Basta seguir as instruções no chat ao lado.
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-[#128C7E]">
                <h3 className="text-lg font-semibold text-[#128C7E] mb-3 flex items-center">
                  <span className="w-6 h-6 bg-[#128C7E] text-white rounded-full flex items-center justify-center text-sm mr-2">2</span>
                  Vantagens
                </h3>
                <ul className="text-gray-700 text-sm space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Disponível 24 horas por dia
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Agendamento em tempo real
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Confirmação imediata
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Sem filas ou espera
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-[#25D366]">
                <h3 className="text-lg font-semibold text-[#25D366] mb-3 flex items-center">
                  <span className="w-6 h-6 bg-[#25D366] text-white rounded-full flex items-center justify-center text-sm mr-2">3</span>
                  Especialidades Disponíveis
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                  <div className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-[#25D366] rounded-full mr-2"></span>
                    Cardiologia
                  </div>
                  <div className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-[#25D366] rounded-full mr-2"></span>
                    Dermatologia
                  </div>
                  <div className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-[#25D366] rounded-full mr-2"></span>
                    Pediatria
                  </div>
                  <div className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-[#25D366] rounded-full mr-2"></span>
                    Ginecologia
                  </div>
                  <div className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-[#25D366] rounded-full mr-2"></span>
                    Ortopedia
                  </div>
                  <div className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-[#25D366] rounded-full mr-2"></span>
                    E muito mais...
                  </div>
                </div>
              </div>                   
            </div>
            <div className="bg-gradient-to-r from-[#075E54] to-[#128C7E] rounded-lg p-4 text-white text-center mt-10">
              <p className="text-sm mb-2">Pronto para começar?</p>
              <p className="text-xs opacity-90">
                Use o chat ao lado para iniciar seu agendamento agora mesmo!
              </p>
            </div>
          </div>
        
          <div className="bg-gray-100 p-4 text-center">
            <p className="text-xs text-gray-600">
              <span className="font-semibold">Clínicas Unichristus</span> - Cuidando da sua saúde com tecnologia
            </p>
          </div>
        </div>
      </div>
    </>
  );
}