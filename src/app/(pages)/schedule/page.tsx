"use client";
import { useState, useEffect, useRef } from "react";
import footerBackground from "@/assets/footer-background.jpg";
import logoClinica from "@/assets/logo-clinica.png";
import MobileNav from "@/components/MobileNav";
import { FaArrowLeft, FaPaperPlane } from "react-icons/fa";
import Image from "next/image";
import {
  checkCpfExists,
  createResumedPatient,
  getPersonByCpf,
  getDetailedPersonByCpf,
  getSpecialties,
  checkExistingAppointment,
} from "@/api/personService";

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

// Interface para mensagens do chat
interface Message {
  id: number;
  text: string;
  sender: "bot" | "user";
  options?: { value: string; label: string }[];
  input?: {
    type: string;
    placeholder: string;
    maxLength?: number;
    value: string;
    onChange: (value: string) => void;
    validator?: (value: string) => boolean;
    errorMessage?: string;
  };
  timestamp: Date;
}

export default function Schedule() {
  // Estados para dados do formulário
  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [dataNas, setDataNas] = useState("");
  const [telefone, setTelefone] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [specialties, setSpecialties] = useState<Specialty[]>([]);

  // Estados para controle do fluxo
  const [currentStep, setCurrentStep] = useState("welcome");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingSpecialties, setLoadingSpecialties] = useState(false);
  const [cadastroExistente, setCadastroExistente] = useState(false);
  const [detailedPersonData, setDetailedPersonData] =
    useState<DetailedPerson | null>(null);
  const [patientId, setPatientId] = useState<string>("");

  // Estado para as mensagens do chat
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [waitingForResponse, setWaitingForResponse] = useState(false);

  // Ref para scroll automático
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Efeito inicial para carregar especialidades e mensagens de boas-vindas
  useEffect(() => {
    // Carregar especialidades
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
        addMessage(
          "bot",
          "Não foi possível carregar nossas especialidades. Por favor, tente novamente mais tarde."
        );
      } finally {
        setLoadingSpecialties(false);
      }
    };

    fetchSpecialties();

    // Adicionar mensagens iniciais
    setTimeout(() => {
      addMessage(
        "bot",
        "👋 Olá! Bem-vindo(a) ao sistema de agendamento de consultas da Unichristus."
      );
    }, 500);

    setTimeout(() => {
      addMessage(
        "bot",
        "Para começarmos seu agendamento, precisamos verificar seus dados."
      );
    }, 1500);

    setTimeout(() => {
      // Alteração 1: Removido placeholder do input de CPF
      addMessage(
        "bot",
        "Por favor, digite seu CPF (apenas números):",
        undefined,
        {
          type: "hidden",
          placeholder: "Digite seu cpf",
          maxLength: 11,
          value: cpf,
          onChange: setCpf,
          validator: (value) => /^\d{11}$/.test(value),
          errorMessage: "CPF INVÁLIDO! O CPF deve conter 11 dígitos numéricos.",
        }
      );
    }, 2500);
  }, []);

  // Efeito para scroll automático quando novas mensagens são adicionadas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Função para adicionar mensagens ao chat
  const addMessage = (
    sender: "bot" | "user",
    text: string,
    options?: { value: string; label: string }[],
    input?: {
      type: string;
      placeholder: string;
      maxLength?: number;
      value: string;
      onChange: (value: string) => void;
      validator?: (value: string) => boolean;
      errorMessage?: string;
    }
  ) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: Date.now(),
        text,
        sender,
        options,
        input,
        timestamp: new Date(),
      },
    ]);
  };

  // Função para processar o CPF
  const handleCpfSubmit = async (submittedCpf: string) => {
    setError("");

    // Validação do CPF (11 dígitos)
    const cpfRegex = /^\d{11}$/;
    if (!cpfRegex.test(submittedCpf)) {
      addMessage("bot", "Por favor, insira um CPF válido com 11 dígitos.");
      addMessage(
        "bot",
        "Por favor, digite seu CPF (apenas números):",
        undefined,
        {
          type: "hidden",
          placeholder: "",
          maxLength: 11,
          value: cpf,
          onChange: setCpf,
          validator: (value) => /^\d{11}$/.test(value),
          errorMessage: "CPF INVÁLIDO! O CPF deve conter 11 dígitos numéricos.",
        }
      );
      return;
    }

    addMessage("user", submittedCpf);
    addMessage("bot", "Verificando seu CPF...");
    setWaitingForResponse(true);

    try {
      setLoading(true);
      // Chamada para o serviço para verificar se o CPF já está cadastrado
      const exists = await checkCpfExists(submittedCpf);
      setCadastroExistente(exists);

      if (exists) {
        // Se o CPF existir, busca os dados detalhados da pessoa
        try {
          const detailedPersonData: DetailedPerson =
            await getDetailedPersonByCpf(submittedCpf);

          // Salvar os dados completos para uso posterior
          setDetailedPersonData(detailedPersonData);

          // Salvar o ID do paciente
          if (detailedPersonData.person && detailedPersonData.person.id) {
            setPatientId(detailedPersonData.person.id);
          }

          // Extrair os dados da pessoa
          setNome(detailedPersonData.person.fullname || "");
          setDataNas(detailedPersonData.person.birthDate || "");

          // Extrair o número de telefone (se disponível)
          if (
            detailedPersonData.contact &&
            detailedPersonData.contact.length > 0
          ) {
            // Pega o primeiro telefone da lista de contatos
            const phoneContact = detailedPersonData.contact.find(
              (c) => c.contactType.description.toLowerCase() === "telefone"
            );

            setTelefone(phoneContact ? phoneContact.value : "");
          }

          addMessage("bot", "Olá");
          addMessage(
            "bot",
            "✅ CPF encontrado! Você já possui cadastro em nosso sistema."
          );

          // Alteração 2: Ir direto para as especialidades sem confirmar dados
          setTimeout(() => {
            promptForSpecialty();
          }, 1000);
        } catch (personError) {
          console.error(
            "Erro ao buscar dados detalhados da pessoa:",
            personError
          );

          // Fallback para o método anterior se o novo endpoint falhar
          try {
            const personData = await getPersonByCpf(submittedCpf);
            setNome(personData.name || "");
            setDataNas(personData.birthDate || "");
            setTelefone(personData.phoneNumber || "");

            // Tentar encontrar o ID da pessoa nesta resposta alternativa
            if (personData.id) {
              setPatientId(personData.id);
            }

            // Ir direto para as especialidades também no fallback
            setTimeout(() => {
              promptForSpecialty();
            }, 1000);
          } catch (fallbackError) {
            console.error("Erro também no fallback:", fallbackError);
            addMessage(
              "bot",
              "Não foi possível recuperar seus dados. Por favor, tente novamente mais tarde."
            );
            promptForPersonalData(true); // true indica que é um novo cadastro
          }
        }
      } else {
        // Se o CPF não existir, solicitar dados para novo cadastro
        addMessage(
          "bot",
          "CPF não encontrado. Vamos criar um novo cadastro para você!"
        );
        promptForPersonalData(true); // true indica que é um novo cadastro
      }
    } catch (err) {
      console.error("Erro ao verificar CPF:", err);
      addMessage(
        "bot",
        "Ocorreu um erro ao verificar o CPF. Por favor, tente novamente."
      );
    } finally {
      setLoading(false);
      setWaitingForResponse(false);
    }
  };

  // Função para solicitar dados pessoais
  const promptForPersonalData = (isNewRegistration = false) => {
    setCurrentStep("personalData");

    if (isNewRegistration) {
      addMessage(
        "bot",
        "Para criarmos seu cadastro, preciso de algumas informações."
      );
    } else {
      addMessage("bot", "Vamos confirmar seus dados cadastrais.");
    }

    // Solicitar nome
    setTimeout(() => {
      addMessage("bot", "Qual é o seu nome completo?", undefined, {
        type: "hidden",
        placeholder: "Digite seu nome completo",
        value: nome,
        onChange: setNome,
        validator: (value) => value.trim().length > 0,
        errorMessage: "Por favor, digite seu nome completo.",
      });
    }, 1000);
  };

  // Função para processar o nome
  const handleNameSubmit = (submittedName: string) => {
    if (!submittedName.trim()) {
      addMessage("bot", "Por favor, digite seu nome completo.");
      return;
    }

    addMessage("user", submittedName);
    setNome(submittedName);

    // Solicitar data de nascimento
    setTimeout(() => {
      addMessage("bot", "Qual é a sua data de nascimento?", undefined, {
        type: "hidden",
        placeholder: "DD/MM/AAAA",
        value: dataNas,
        onChange: setDataNas,
        validator: (value) => {
          // Verifica se a data está no formato correto
          const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
          if (!dateRegex.test(value)) return false;
          
          // Divide a data em dia, mês e ano
          const parts = value.split('/');
          const day = parseInt(parts[0], 10);
          const month = parseInt(parts[1], 10);
          const year = parseInt(parts[2], 10);
          
          // Verifica se a data é válida
          const date = new Date(year, month - 1, day);
          return (
            date.getDate() === day &&
            date.getMonth() === month - 1 &&
            date.getFullYear() === year &&
            year >= 1900 &&
            year <= new Date().getFullYear()
          );
        },
        errorMessage: "Por favor, digite uma data no formato DD/MM/AAAA válida."
      });
    }, 1000);
  };

  // Função para processar a data de nascimento
  const handleDateSubmit = (submittedDate: string) => {
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(submittedDate)) {
      addMessage("bot", "Por favor, digite a data no formato DD/MM/AAAA.");
      // Readicionar o campo de input para a data
    setTimeout(() => {
      addMessage("bot", "Qual é a sua data de nascimento?", undefined, {
        type: "date",
        placeholder: "DD/MM/AAAA",
        value: dataNas,
        onChange: setDataNas,
        validator: (value) => {
          const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
          if (!dateRegex.test(value)) return false;
          
          const parts = value.split('/');
          const day = parseInt(parts[0], 10);
          const month = parseInt(parts[1], 10);
          const year = parseInt(parts[2], 10);
          
          if (month < 1 || month > 12) return false;
          
          const daysInMonth = new Date(year, month, 0).getDate();
          if (day < 1 || day > daysInMonth) return false;
          
          const currentYear = new Date().getFullYear();
          if (year < 1900 || year > currentYear) return false;
          
          return true;
        },
        errorMessage: "Por favor, digite uma data no formato DD/MM/AAAA válida."
      });
    }, 1000);
    return;
    }

    addMessage("user", formatDateForDisplay(submittedDate));
    setDataNas(submittedDate);

    // Solicitar telefone
    setTimeout(() => {
      addMessage("bot", "Qual é o seu número de telefone?", undefined, {
        type: "hidden",
        placeholder: "Digite seu telefone",
        maxLength: 12, // Limitando a 12 caracteres
        value: telefone,
        onChange: setTelefone,
        validator: (value) => /^\d{10,12}$/.test(value), // Validando entre 10 e 12 dígitos
        errorMessage:
          "Por favor, digite um número de telefone válido com 10 a 12 dígitos.",
      });
    }, 1000);
  };

  // Função para processar o telefone
  const handlePhoneSubmit = async (submittedPhone: string) => {
    if (!/^\d{10,12}$/.test(submittedPhone)) {
      addMessage(
        "bot",
        "O telefone deve conter entre 10 e 12 dígitos numéricos."
      );
      // Readicionar o campo de input para o telefone
      setTimeout(() => {
        addMessage("bot", "Qual é o seu número de telefone?", undefined, {
          type: "hidden",
          placeholder: "Digite seu telefone",
          maxLength: 12,
          value: telefone,
          onChange: setTelefone,
          validator: (value) => /^\d{10,12}$/.test(value),
          errorMessage:
            "Por favor, digite um número de telefone válido com 10 a 12 dígitos.",
        });
      }, 1000);
      return;
    }

    addMessage("user", submittedPhone);
    setTelefone(submittedPhone);
    setWaitingForResponse(true);

    // Se é um novo cadastro, criar o paciente
    if (!cadastroExistente) {
      try {
        addMessage("bot", "Criando seu cadastro...");
        setLoading(true);

        // Garantindo que a data está no formato YYYY-MM-DD
        let formattedDate = dataNas;
        if (dataNas.includes("/")) {
          const parts = dataNas.split("/");
          formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
        }

        // Formata os dados conforme esperado pela API
        const patientData = {
          cpf: cpf,
          fullname: nome,
          birthdate: formattedDate,
          contact: telefone,
        };

        // Chama a API para criar o paciente
        const result = await createResumedPatient(patientData);

        // Verifica estrutura da resposta e salva o ID do paciente
        if (result) {
          // Verificando diferentes possibilidades de onde o ID possa estar na resposta
          if (result.id) {
            setPatientId(result.id);
          } else if (result.patient && result.patient.id) {
            setPatientId(result.patient.id);
          } else if (result.person && result.person.id) {
            setPatientId(result.person.id);
          } else {
            addMessage(
              "bot",
              "Não foi possível identificar seus dados na resposta."
            );
            return;
          }

          addMessage("bot", "✅ Cadastro realizado com sucesso!");
        } else {
          addMessage("bot", "Resposta vazia da API ao criar paciente.");
          return;
        }
      } catch (err: any) {
        console.error("Erro ao criar cadastro:", err);
        addMessage(
          "bot",
          `Ocorreu um erro ao criar seu cadastro: ${
            err.message || "Erro desconhecido"
          }`
        );
        return;
      } finally {
        setLoading(false);
        setWaitingForResponse(false);
      }
    }

    // Resumo dos dados
    setTimeout(() => {
      addMessage(
        "bot",
        `Perfeito! Confirmando seus dados:\n- Nome: ${nome}\n- Data de nascimento: ${formatDateForDisplay(
          dataNas
        )}\n- Telefone: ${telefone}`
      );
      promptForSpecialty();
    }, 1000);
  };

  // Função para solicitar especialidade
  const promptForSpecialty = () => {
    setCurrentStep("specialty");

    setTimeout(() => {
      if (loadingSpecialties) {
        addMessage("bot", "Carregando nossas especialidades...");
        return;
      }

      if (specialties.length === 0) {
        addMessage(
          "bot",
          "Desculpe, não conseguimos carregar as especialidades disponíveis."
        );
        return;
      }

      addMessage(
        "bot",
        "Agora, selecione a especialidade desejada:",
        specialties.map((specialty) => ({
          value: specialty.id,
          label: `${specialty.description} (${specialty.specialtyType.description})`,
        }))
      );
    }, 1500);
  };

  // Função para processar a escolha da especialidade
  const handleSpecialtySelection = async (specialtyId: string) => {
    setEspecialidade(specialtyId);

    // Encontrar a especialidade selecionada
    const selectedSpecialty = specialties.find((s) => s.id === specialtyId);
    if (!selectedSpecialty) {
      addMessage(
        "bot",
        "Especialidade não encontrada. Por favor, tente novamente."
      );
      return;
    }

    const specialtyName = selectedSpecialty.description;
    addMessage("user", specialtyName);
    addMessage("bot", `Verificando disponibilidade para ${specialtyName}...`);
    setWaitingForResponse(true);

    try {
      setLoading(true);

      if (!patientId) {
        addMessage(
          "bot",
          "ID do paciente não encontrado. Por favor, tente novamente."
        );
        return;
      }

      // Verificar se já existe agendamento para esta especialidade
      const hasExistingAppointment = await checkExistingAppointment(
        patientId,
        specialtyId,
        new Date().toISOString().split("T")[0] // Data atual
      );

      if (hasExistingAppointment) {
        // Se existe agendamento
        setTimeout(() => {
          addMessage(
            "bot",
            `Você já possui um agendamento para ${specialtyName}. Gostaria de informações sobre este agendamento?`,
            [
              { value: "sim", label: "Sim, quero informações" },
              { value: "nao", label: "Não, quero agendar outra especialidade" },
            ]
          );
        }, 1000);
      } else {
        // Se não existe agendamento
        setTimeout(() => {
          addMessage(
            "bot",
            `Ótimo! Estamos processando seu agendamento para ${specialtyName}.`
          );
        }, 1500);

        setTimeout(() => {
          addMessage(
            "bot",
            "Seu agendamento foi solicitado com sucesso! Em breve nossa equipe entrará em contato para confirmar data e horário disponíveis."
          );
        }, 2000);

        setTimeout(() => {
          addMessage("bot", "Deseja agendar outra especialidade?", [
            { value: "sim", label: "Sim, quero agendar outra" },
            { value: "nao", label: "Não, obrigado" },
          ]);
        }, 3000);
      }
    } catch (err) {
      console.error("Erro ao verificar agendamento:", err);
      addMessage(
        "bot",
        "Ocorreu um erro ao verificar disponibilidade. Por favor, tente novamente."
      );
    } finally {
      setLoading(false);
      setWaitingForResponse(false);
    }
  };

  // Função para lidar com resposta sim/não
  const handleYesNoResponse = (response: string, context: string) => {
    addMessage("user", response === "sim" ? "Sim" : "Não");

    if (context === "existing_appointment") {
      if (response === "sim") {
        // Redirecionar para WhatsApp
        const phoneNumber = "5585987654321"; // Substitua pelo número do WhatsApp da clínica
        const message = `Olá! Já tenho um agendamento e gostaria de mais informações.`;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
          message
        )}`;

        setTimeout(() => {
          addMessage(
            "bot",
            "Vou te redirecionar para o WhatsApp da clínica para obter mais informações sobre seu agendamento."
          );
        }, 1000);

        setTimeout(() => {
          window.open(whatsappUrl, "_blank");
          addMessage("bot", "Deseja agendar outra especialidade?", [
            { value: "sim", label: "Sim, quero agendar outra" },
            { value: "nao", label: "Não, obrigado" },
          ]);
        }, 2000);
      } else {
        // Voltar para seleção de especialidade
        setTimeout(() => {
          promptForSpecialty();
        }, 1000);
      }
    } else if (context === "another_appointment") {
      if (response === "sim") {
        // Voltar para seleção de especialidade
        setTimeout(() => {
          promptForSpecialty();
        }, 1000);
      } else {
        // Encerrar conversa
        setTimeout(() => {
          addMessage(
            "bot",
            "Obrigado por utilizar nosso sistema de agendamento! Tenha um ótimo dia! 😊"
          );
        }, 1000);
      }
    }
  };

  // Função para lidar com o envio de mensagens do usuário
  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    const lastBotMessage = [...messages]
      .reverse()
      .find((msg) => msg.sender === "bot");

    if (lastBotMessage?.input) {
      // Se a última mensagem do bot tinha um campo de input
      const inputField = lastBotMessage.input;
      const isValid = inputField.validator
        ? inputField.validator(userInput)
        : true;

      if (!isValid) {
        addMessage(
          "bot",
          inputField.errorMessage || "Por favor, insira um valor válido."
        );
        addMessage(
          "bot",
          "Preencha novamente os dados solicitados",
          undefined,
          {
            type: "hidden",
            placeholder: "",
            maxLength: 11,
            value: cpf,
            onChange: setCpf,
            validator: (value) => /^\d{11}$/.test(value),
            errorMessage:
              "CPF INVÁLIDO! O CPF deve conter 11 dígitos numéricos.",
          }
        );
        setUserInput("");
        return;
      }

      // Processar o input com base no passo atual
      if (currentStep === "welcome" || inputField.placeholder.includes("CPF")) {
        handleCpfSubmit(userInput);
      } else if (currentStep === "personalData") {
        if (inputField.placeholder.includes("nome")) {
          handleNameSubmit(userInput);
        } else if (inputField.type === "date") {
          handleDateSubmit(userInput);
        } else if (inputField.placeholder.includes("telefone")) {
          handlePhoneSubmit(userInput);
        }
      }
    }

    setUserInput("");
  };

  // Função para tratar cliques em opções
  const handleOptionClick = (value: string) => {
    const lastBotMessage = [...messages]
      .reverse()
      .find((msg) => msg.sender === "bot");

    if (currentStep === "specialty") {
      if (lastBotMessage?.options?.some((opt) => opt.value === value)) {
        // Verifica se é uma especialidade
        if (specialties.some((s) => s.id === value)) {
          handleSpecialtySelection(value);
        }
        // Verifica se é resposta sim/não para agendamento existente
        else if (value === "sim" || value === "nao") {
          const context = lastBotMessage.text.includes(
            "já possui um agendamento"
          )
            ? "existing_appointment"
            : "another_appointment";
          handleYesNoResponse(value, context);
        }
      }
    }
  };

  // Função para formatar data (YYYY-MM-DD para DD/MM/YYYY)
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

  // Timestamp para as mensagens
  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
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
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="relative md:w-[110rem] h-full flex items-center justify-center min-h-screen animate-fade">
          <div className="bg-white shadow-md rounded-lg max-w-md md:w-full h-[600px] flex flex-col md:mt-0 mt-12">
            {/* Header do chat */}
            <div className="bg-[#075E54] text-white p-3 rounded-t-lg flex items-center">
              <Image
                src={logoClinica.src}
                alt="Logo da Clínica"
                height={80}
                width={80}
                className=" mr-3"
              />
              <div>
                <h1 className="font-bold">Atendimento Clínica</h1>
                <p className="text-xs">Agendamento de Consultas</p>
              </div>
            </div>

            {/* Área de mensagens */}
            <div
              className="flex-1 p-4 overflow-y-auto bg-[#E5DDD5]"
              style={{
                backgroundImage:
                  "url('https://web.whatsapp.com/img/bg-chat-tile-light_04fcacde539c58cca6745483d4858c52.png')",
                backgroundRepeat: "repeat",
              }}
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${
                    message.sender === "bot" ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`p-3 rounded-lg max-w-[80%] relative ${
                      message.sender === "bot"
                        ? "bg-white text-black"
                        : "bg-[#DCF8C6] text-black"
                    }`}
                  >
                    <p className="whitespace-pre-line">{message.text}</p>

                    {/* Opções de resposta */}
                    {message.options && (
                      <div className="mt-2 flex flex-col gap-2">
                        {message.options.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => handleOptionClick(option.value)}
                            className="bg-[#075E54] text-white py-1 px-3 rounded-full text-sm hover:bg-[#128C7E] transition-colors"
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Campo de input */}
                    {message.input && message.sender === "bot" && (
                      <div className="mt-2">
                        <input
                          type={message.input.type}
                          placeholder={message.input.placeholder}
                          value={message.input.value}
                          onChange={(e) =>
                            message.input?.onChange(e.target.value)
                          }
                          maxLength={message.input.maxLength}
                          className="w-full p-2 border z-10 border-gray-300 rounded-md text-sm focus:outline-none focus:ring focus:ring-blue-300 relative"
                        />
                      </div>
                    )}

                    <span className="text-[10px] text-gray-500 absolute right-2">
                      {formatTimestamp(message.timestamp)}
                    </span>
                  </div>
                </div>
              ))}

              {/* Indicador de digitação */}
              {waitingForResponse && (
                <div className="flex justify-start mb-4">
                  <div className="bg-white p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-75"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Área de input */}
            <div className="bg-[#F0F2F5] p-3 rounded-b-lg flex items-center">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Digite uma mensagem"
                className="flex-1 py-2 px-3 rounded-full border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
              />
              <button
                onClick={handleSendMessage}
                disabled={!userInput.trim() || waitingForResponse}
                className="ml-2 bg-[#075E54] text-white p-2 rounded-full disabled:bg-gray-400"
              >
                <FaPaperPlane />
              </button>
            </div>

            {/* Aviso LGPD */}
            <div className="p-2 bg-gray-100 text-xs text-center text-gray-500">
              Seus dados estão protegidos conforme a Lei Geral de Proteção de
              Dados (LGPD).
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
