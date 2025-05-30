"use client";
import { useState, useEffect } from "react";
import footerBackground from "@/assets/footer-background.jpg";
import logoClinica from "@/assets/logo-clinica.png";
import MobileNav from "@/components/MobileNav";
import { FaArrowLeft } from "react-icons/fa";
import Image from "next/image";
import {
  checkCpfExists,
  createResumedPatient,
  getPersonByCpf,
  getDetailedPersonByCpf,
  getSpecialties,
  checkExistingAppointment,
} from "@/api/appointmentService";

// Interface para representar o tipo de especialidade
interface SpecialtyType {
  id: string;
  description: string;
}

// Interface para representar uma especialidade
interface Specialty {
  id: string;
  description: string;
  specialtyType: SpecialtyType;
  minimumAge: number;
  maximumAge: number;
  hasWaitingList: boolean;
  usesElectronicPrescription: boolean;
  disabled: boolean;
}

// Interface para representar o formato do contato
interface Contact {
  id: string;
  value: string;
  contactType: {
    id: string;
    description: string;
  };
}

// Interface para representar os dados detalhados da pessoa
interface DetailedPerson {
  person: {
    id: string;
    fullname: string;
    cpf: string;
    birthDate: string;
  };
  contact: Contact[];
}

export default function Schedule() {
  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [dataNas, setDataNas] = useState("");
  const [telefone, setTelefone] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingSpecialties, setLoadingSpecialties] = useState(false);
  const [cadastroExistente, setCadastroExistente] = useState(false);
  const [detailedPersonData, setDetailedPersonData] =
    useState<DetailedPerson | null>(null);
  const [newPatientId, setNewPatientId] = useState<string>("");
  const [patientId, setPatientId] = useState<string>("");

  // Carregar as especialidades quando o componente for montado
  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        setLoadingSpecialties(true);
        const data = await getSpecialties();
        // Filtrando apenas especialidades não desativadas
        const activeSpecialties = data.filter(
          (specialty: Specialty) => !specialty.disabled
        );
        setSpecialties(activeSpecialties);
      } catch (err) {
        console.error("Erro ao carregar especialidades:", err);
        setError(
          "Não foi possível carregar as especialidades. Por favor, tente novamente mais tarde."
        );
      } finally {
        setLoadingSpecialties(false);
      }
    };

    fetchSpecialties();
  }, []);

  const handleCpfSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError("");
    
    // Validação do CPF (11 dígitos)
    const cpfRegex = /^\d{11}$/;
    if (!cpfRegex.test(cpf)) {
      setError("Por favor, insira um CPF válido com 11 dígitos.");
      return;
    }
    
    try {
      setLoading(true);
      // Chamada para o serviço para verificar se o CPF já está cadastrado
      const exists = await checkCpfExists(cpf);
      setCadastroExistente(exists);
      
      if (exists) {
        // Se o CPF existir, busca os dados detalhados da pessoa usando o novo endpoint
        try {
          const detailedPersonData: DetailedPerson = await getDetailedPersonByCpf(cpf);
          
          // Salvar os dados completos para uso posterior
          setDetailedPersonData(detailedPersonData);
          
          // Salvar o ID do paciente
          if (detailedPersonData.person && detailedPersonData.person.id) {
            setPatientId(detailedPersonData.person.id);
            console.log("ID do paciente existente encontrado:", detailedPersonData.person.id);
          } else {
            console.warn("ID da pessoa não encontrado nos dados detalhados:", detailedPersonData);
          }
          
          // Extrair os dados da pessoa
          setNome(detailedPersonData.person.fullname || "");
          
          // Formatar a data de nascimento (se necessário)
          let birthDate = detailedPersonData.person.birthDate || "";
          if (birthDate && !birthDate.includes('/')) {
            // Converte de YYYY-MM-DD para DD/MM/YYYY se necessário
            setDataNas(birthDate);
          }
          
          // Extrair o número de telefone (se disponível)
          if (detailedPersonData.contact && detailedPersonData.contact.length > 0) {
            // Pega o primeiro telefone da lista de contatos
            const phoneContact = detailedPersonData.contact.find(c => 
              c.contactType.description.toLowerCase() === "telefone"
            );
            
            setTelefone(phoneContact ? phoneContact.value : "");
          }
          
          alert("CPF encontrado! Você já possui cadastro em nosso sistema.");
          setStep(3); // Avança diretamente para a seleção de especialidade
        } catch (personError) {
          console.error("Erro ao buscar dados detalhados da pessoa:", personError);
          
          // Fallback para o método anterior se o novo endpoint falhar
          try {
            const personData = await getPersonByCpf(cpf);
            setNome(personData.name || "");
            setDataNas(personData.birthDate || "");
            setTelefone(personData.phoneNumber || "");
            
            // Tentar encontrar o ID da pessoa nesta resposta alternativa
            if (personData.id) {
              setPatientId(personData.id);
              console.log("ID do paciente encontrado via fallback:", personData.id);
            } else {
              console.warn("ID da pessoa não encontrado no fallback:", personData);
            }
          } catch (fallbackError) {
            console.error("Erro também no fallback:", fallbackError);
            setError("Não foi possível recuperar seus dados. Por favor, tente novamente mais tarde.");
          }
          
          setStep(2); // Vai para o passo de confirmação de dados
        }
      } else {
        // Se o CPF não existir, mostra uma mensagem informando que será necessário cadastro
        alert("CPF não encontrado. Você será direcionado para criar um novo cadastro.");
        setStep(2);
      }
    } catch (err) {
      console.error("Erro ao verificar CPF:", err);
      setError("Ocorreu um erro ao verificar o CPF. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handlePersonalInfoSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError("");
    
    if (!nome || !dataNas || !telefone) {
      setError("Por favor, preencha todos os campos.");
      return;
    }
    
    // Se não houver cadastro existente, cria um novo paciente
    if (!cadastroExistente) {
      try {
        setLoading(true);
        
        // Garantindo que a data está no formato YYYY-MM-DD
        let formattedDate = dataNas;
        if (dataNas.includes('/')) {
          const parts = dataNas.split('/');
          formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
        }
        
        // Formata os dados conforme esperado pela API
        const patientData = {
          cpf: cpf,
          fullname: nome,
          birthdate: formattedDate, // Garantindo o formato YYYY-MM-DD
          contact: telefone
        };
        
        console.log("Enviando dados do paciente:", patientData);
        
        // Chama a API para criar o paciente
        const result = await createResumedPatient(patientData);
        console.log("Resposta da API após criar paciente:", result);
        
        // Verifica estrutura da resposta e salva o ID do paciente
        if (result) {
          // Verificando diferentes possibilidades de onde o ID possa estar na resposta
          if (result.id) {
            setPatientId(result.id);
            console.log("ID do paciente encontrado diretamente:", result.id);
          } else if (result.patient && result.patient.id) {
            setPatientId(result.patient.id);
            console.log("ID do paciente encontrado em result.patient.id:", result.patient.id);
          } else if (result.person && result.person.id) {
            setPatientId(result.person.id);
            console.log("ID do paciente encontrado em result.person.id:", result.person.id);
          } else {
            // Logando a estrutura completa para debugging
            console.error("Estrutura da resposta não contém ID esperado:", JSON.stringify(result));
            setError("Não foi possível identificar o ID do paciente na resposta.");
            return;
          }
          
          // Se o cadastro foi bem-sucedido, mostra mensagem
          alert("Cadastro realizado com sucesso!");
        } else {
          setError("Resposta vazia da API ao criar paciente.");
          return;
        }
        
      } catch (err: any) {
        console.error("Erro ao criar cadastro:", err);
        setError(`Ocorreu um erro ao criar seu cadastro: ${err.message || "Erro desconhecido"}`);
        return;
      } finally {
        setLoading(false);
      }
    } else {
      // Se já tem cadastro, usa o ID existente
      const personId = detailedPersonData?.person?.id;
      if (personId) {
        setPatientId(personId);
        console.log("Usando ID de pessoa já cadastrada:", personId);
      } else {
        setError("Não foi possível identificar o ID do paciente cadastrado.");
        return;
      }
    }
    
    // Avança para a próxima etapa
    setStep(3);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    if (!especialidade) {
      setError("Por favor, selecione uma especialidade.");
      setLoading(false);
      return;
    }
  
    try {
      // Encontre a especialidade selecionada para exibir o nome na mensagem
      const selectedSpecialty = specialties.find(s => s.id === especialidade);
      const specialtyName = selectedSpecialty ? selectedSpecialty.description : especialidade;
      
      console.log("Verificando agendamento existente...");
      console.log("Dados do agendamento:", { 
        patient: patientId, 
        specialtyId: especialidade, 
        date: new Date().toISOString().split('T')[0] // Data atual no formato YYYY-MM-DD
      });
      
      if (!patientId) {
        setError("ID do paciente não encontrado. Por favor, tente novamente.");
        setLoading(false);
        return;
      }
      
      // Verificar se já existe agendamento para esta especialidade
      const hasExistingAppointment = await checkExistingAppointment(
        patientId,
        especialidade,
        new Date().toISOString().split('T')[0] // Data atual
      );
      
      console.log("Resultado da verificação de agendamento:", hasExistingAppointment);
      
      if (hasExistingAppointment) {
        // Se existe agendamento, redirecionar para o WhatsApp
        const phoneNumber = "5585987654321"; // Substitua pelo número do WhatsApp da clínica
        const message = `Olá! Já tenho um agendamento para a especialidade ${specialtyName} e gostaria de mais informações.`;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        
        // Alerta o usuário antes de redirecionar
        alert(`Você já possui um agendamento para ${specialtyName}. Você será redirecionado para o WhatsApp da clínica para mais informações.`);
        
        // Redireciona para o WhatsApp
        window.open(whatsappUrl, '_blank');
      } else {
        // Se não existe agendamento, proceder para a próxima etapa
        console.log("Não há agendamento existente, prosseguindo com novo agendamento");
        
        // Aqui você adicionaria a lógica para ir para a próxima fase
        alert(
          `Agendamento em processamento!\nCPF: ${cpf}\nNome: ${nome}\nData de Nascimento: ${dataNas}\nTelefone: ${telefone}\nEspecialidade: ${specialtyName}`
        );
        
        // Você pode adicionar aqui setStep(4) para ir para a próxima fase
      }
    } catch (err) {
      console.error("Erro ao verificar agendamento:", err);
      setError("Ocorreu um erro ao verificar disponibilidade de agendamento. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Função para formatar a data para exibição
  const formatDateForDisplay = (dateString: string) => {
    if (!dateString) return "";

    // Se a data já estiver no formato DD/MM/YYYY
    if (dateString.includes("/")) return dateString;

    // Converter de YYYY-MM-DD para DD/MM/YYYY para exibição
    const parts = dateString.split("-");
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }

    return dateString;
  };

  return (
    <>
      <MobileNav
        links={[{ href: "/", label: "Voltar ao site", icon: <FaArrowLeft /> }]}
      />
      <div
        className="relative flex items-center justify-center p-3 min-h-screen"
        style={{
          backgroundImage: `url(${footerBackground.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-70 "></div>
        <div className="relative md:w-[110rem] h-full flex items-center justify-center min-h-screen  animate-fade">
          <div className="bg-white shadow-md rounded-lg  max-w-md md:w-full p-6 md:mt-0 mt-12">
            <Image
              src={logoClinica.src}
              alt="Logo da Clínica"
              height={1000}
              width={1000}
            />
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
                  disabled={loading}
                  className={`${
                    loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                  } text-white p-2 rounded-lg w-full transition duration-200`}
                >
                  {loading ? "Verificando..." : "Próximo"}
                </button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handlePersonalInfoSubmit}>
                <div className="mb-4">
                  <p className="block text-red-500 mb-2 text-xs">
                    Seus dados estão protegidos conforme as diretrizes da Lei
                    Geral de Proteção de Dados (LGPD). Garantimos a segurança e
                    a privacidade de suas informações.
                  </p>
                  <p className="block text-gray-600 mb-2 text-sm">
                    {cadastroExistente
                      ? "Confirmamos seus dados cadastrais. Complete as informações abaixo para prosseguir com o agendamento."
                      : "Para realizar o seu cadastro, solicitamos as seguintes informações: nome completo, data de nascimento e telefone."}
                  </p>
                  <label
                    className="block text-gray-600 mb-2 font-semibold"
                    htmlFor="nome"
                  >
                    Nome:
                  </label>
                  <input
                    type="text"
                    id="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="border border-gray-300 p-3 rounded-lg w-full mb-1 focus:outline-none focus:ring focus:ring-blue-400"
                    placeholder="Digite seu nome"
                    required
                    readOnly={cadastroExistente}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-600 mb-2 font-semibold"
                    htmlFor="data"
                  >
                    Data de Nascimento:
                  </label>
                  <input
                    type="date"
                    id="data"
                    value={dataNas}
                    onChange={(e) => setDataNas(e.target.value)}
                    className="border border-gray-300 p-3 rounded-lg w-full mb-1 focus:outline-none focus:ring focus:ring-blue-400"
                    required
                    readOnly={cadastroExistente}
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
                    required
                    readOnly={cadastroExistente}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`${
                    loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                  } text-white p-3 rounded-lg w-full transition duration-300`}
                >
                  {loading ? "Processando..." : "Próximo"}
                </button>
              </form>
            )}

            {step === 3 && (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <p className="block text-gray-600 mb-2 text-sm">
                    Agora, informe a especialidade do atendimento desejado.
                  </p>
                  {/* Exibir os dados do paciente confirmados */}
                  <div className="bg-gray-100 p-3 rounded-lg mb-4">
                    <h3 className="font-semibold text-gray-700 mb-2">
                      Dados do Paciente:
                    </h3>
                    <p>
                      <span className="font-medium">Nome:</span> {nome}
                    </p>
                    <p>
                      <span className="font-medium">CPF:</span> {cpf}
                    </p>
                    <p>
                      <span className="font-medium">Data de Nascimento:</span>{" "}
                      {formatDateForDisplay(dataNas)}
                    </p>
                    <p>
                      <span className="font-medium">Telefone:</span> {telefone}
                    </p>
                  </div>
                  <label
                    className="block text-gray-600 mb-2 font-semibold"
                    htmlFor="especialidade"
                  >
                    Especialidade:
                  </label>
                  {loadingSpecialties ? (
                    <p className="text-gray-500 mb-4">
                      Carregando especialidades...
                    </p>
                  ) : (
                    <select
                      id="especialidade"
                      value={especialidade}
                      onChange={(e) => setEspecialidade(e.target.value)}
                      className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring focus:ring-blue-400"
                      required
                    >
                      <option value="">Selecione uma especialidade</option>
                      {specialties.map((specialty) => (
                        <option key={specialty.id} value={specialty.id}>
                          {specialty.description} (
                          {specialty.specialtyType.description})
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={loadingSpecialties}
                  className={`${
                    loadingSpecialties
                      ? "bg-gray-400"
                      : "bg-green-500 hover:bg-green-600"
                  } text-white p-3 rounded-lg w-full transition duration-300`}
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
