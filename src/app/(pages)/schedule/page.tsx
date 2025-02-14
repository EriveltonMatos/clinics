"use client"
import { useState } from "react";
import footerBackground from "@/assets/footer-background.jpg";
import logoClinica from "@/assets/logo-clinica.png";
import MobileNav from "@/components/MobileNav";
import { FaArrowLeft } from "react-icons/fa";

export default function Schedule() {
  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [dataNas, setDataNas] = useState("");
  const [telefone, setTelefone] = useState(""); // Novo estado para telefone
  const [especialidade, setEspecialidade] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");

  const handleCpfSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const cpfRegex = /^\d{11}$/; // Regex para CPF (11 dígitos)
    if (!cpfRegex.test(cpf)) {
      setError("Por favor, insira um CPF válido com 11 dígitos.");
    } else {
      setError("");
      setStep(2); // Avança para o próximo passo
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!nome || !dataNas || !telefone || !especialidade) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    alert(
      `Agendamento realizado com sucesso!\nCPF: ${cpf}\nNome: ${nome}\nData: ${dataNas}\nTelefone: ${telefone}\nEspecialidade: ${especialidade}`
    );
  };

  return (
    <>
        <MobileNav links={[{href: "/", label: "Voltar ao site", icon: <FaArrowLeft /> }]} />  
        <div
        className="relative flex items-center justify-center p-3 min-h-screen"
        style={{
          backgroundImage: `url(${footerBackground.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay escuro com mais opacidade para deixar o texto legível */}
        <div className="absolute inset-0 bg-black opacity-70 "></div>
        <div className="relative md:w-[110rem] h-full flex items-center justify-center min-h-screen  animate-fade">
          <div className="bg-white shadow-md rounded-lg  max-w-md md:w-full p-6 md:mt-0 mt-12">
            <img src={logoClinica.src} alt="" />
            <h1 className="text-2xl font-bold text-center text-[#2B3E70] mb-4">
              Agendamento de Consulta
            </h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {step === 1 && (
              <form onSubmit={handleCpfSubmit}>
                <p className="block text-red-500 mb-2 text-xs">
                  Seus dados estão protegidos conforme as diretrizes da Lei
                  Geral de Proteção de Dados (LGPD). Garantimos a segurança e a
                  privacidade de suas informações.
                </p>
                <p className="block text-gray-600 mb-2 text-sm">
                  Por favor, insira o seu CPF sem pontos ou traços no campo
                  abaixo para verificarmos se já existe um cadastro em nosso
                  sistema. Caso não haja registro, você será redirecionado
                  automaticamente para criar um novo cadastro e concluir a sua
                  consulta de exames.
                </p>
                <label
                  className="block text-gray-600 mb-2 font-semibold"
                  htmlFor="cpf"
                >
                  CPF:
                </label>
                <input
                  type="text"
                  id="cpf"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  className="border border-gray-300 p-2 rounded-lg w-full mb-4 focus:outline-none focus:ring focus:ring-blue-300"
                  maxLength={11}
                  placeholder="Digite seu CPF"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded-lg w-full hover:bg-blue-600 transition duration-200"
                >
                  Próximo
                </button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={() => setStep(3)}>
              <div className="mb-4">
                <p className="block text-red-500 mb-2 text-xs">
                  Seus dados estão protegidos conforme as diretrizes da Lei
                  Geral de Proteção de Dados (LGPD). Garantimos a segurança e
                  a privacidade de suas informações.
                </p>
                <p className="block text-gray-600 mb-2 text-sm">
                  Para realizar o seu cadastro, solicitamos as seguintes
                  informações: nome completo, data de nascimento e telefone.
                </p>
                <label className="block text-gray-600 mb-2 font-semibold" htmlFor="nome">
                  Nome:
                </label>
                <input
                  type="text"
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="border border-gray-300 p-3 rounded-lg w-full mb-1 focus:outline-none focus:ring focus:ring-blue-400"
                  placeholder="Digite seu nome"
                  required // Campo obrigatório
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 mb-2 font-semibold" htmlFor="data">
                  Data de Nascimento:
                </label>
                <input
                  type="date"
                  id="data"
                  value={dataNas}
                  onChange={(e) => setDataNas(e.target.value)}
                  className="border border-gray-300 p-3 rounded-lg w-full mb-1 focus:outline-none focus:ring focus:ring-blue-400"
                  required // Campo obrigatório
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-600 mb-2 font-semibold"
                  htmlFor="telefone"
                >
                  Telefone:
                </label>
                <input
                  type="text"
                  id="telefone"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring focus:ring-blue-400"
                  placeholder="Digite seu telefone"
                  required // Campo obrigatório
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white p-3 rounded-lg w-full hover:bg-blue-600 transition duration-300"
              >
                Próximo
              </button>
            </form>
            )}

            {step === 3 && (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <p className="block text-gray-600  mb-2 text-sm">
                    Agore, informe a especialidade do atendimento desejado.
                  </p>
                  <label
                    className="block text-gray-600 mb-2"
                    htmlFor="especialidade"
                  >
                    Especialidade:
                  </label>
                  <select
                    id="especialidade"
                    value={especialidade}
                    onChange={(e) => setEspecialidade(e.target.value)}
                    className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring focus:ring-blue-400"
                  >
                    <option value="">Selecione uma especialidade</option>
                    <option value="Cardiologia">Cardiologia</option>
                    <option value="Dermatologia">Dermatologia</option>
                    <option value="Ortopedia">Ortopedia</option>
                    <option value="Pediatria">Pediatria</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="bg-green-500 text-white p-3 rounded-lg w-full hover:bg-green-600 transition duration-300"
                >
                  Confirmar Agendamento
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
