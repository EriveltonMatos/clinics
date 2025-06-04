"use client";
import { useState, useEffect, useRef } from "react";
import footerBackground from "@/assets/footer-background.jpg";
import logoUnichristus from "@/assets/u-unichristus-blue.png";
import MobileNav from "@/components/MobileNav";
import { FaArrowLeft, FaPaperPlane } from "react-icons/fa";
import {
  checkCpfExists,
  createResumedPatient,
  getPersonByCpf,
  getDetailedPersonByCpf,
  checkExistingAppointment,
  getCancellationReasons,
  cancelAppointment,
  getAvailableDates,
  transferAppointment,
  checkAvailability,
  addToWaitingQueue,
  getFacilitys,
  scheduleAppointment,
} from "@/api/appointmentService";
import { Specialty, Facility, DetailedPerson, Message} from "@/types/types"; 
import AppointmentCalendar from "@/components/schedule-components/AppointmentCalendar";
import Image from "next/image";

const animationStyles = `
  @keyframes slideInFromRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideInFromLeft {
    from { transform: translateX(-100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  .message-bot { animation: slideInFromLeft 0.3s ease-out; }
  .message-user { animation: slideInFromRight 0.3s ease-out; }
`;

export default function Schedule() {
  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [dataNas, setDataNas] = useState("");
  const [telefone, setTelefone] = useState("");
  const [facilityId, setFacilityId] = useState(""); 
  const [facilitys, setFacilitys] = useState<Facility[]>([]);
  const [currentStep, setCurrentStep] = useState("welcome");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingFacilitys, setLoadingFacilitys] = useState(false); 
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [selectedSpecialtyTypeId, setSelectedSpecialtyTypeId] = useState<string>("");
  const [cadastroExistente, setCadastroExistente] = useState(false);
  const [detailedPersonData, setDetailedPersonData] = useState<DetailedPerson | null>(null);
  const [patientId, setPatientId] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [appointmentData, setAppointmentData] = useState<any>(null);
  const [cancellationReasons, setCancellationReasons] = useState<any[]>([]);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string>("");
  const [availableDates, setAvailableDates] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedShift, setSelectedShift] = useState<string>("");
  const [newAppointmentId, setNewAppointmentId] = useState<string>("");
  const [isRescheduling, setIsRescheduling] = useState<boolean>(false);

  useEffect(() => {
    const fetchFacilitys = async () => {
      try {
        setLoadingFacilitys(true);
        const data = await getFacilitys();
        const activeFacilitys = data.filter(
          (facility: Facility) => !facility.disabled
        );
        setFacilitys(activeFacilitys);
      } catch (err) {
        console.error("Erro ao carregar clínicas:", err);
        addMessage("bot", "Não foi possível carregar nossas clínicas. Por favor, tente novamente mais tarde.");
      } finally {
        setLoadingFacilitys(false);
      }
    };

    fetchFacilitys();

    const pedirCpf = () => {
      addMessage("bot", "Por favor, digite seu CPF (apenas números):", undefined, {
        type: "hidden",
        placeholder: "Digite seu CPF (apenas números)",
        maxLength: 11,
        value: cpf,
        onChange: setCpf,
        validator: (value) => {
          const valido = /^\d{11}$/.test(value);
          if (!valido) {
            setTimeout(() => {
              addMessage("bot", "CPF inválido. Tente novamente.");
              pedirCpf(); 
            }, 1000);
          }
          return valido;
        },
        errorMessage: "O CPF deve conter 11 dígitos numéricos."
      });
    };

    setTimeout(() => {
      addMessage("bot", "👋 Olá! Bem-vindo(a) ao sistema de agendamento das clínicas escola da Unichristus.");
    }, 500);
    
    setTimeout(() => {
      addMessage("bot", "Para começarmos seu agendamento, precisamos verificar seus dados.");
    }, 1500);
    
    setTimeout(() => {
     pedirCpf();
    }, 2500);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Add message to chat
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
    setMessages(prevMessages => [
      ...prevMessages, 
      { 
        id: Date.now() + Math.random(), 
        text, 
        sender, 
        options, 
        input,
        timestamp: new Date() 
      }
    ]);
  };

  const formatDateForDisplay = (dateString: string) => {
    if (!dateString) return "";

    if (dateString.includes("/")) return dateString;

    const parts = dateString.split("-");
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateString;
  };

  // Handle CPF submission
  const handleCpfSubmit = async (submittedCpf: string) => {
    setError("");
    
    // Validate CPF (11 digits)
    const cpfRegex = /^\d{11}$/;
    if (!cpfRegex.test(submittedCpf)) {
      addMessage("bot", "Por favor, insira um CPF válido com 11 dígitos.");
      return;
    }
    
    addMessage("user", submittedCpf);
    addMessage("bot", "Verificando seu CPF...");
    setWaitingForResponse(true);
    
    try {
      setCpf(submittedCpf);
      setLoading(true);
      const exists = await checkCpfExists(submittedCpf);
      setCadastroExistente(exists);
      
      if (exists) {
        try {
          const detailedPersonData: DetailedPerson = await getDetailedPersonByCpf(submittedCpf);
          setDetailedPersonData(detailedPersonData);
          
          // Save patient ID (not person ID)
          if (detailedPersonData.patient && detailedPersonData.patient.id) {
            console.log("Armazenando ID do patient:", detailedPersonData.patient.id);
            setPatientId(detailedPersonData.patient.id);
          } else {
            console.error("ID do patient não encontrado na resposta:", detailedPersonData);
            addMessage("bot", "Não foi possível identificar seus dados de paciente. Por favor, tente novamente.");
            return;
          }
          
          // Extract person data
          setNome(detailedPersonData.person.fullname || "");
          setDataNas(detailedPersonData.person.birthDate || "");
          
          // Extract phone number (if available)
          if (detailedPersonData.contact && detailedPersonData.contact.length > 0) {
            // Get first phone from contact list
            const phoneContact = detailedPersonData.contact.find(c => 
              c.contactType.description.toLowerCase() === "telefone"
            );
            
            setTelefone(phoneContact ? phoneContact.value : "");
          }
          
          // Show personalized welcome message
          addMessage("bot", `✅ CPF encontrado! Bem-vindo(a), ${detailedPersonData.person.fullname}!`);
          
          // Go directly to facility selection
          setTimeout(() => {
            promptForFacilitys();
          }, 1000);
          
        } catch (personError) {
          console.error("Erro ao buscar dados detalhados da pessoa:", personError);
          
          // Fallback to previous method if new endpoint fails
          try {
            const personData = await getPersonByCpf(submittedCpf);
            setNome(personData.name || "");
            setDataNas(personData.birthDate || "");
            setTelefone(personData.phoneNumber || "");
            
            addMessage("bot", "Não foi possível recuperar todos os seus dados. Por favor, entre em contato com o suporte.");
            return;
          } catch (fallbackError) {
            console.error("Erro também no fallback:", fallbackError);
            addMessage("bot", "Não foi possível recuperar seus dados. Por favor, tente novamente mais tarde.");
            promptForPersonalData(true); // true indicates new registration
          }
        }
      } else {
        // If CPF does not exist, request data for new registration
        addMessage("bot", "CPF não encontrado. Vamos criar um novo cadastro para você!");
        promptForPersonalData(true); // true indicates new registration
      }
    } catch (err) {
      console.error("Erro ao verificar CPF:", err);
      addMessage("bot", "Ocorreu um erro ao verificar o CPF. Por favor, tente novamente.");
    } finally {
      setLoading(false);
      setWaitingForResponse(false);
    }
  };

  // Request personal data
  const promptForPersonalData = (isNewRegistration = false) => {
    setCurrentStep("personalData");
    
    if (isNewRegistration) {
      addMessage("bot", "Para criarmos seu cadastro, preciso de algumas informações.");
    }
    
    // Request name
    setTimeout(() => {
      addMessage("bot", "Qual é o seu nome completo?", undefined, {
        type: "hidden",
        placeholder: "Digite seu nome completo",
        value: nome,
        onChange: setNome,
        validator: (value) => value.trim().length > 0,
        errorMessage: "Por favor, digite seu nome completo."
      });
    }, 1000);
  };

  // Process name submission
  const handleNameSubmit = (submittedName: string) => {
    if (!submittedName.trim()) {
      addMessage("bot", "Por favor, digite seu nome completo.");
      return;
    }
    
    addMessage("user", submittedName);
    setNome(submittedName);

    const pedirDataNascimento = () => {
      addMessage("bot", "Qual é a sua data de nascimento?", undefined, {
        type: "date",
        placeholder: "DD/MM/AAAA",
        value: dataNas,
        onChange: setDataNas,
        validator: (value) => {
          if (!value) {
            setTimeout(() => {
              addMessage("bot", "Por favor, informe uma data de nascimento válida.");
              pedirDataNascimento(); // reapresenta o campo
            }, 500);
            return false;
          }
    
          const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
          const match = value.match(regex);
          if (!match) {
            setTimeout(() => {
              addMessage("bot", "Formato inválido. Use DD/MM/AAAA.");
              pedirDataNascimento();
            }, 500);
            return false;
          }
    
          const dia = parseInt(match[1], 10);
          const mes = parseInt(match[2], 10) - 1;
          const ano = parseInt(match[3], 10);
          const data = new Date(ano, mes, dia);
    
          const hoje = new Date();
          const dataValida = (
            data.getDate() === dia &&
            data.getMonth() === mes &&
            data.getFullYear() === ano &&
            data <= hoje
          );
    
          if (!dataValida) {
            setTimeout(() => {
              addMessage("bot", "Data inválida. Tente novamente.");
              pedirDataNascimento();
            }, 500);
          }
    
          return dataValida;
        },
        errorMessage: "Digite uma data válida.",
      });
    };
    
    // Request birth date
    setTimeout(() => {
      pedirDataNascimento();
    }, 1000);
  };

  // Process birth date submission
  const handleDateSubmit = (submittedDate: string) => {
    if (!submittedDate) {
      addMessage("bot", "Por favor, informe uma data de nascimento válida.");
      return;
    }
    
    addMessage("user", formatDateForDisplay(submittedDate));
    setDataNas(submittedDate);
    
    // Request phone
    setTimeout(() => {
      addMessage("bot", "Qual é o seu número de telefone?", undefined, {
        type: "tel",
        placeholder: "Digite seu telefone",
        value: telefone,
        onChange: setTelefone,
        validator: (value) => value.trim().length > 0,
        errorMessage: "Por favor, digite um número de telefone válido."
      });
    }, 1000);
  };

  // Process phone submission and send data to API
  const handlePhoneSubmit = async (submittedPhone: string) => {
    if (!submittedPhone.trim()) {
      addMessage("bot", "Por favor, digite um número de telefone válido.");
      return;
    }
    
    addMessage("user", submittedPhone);
    setTelefone(submittedPhone);
    setWaitingForResponse(true);
    
    // If new registration, create patient
    if (!cadastroExistente) {
      try {
        addMessage("bot", "Criando seu cadastro...");
        setLoading(true);
        
        // Ensure date is in YYYY-MM-DD format
        let formattedDate = dataNas;
        if (dataNas.includes('/')) {
          const parts = dataNas.split('/');
          formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
        }

        const patientData = {
          cpf: cpf,
          fullname: nome,
          birthdate: formattedDate,
          contact: submittedPhone,
        };
        
        // Call API to create patient
        const result = await createResumedPatient(patientData);
        console.log("Resposta da API após criar paciente:", result);
        
        // Check response structure and save patient ID
        if (result) {
          // Check different possibilities where ID might be in the response
          if (result.patient && result.patient.id) {
            setPatientId(result.patient.id);
            console.log("ID do patient encontrado em result.patient.id:", result.patient.id);
          } else if (result.id) {
            setPatientId(result.id);
            console.log("ID do patient encontrado diretamente:", result.id);
          } else {
            // Log full structure for debugging
            console.error("Estrutura da resposta não contém ID esperado:", JSON.stringify(result));
            addMessage("bot", "Não foi possível identificar seus dados na resposta.");
            return;
          }
          
          addMessage("bot", "✅ Cadastro realizado com sucesso!");
        } else {
          addMessage("bot", "Resposta vazia da API ao criar paciente.");
          return;
        }
        
      } catch (err: any) {
        console.error("Erro ao criar cadastro:", err);
        addMessage("bot", `Ocorreu um erro ao criar seu cadastro: ${err.message || "Erro desconhecido"}`);
        return;
      } finally {
        setLoading(false);
        setWaitingForResponse(false);
      }
    }
    
    // Data summary
    setTimeout(() => {
      addMessage("bot", `Perfeito! Confirmando seus dados:\n- Nome: ${nome}\n- Data de nascimento: ${formatDateForDisplay(dataNas)}\n- Telefone: ${submittedPhone}`);
      promptForFacilitys();
    }, 1000);
  };

  // Request facilities
  const promptForFacilitys = () => {
    setCurrentStep("facility"); // Changed from "specialty"
    
    setTimeout(() => {
      if (loadingFacilitys) {
        addMessage("bot", "Carregando nossas clínicas...");
        return;
      }
      
      if (facilitys.length === 0) {
        addMessage("bot", "Desculpe, não conseguimos carregar as clínicas disponíveis.");
        return;
      }
      
      const uniqueDescriptions = new Set();
      
      // Filter facilities to remove duplicates
      const uniqueFacilitys = facilitys.filter(facility => {
        const description = facility.name;
          if (uniqueDescriptions.has(description)) {
          return false;
        }
        uniqueDescriptions.add(description);
        return true;
      });
      
      addMessage("bot", "Agora, selecione a clínica escola para darmos prosseguimento ao agendamento:", 
        uniqueFacilitys.map(facility => ({
          value: facility.id,
          label: `${facility.name}`
        }))
      );
    }, 1500);
  };

const handleFacilitySelection = async (facility: string) => {
  setFacilityId(facility);
  
  // Find selected facility
  const selectedFacility = facilitys.find(f => f.id === facility);
  const selectedSpecialty = specialties.find(s => s.id === selectedSpecialtyTypeId);
  if (!selectedFacility) {
    addMessage("bot", "Clínica não encontrada. Por favor, tente novamente.");
    return;
  }
  
  const facilityName = selectedFacility.name;
  addMessage("user", facilityName);
  addMessage("bot", `Verificando disponibilidade para ${facilityName}...`);
  setWaitingForResponse(true);

  try {
    setLoading(true);
    
    if (!patientId) {
      console.error("ID do patient não encontrado:", patientId);
      addMessage("bot", "ID do paciente não encontrado. Por favor, tente novamente.");
      return;
    }

    // Get current date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
    console.log("Data atual para verificação:", today);
    console.log("Verificando agendamento para patient.id:", patientId);

    // Check if appointment already exists for this facility
    console.log("Iniciando verificação de agendamento existente...");
    console.log(`Parâmetros: patientId=${patientId}, facilityId=${facility}, specialtyId=${selectedSpecialty} date=${today},`);
    
    const appointmentCheck = await checkExistingAppointment(
      patientId,
      facility, 
      today, // Example appointmentType (First appointment) // Example additional parameter (replace with actual value)
    );
    
    console.log("Resultado da verificação de agendamento:", appointmentCheck);
    
    if (selectedFacility.specialty && selectedFacility.specialty.length > 0) {
      const activeSpecialties = selectedFacility.specialty.filter(
        specialty => !specialty.disabled
      );
      
      setSpecialties(activeSpecialties);
      
      if (appointmentCheck.hasAppointment) {
        setAppointmentData(appointmentCheck.appointmentData);
        // If appointment exists
        setTimeout(() => {
          addMessage("bot", `Verificamos que você já possui um agendamento para ${facilityName}. Gostaria de informações sobre este agendamento?`, [
            { value: "sim", label: "Sim, quero informações" },
            { value: "nada", label: "Não, " }
          ]);
        }, 1000);
      } else {
        // Show specialty selection
        setTimeout(() => {
          addMessage("bot", `Selecione a especialidade para ${facilityName}:`, 
            activeSpecialties.map(specialty => ({
              value: specialty.specialtyType.id,
              label: `${specialty.specialtyType.description}`
            }))
          );
        }, 1000);
      }
    } else {
      if (appointmentCheck.hasAppointment) {
        setAppointmentData(appointmentCheck.appointmentData);
        // If appointment exists
        setTimeout(() => {
          addMessage("bot", `Verificamos que você já possui um agendamento para ${facilityName}. Gostaria de informações sobre este agendamento?`, [
            { value: "sim", label: "Sim, quero informações" },
            { value: "nao", label: "Não, quero agendar outra clínica" }
          ]);
        }, 1000);
      } else {
        // No specialties available
        setTimeout(() => {
          addMessage("bot", `Não encontramos vagas disponíveis para ${facilityName}.`);
          
         setTimeout(() => {
          addMessage("bot", "Deseja entrar na fila de espera?", [
            { value: "sim", label: "Sim, quero entrar na fila de espera" },
            { value: "não", label: "Não, quero escolher outra especialidade" }
          ]);
        }, 1500);
        }, 1000);
      }
    }
  } catch (err) {
    console.error("Erro ao verificar agendamento:", err);
    addMessage("bot", "Ocorreu um erro ao verificar disponibilidade. Por favor, tente novamente.");
  } finally {
    setLoading(false);
    setWaitingForResponse(false);
  }
};

// Função para tratar a seleção de especialidade
const handleSpecialtySelection = async (specialtyTypeId: string) => {
  // Encontrar a especialidade selecionada
  const selectedSpecialtyType = specialties.find(s => s.specialtyType.id === specialtyTypeId);
  if (!selectedSpecialtyType) {
    addMessage("bot", "Especialidade não encontrada. Por favor, tente novamente.");
    return;
  }
  
  // Armazenar o ID da especialidade selecionada
  setSelectedSpecialtyTypeId(specialtyTypeId);
  addMessage("user", selectedSpecialtyType.specialtyType.description);
  addMessage("bot", `Você selecionou a especialidade: ${selectedSpecialtyType.specialtyType.description}`);
  setTimeout(() => {
    addMessage("bot", "Deseja verificar a disponibilidade para esta especialidade?", [
      { value: "sim", label: "Sim, quero agendar" },
      { value: "nao", label: "Não, quero escolher outra especialidade" }
    ]);
  }, 1000);
  console.log("ID da especialidade selecionada:", specialtyTypeId);
};

// Função para lidar com a seleção de data
const handleDateSelection = (selectedDate: string) => {
  setSelectedDate(selectedDate);
  addMessage("user", formatDateForDisplay(selectedDate)); 
  const shiftsForDate = availableDates.filter((appointment: any) => 
    appointment.date === selectedDate
  );
    const shiftOptions = shiftsForDate.map((appointment: any) => {
    let shiftLabel = "";
    switch(appointment.shift) {
      case "MOR":
        shiftLabel = "Manhã";
        break;
      case "AFT":
        shiftLabel = "Tarde";
        break;
      case "EVE":
        shiftLabel = "Noite";
        break;
      default:
        shiftLabel = appointment.shift;
    }
    
    return {
      value: JSON.stringify({
        shift: appointment.shift,
        appointmentId: appointment.appointmentId
      }),
      label: shiftLabel
    };
  });
  
  setTimeout(() => {
    addMessage("bot", "Agora, selecione o turno desejado:", shiftOptions);
  }, 1000);
};

// Função para lidar com a seleção de turno
const handleShiftSelection = (shiftData: string) => {
  const parsedData = JSON.parse(shiftData);
  const { shift, appointmentId } = parsedData;
  
  setSelectedShift(shift);
  setNewAppointmentId(appointmentId);
  
  let shiftLabel = "";
  switch(shift) {
    case "MOR":
      shiftLabel = "Manhã";
      break;
    case "AFT":
      shiftLabel = "Tarde";
      break;
    case "EVE":
      shiftLabel = "Noite";
      break;
    default:
      shiftLabel = shift;
  }
  
  addMessage("user", shiftLabel);
  
  setTimeout(() => {
    addMessage("bot", `Você selecionou a data ${formatDateForDisplay(selectedDate)} no turno da ${shiftLabel}.`);
    
    setTimeout(() => {
      addMessage("bot", "Deseja confirmar a remarcação para esta data e turno?", 
      [
        { value: "confirm_reschedule", label: "Sim, confirmar remarcação" },
        { value: "cancel_reschedule", label: "Não, cancelar" }
      ]);
    }, 1000);
  }, 1000);
};

const handleNewAppointmentDateSelection = (selectedDate: string) => {
  setSelectedDate(selectedDate);
  setTimeout(() => {
    addMessage("bot", `Você selecionou a data: ${formatDateForDisplay(selectedDate)}, Agora, escolha o turno.`);
  }, 1500);
};

const handleNewAppointmentShiftSelection = (shiftData: string) => {
  console.log("🎯 Dados recebidos do calendário:", shiftData);
  
  const parsedData = JSON.parse(shiftData);
  const { shift, appointmentId, date } = parsedData;
  
  // Atualizar todos os estados
  setSelectedDate(date);
  setSelectedShift(shift);
  setNewAppointmentId(appointmentId);
  
  let shiftLabel = "";
  switch(shift) {
    case "MOR":
      shiftLabel = "Manhã";
      break;
    case "AFT":
      shiftLabel = "Tarde";
      break;
    case "EVE":
      shiftLabel = "Noite";
      break;
    default:
      shiftLabel = shift;
  }
  
  addMessage("user", shiftLabel);
  
  setTimeout(() => {
    console.log("🎯 Data que será exibida:", date);
    addMessage("bot", `Você selecionou a data ${formatDateForDisplay(date)} no turno da ${shiftLabel}.`);
    
    setTimeout(() => {
      addMessage("bot", "Deseja confirmar o agendamento para esta data e turno?", [
        { value: "confirm_appointment", label: "Sim, confirmar agendamento" },
        { value: "cancel_appointment", label: "Não, cancelar" }
      ]);
    }, 1000);
  }, 1000);
};

const handleConfirmAppointment = async () => {
  addMessage("user", "Sim, confirmar agendamento");
  addMessage("bot", "Processando seu agendamento...");
  setWaitingForResponse(true);
  
  try {
    const appointmentData = {
      facilityId: facilityId,
      specialtyId: selectedSpecialtyTypeId,
      patientId: patientId,
      date: selectedDate,
      shift: selectedShift,
      appointmentId: newAppointmentId,
      appointmentType: "FIR" 
    };
    
    console.log("Dados para agendamento:", appointmentData);
    
    const result = await scheduleAppointment(newAppointmentId, patientId);
    
    console.log("Resultado do agendamento:", result);

    addMessage("bot", "✅ Seu agendamento foi realizado com sucesso!");
        
    setTimeout(() => {
    const shiftLabel = 
      selectedShift === "MOR" ? "Manhã" : 
      selectedShift === "AFT" ? "Tarde" : 
      selectedShift === "EVE" ? "Noite" : selectedShift;

      addMessage("bot", `Você agendou uma consulta para ${formatDateForDisplay(selectedDate)} no turno da ${shiftLabel}`);
      
      setTimeout(() => {
        addMessage("bot", "Obrigado por utilizar nosso sistema de agendamento! Tenha um ótimo dia! 😊", 
        );
      }, 1500);
    }, 1500);
    
  } catch (error) {
    console.error("Erro ao confirmar agendamento:", error);
    addMessage("bot", "Ocorreu um erro ao confirmar seu agendamento. Por favor, tente novamente mais tarde.");
    
    setTimeout(() => {
      addMessage("bot", "Deseja tentar novamente?", [
        { value: "sim_confirmar", label: "Sim, tentar novamente" },
        { value: "nao_confirmar", label: "Não, cancelar agendamento" }
      ]);
    }, 1500);
  } finally {
    setWaitingForResponse(false);
  }
};

// Função para confirmar a remarcação
const handleConfirmReschedule = async () => {
  addMessage("user", "Sim, confirmar remarcação");
  addMessage("bot", "Processando sua remarcação...");
  setWaitingForResponse(true);
  
  try {
    await transferAppointment(selectedAppointmentId, newAppointmentId);
    
    addMessage("bot", "✅ Seu agendamento foi remarcado com sucesso!");
    
    setTimeout(() => {
      addMessage("bot", "Deseja agendar uma nova consulta em outra clínica?", [
        { value: "sim", label: "Sim, quero agendar outra" },
        { value: "nao", label: "Não, obrigado" }
      ]);
    }, 1500);
    
  } catch (error) {
    console.error("Erro ao remarcar agendamento:", error);
    addMessage("bot", "Ocorreu um erro ao remarcar seu agendamento. Por favor, tente novamente mais tarde.");
    
    setTimeout(() => {
      addMessage("bot", "Deseja tentar novamente?", [
        { value: "sim_remarcar", label: "Sim, tentar novamente" },
        { value: "nao_remarcar", label: "Não, cancelar remarcação" }
      ]);
    }, 1500);
  } finally {
    setWaitingForResponse(false);
    setIsRescheduling(false);
  }
};

// Função para lidar com resposta sim/não
const handleYesNoResponse = async (response: string, context: string) => {
  addMessage("user", response === "sim" ? "Sim" : "Não");
  
  if (context === "existing_appointment") {
    if (response === "sim") {
      if (appointmentData && appointmentData.length > 0) {
        const appointment = appointmentData[0];
        // Formatando a data do agendamento (YYYY-MM-DD para DD/MM/YYYY)
        const appointmentDate = appointment.date ? formatDateForDisplay(appointment.date) : "Data não disponível";
        const facilityName = appointment.facility?.name || "Clínica não especificada";
        const doctorName = appointment.professionalPerson.fullname || "Médico não encontrado";
        const specialtyName = appointment.specialty.specialtyType.description || "Especialidade não encontrada";

        
        setTimeout(() => {
          addMessage("bot", `📋 Informações do seu agendamento:\n\n` +
            `Clínica: ${facilityName}\n` +
            `Data: ${appointmentDate}\n` +
            `Médico: ${doctorName}\n` +
            `Especialidade ${specialtyName}`);
          
          setTimeout(() => {
            addMessage("bot", "O que você deseja fazer com este agendamento?", [
              { value: "cancelar", label: "Cancelar agendamento" },
              { value: "remarcar", label: "Remarcar agendamento" },
              { value: "nada", label: "Não fazer nada" }
            ]);
          }, 1500);
        }, 1500);
      } else {
        addMessage("bot", "Desculpe, não consegui recuperar os detalhes do seu agendamento.");
        
        setTimeout(() => {
          addMessage("bot", "Deseja agendar outra especialidade?", [
            { value: "sim", label: "Sim, quero agendar outra" },
            { value: "nao", label: "Não, obrigado" }
          ]);
        }, 1000);
      }
    } else {
      setTimeout(() => {
        promptForFacilitys();
      }, 1000);
    }
  } else if (context === "another_appointment") {
    if (response === "sim") {
      setTimeout(() => {
        promptForFacilitys();
      }, 1000);
    } else {
      setTimeout(() => {
        addMessage("bot", "Obrigado por utilizar nosso sistema de agendamento! Tenha um ótimo dia! 😊");
      }, 1000);
    }
  } else if (context === "appointment_action") {
    // Ações para cancelar ou remarcar o agendamento
    if (response === "cancelar") {

      if (appointmentData && appointmentData.length > 0) {
        setSelectedAppointmentId(appointmentData[0].id)
        //Buscar motivos
        addMessage("bot", "Buscando motivos de cancelamento...");
        setWaitingForResponse(true);

        try {
          const reasons = await getCancellationReasons();
          setCancellationReasons(reasons);

          setTimeout(() => {
            addMessage("bot", "Por favor, selecione o motivo do cancelamento:",
              reasons.map((reasons: any) => ({
                value: reasons.id,
                label: reasons.description
              }))
            );
          }, 1000);
        } catch (error) {
          console.error("Erro ao buscar os motivos de cancelamento:", error);
          addMessage("bot", "Não foi possível carregar os motivos de cancelamento. Tente novamente mais tarde.");
        } finally {
          setWaitingForResponse(false);
        }
      } else {
        addMessage("bot", "Não foi possível identificar o agendamento para cancelamento");
    } 
} else if (response === "remarcar") {
  if (appointmentData && appointmentData.length > 0) {
    setSelectedAppointmentId(appointmentData[0].id);
    setIsRescheduling(true);
    
    addMessage("bot", "Buscando datas disponíveis para remarcação...");
    setWaitingForResponse(true);
    
    try {
      const datesData = await getAvailableDates();
      
      const firstAppointments = datesData.filter((appointment: any) => 
        appointment.appointmentType === "FIR"
      );
        
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const currentAppointmentDate = new Date(appointmentData[0].date);
      currentAppointmentDate.setHours(0, 0, 0, 0);

      const validDates = firstAppointments.filter((appointment: any) => {
        const appointmentDate = new Date(appointment.date);
        appointmentDate.setHours(0, 0, 0, 0);
        return appointmentDate >= today &&
        appointmentDate.getTime() !== currentAppointmentDate.getTime();
      })

      setAvailableDates(validDates);
      
      if (validDates.length === 0) {
        addMessage("bot", "Não encontramos datas disponíveis para remarcação após a data do seu agendamento atual.");
        
       setTimeout(() => {
        addMessage("bot", "Obrigado por utilizar nosso sistema de agendamento! Tenha um ótimo dia! 😊");
      }, 1000);
      } else {
        const dateMap = new Map();
        validDates.forEach((appointment: any) => {
          if (!dateMap.has(appointment.date)) {
            dateMap.set(appointment.date, []);
          }
          dateMap.get(appointment.date).push(appointment);
        });
        
        const dateOptions = Array.from(dateMap.keys()).map(date => ({
          value: date,
          label: formatDateForDisplay(date)
        }));
        
         setTimeout(() => {
                  addMessage("bot", "Selecione uma DATA e um TURNO disponíveis para o agendamento:");
                  setMessages(prevMessages => [
                ...prevMessages,
                {
                  id: Date.now() + Math.random(),
                  text: "",
                  sender: "bot",
                  component: (
                    <AppointmentCalendar
                      availableDates={dateOptions.map(option => option.value)}
                      availableSlots={validDates} 
                      onSelectDate={handleNewAppointmentDateSelection}
                      onSelectShift={handleNewAppointmentShiftSelection}
                      className="mt-2"
                    />
                  ),
                  timestamp: new Date()
                }
              ]);
            }, 1000);
      }
    } catch (error) {
      console.error("Erro ao buscar datas disponíveis:", error);
      addMessage("bot", "Não foi possível carregar as datas disponíveis. Tente novamente mais tarde.");
      
      setTimeout(() => {
        addMessage("bot", "Deseja tentar novamente?", [
          { value: "sim_remarcar", label: "Sim, tentar novamente" },
          { value: "nao_remarcar", label: "Não, cancelar remarcação" }
        ]);
      }, 1500);
    } finally {
      setWaitingForResponse(false);
    }
  } else {
    addMessage("bot", "Não foi possível identificar o agendamento para remarcação.");
  }
    } else {
      setTimeout(() => {
        addMessage("bot", "Obrigado por utilizar nosso sistema de agendamento! Tenha um ótimo dia! 😊");
      }, 1000);
    }
  }
};

const handleCancellationReasonSelected = async (reasonId: string) => {
  const selectedReason = cancellationReasons.find(reason => reason.id === reasonId);
  if (!selectedReason) {
    addMessage("bot", "Motivo de cancelamento não encontrado. Tente novamente.");
    return;
  }
  
  addMessage("user", selectedReason.description);
  addMessage("bot", "Processando seu cancelamento...");
  setWaitingForResponse(true);
  
  try {
    const cancellationData = {
      cancellationReason: {
        id: reasonId
      }
      // Opcionalmente, adicione patientNotes se quiser permitir que o usuário adicione observações
    };
    
    await cancelAppointment(selectedAppointmentId, cancellationData);
    
    addMessage("bot", "✅ Seu agendamento foi cancelado com sucesso!");
    
     setTimeout(() => {
        addMessage("bot", "Obrigado por utilizar nosso sistema de agendamento! Tenha um ótimo dia! 😊", 
        );
      }, 1500);
  } catch (error) {
    console.error("Erro ao cancelar agendamento:", error);
    addMessage("bot", "Ocorreu um erro ao cancelar seu agendamento. Por favor, tente novamente mais tarde.");
  } finally {
    setWaitingForResponse(false);
  }
};
          
  
// Função para lidar com o envio de mensagens do usuário
const handleSendMessage = () => {
    if (!userInput.trim()) return;
    
    const lastBotMessage = [...messages].reverse().find(msg => msg.sender === "bot");
    
    if (lastBotMessage?.input) {
      // Se a última mensagem do bot tinha um campo de input
      const inputField = lastBotMessage.input;
      const isValid = inputField.validator ? inputField.validator(userInput) : true;
      
      if (!isValid) {
        addMessage("bot", inputField.errorMessage || "Por favor, insira um valor válido.");
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

const handleOptionClick = (value: string) => {
  const lastBotMessage = [...messages].reverse().find(msg => msg.sender === "bot");
  if (lastBotMessage?.options?.some(opt => opt.value === value)) {
    if (facilitys.some(f => f.id === value)) {
      handleFacilitySelection(value);
    } 
    else if (specialties.some(s => s.specialtyType.id === value)) {
      handleSpecialtySelection(value);
    }
    else if (value === "sim" || value === "nao") {
      if (lastBotMessage.text.includes("já possui um agendamento")) {
        const context = "existing_appointment";
        handleYesNoResponse(value, context);
      } 
      else if (lastBotMessage.text.includes("Deseja verificar a disponibilidade")) {
        handleAgendamentoClick(value);
      }
      else if (lastBotMessage.text.includes("Deseja entrar na fila de espera?")) {
        handleWaitingQueueResponse(value);
      }
      else if (lastBotMessage.text.includes("tentar novamente")) {
        if (value === "sim") {
          handleAgendamentoClick("sim");
        } else {
          promptForFacilitys();
        }
      }
      else {
        const context = "another_appointment";
        handleYesNoResponse(value, context);
      }
    }
    else if (value === "prosseguir" || value === "voltar") {
      // Lidar com a resposta para prosseguir com agendamento ou voltar
      if (value === "prosseguir") {
        addMessage("user", "Sim, quero prosseguir");
        // Aqui você pode continuar com o fluxo de agendamento
        addMessage("bot", "Ótimo! Vamos continuar com seu agendamento.");
        // Implementar próxima etapa do agendamento...
      } else {
        addMessage("user", "Não, voltar para especialidades");
        setTimeout(() => {
          promptForFacilitys();
        }, 1000);
      }
    }
    else if (value === "cancelar" || value === "remarcar" || value === "nada") {
      handleYesNoResponse(value, "appointment_action");
    } 
    else if (cancellationReasons.some(reason => reason.id === value)) {
      handleCancellationReasonSelected(value);
    }
    // Verifica se é uma data disponível para agendamento novo
    else if (availableDates.some((appointment: any) => appointment.date === value)) {
      if (isRescheduling) {
        handleDateSelection(value);
      } else {
        handleNewAppointmentDateSelection(value);
      }
    }
    // Verifica se é uma seleção de turno (no formato JSON stringified)
    else if (value.includes("shift") && value.includes("appointmentId")) {
      if (isRescheduling) {
        handleShiftSelection(value);
      } else {
        handleNewAppointmentShiftSelection(value);
      }
    }
    // Confirmar novo agendamento
    else if (value === "confirm_appointment") {
      handleConfirmAppointment();
    }
    // Cancelar novo agendamento
    else if (value === "cancel_appointment") {
      addMessage("user", "Não, cancelar");
      addMessage("bot", "Agendamento cancelado.");
      
      setTimeout(() => {
        addMessage("bot", "Obrigado por utilizar nosso sistema de agendamento! Tenha um ótimo dia! 😊", );
      }, 1000);
    }
    // Confirmar remarcação
    else if (value === "confirm_reschedule") {
      handleConfirmReschedule();
    }
    // Cancelar remarcação
    else if (value === "cancel_reschedule") {
      addMessage("user", "Não, cancelar");
      addMessage("bot", "Remarcação cancelada.");
      
      setTimeout(() => {
        addMessage("bot", "Deseja agendar uma nova consulta em outra especialidade?", [
          { value: "sim", label: "Sim, quero agendar outra" },
          { value: "nao", label: "Não, obrigado" }
        ]);
      }, 1000);
      
      setIsRescheduling(false);
    }
    else if (value === "sim_remarcar") {
      addMessage("user", "Sim, tentar novamente");
      handleYesNoResponse("remarcar", "appointment_action");
    }
    else if (value === "sim_confirmar") {
      addMessage("user", "Sim, tentar novamente");
      handleConfirmAppointment();
    }
    else if (value === "nao_confirmar") {
      addMessage("user", "Não, cancelar agendamento");
      addMessage("bot", "Agendamento cancelado.");
      
      setTimeout(() => {
        addMessage("bot", "Deseja agendar uma consulta em outra especialidade?", [
          { value: "sim", label: "Sim, quero agendar outra" },
          { value: "nao", label: "Não, obrigado" }
        ]);
      }, 1000);
    }
    else if (value === "nao_remarcar") {
      addMessage("user", "Não, cancelar remarcação");
      addMessage("bot", "Remarcação cancelada.");
      
      setTimeout(() => {
        addMessage("bot", "Deseja agendar uma nova consulta em outra especialidade?", [
          { value: "sim", label: "Sim, quero agendar outra" },
          { value: "nao", label: "Não, obrigado" }
        ]);
      }, 1000);
      
      setIsRescheduling(false);
    }
  }
};

const handleAgendamentoClick = async (response: string) => {
  addMessage("user", response === "sim" ? "Sim, quero agendar" : "Não, quero escolher outra especialidade");
  
  if (response === "sim") {
    const selectedFacility = facilitys.find(f => f.id === facilityId);
    const facilityName = selectedFacility ? selectedFacility.name : "especialidade selecionada";
    
    // Verificar disponibilidade de agendamentos
    addMessage("bot", `Verificando disponibilidade para ${facilityName}...`);
    setWaitingForResponse(true);
    
    try {
      const today = new Date().toISOString().split('T')[0];
      const availabilityData = await checkAvailability(facilityId, selectedSpecialtyTypeId, "FIR", today);
      
      // Verificar se a resposta contém conteúdo na propriedade 'content'
      const hasAvailableSlots = availabilityData && 
                               ((Array.isArray(availabilityData) && availabilityData.length > 0) || 
                                (availabilityData.content && availabilityData.content.length > 0));
      
      if (hasAvailableSlots) {
        const slots = Array.isArray(availabilityData) ? availabilityData : availabilityData.content;
        setAvailableDates(slots);

        const dateMap = new Map();
      slots.forEach((slot: any) => {
        if(!dateMap.has(slot.date)) {
          dateMap.set(slot.date, []);
        }
        dateMap.get(slot.date).push(slot);
      });

      const dateOptions = Array.from(dateMap.keys()).map(date => ({
        value: date,
        label: formatDateForDisplay(date)
      }));
        
        setTimeout(() => {
          addMessage("bot", "Selecione uma DATA e um TURNO disponíveis para o agendamento:");
          
          // Adicionar uma nova mensagem especial com o calendário embutido
         setMessages(prevMessages => [
        ...prevMessages,
        {
          id: Date.now() + Math.random(),
          text: "",
          sender: "bot",
          component: (
            <AppointmentCalendar
              availableDates={dateOptions.map(option => option.value)}
              availableSlots={slots} 
              onSelectDate={handleNewAppointmentDateSelection}
              onSelectShift={handleNewAppointmentShiftSelection}
              className="mt-2"
            />
          ),
          timestamp: new Date()
        }
      ]);
    }, 1000);
      } else {
        addMessage("bot", "❌ Infelizmente não encontramos vagas disponíveis para esta especialidade no momento.");
        
        setTimeout(() => {
          addMessage("bot", "Deseja entrar na fila de espera?", [
            { value: "sim", label: "Sim, quero entrar na fila de espera" },
            { value: "não", label: "Não, quero escolher outra especialidade" }
          ]);
        }, 1500);
      }
    } catch (err) {
      console.error("Erro ao verificar disponibilidade:", err);
      addMessage("bot", "Ocorreu um erro ao verificar a disponibilidade. Por favor, tente novamente.");
      
      setTimeout(() => {
        addMessage("bot", "Deseja tentar novamente?", [
          { value: "sim", label: "Sim, tentar novamente" },
          { value: "nao", label: "Não, obrigado" }
        ]);
      }, 2000);
    } finally {
      setWaitingForResponse(false);
    }
  } else {
    setTimeout(() => {
      promptForFacilitys();
    }, 1000);
  }
};

const handleWaitingQueueResponse = async (response: string) => {
  addMessage("user", response === "sim" ? "Sim, quero entrar na fila de espera" : "Não, quero escolher outra especialidade");
  
  if (response === "sim") {
    addMessage("bot", "Processando sua solicitação para entrar na fila de espera...");
    setWaitingForResponse(true);
    
    try {
      if (!patientId || !facilitys) {
        throw new Error("Dados incompletos para entrada na fila de espera");
      }
      
      const selectedFacility= facilitys.find(f => f.id === facilityId);

      if (!selectedFacility) {
        throw new Error("Especialidade não encontrada");
      }

      const queueData = {
        facility: {
          id: selectedFacility?.id
        },
        patient: {
          id: patientId
        },
        queueReason: "FUL", 
        appointmentType: "FIR" 
      };
    
      console.log("Dados completos para adicionar à fila:", queueData);
      const result = await addToWaitingQueue(queueData);
      console.log("Resposta da API ao adicionar à fila:", result);
      addMessage("bot", "✅ Você foi adicionado com sucesso à fila de espera!");
      setTimeout(() => {
        addMessage("bot", `Entraremos em contato assim que houver disponibilidade para a especialidade de ${selectedFacility.name}.`);
         setTimeout(() => {
          addMessage("bot", "Obrigado por utilizar nosso sistema de agendamento! Tenha um ótimo dia! 😊", );
        }, 1000);
      }, 1500);
      
    } catch (error) {
      console.error("Erro ao adicionar à fila de espera:", error);
      addMessage("bot", "Não foi possível adicionar você à fila de espera. Por favor, tente novamente mais tarde.");
      
      setTimeout(() => {
        addMessage("bot", "Deseja tentar novamente?", [
          { value: "sim_fila", label: "Sim, tentar novamente" },
          { value: "nao_fila", label: "Não, voltar para especialidades" }
        ]);
      }, 1500);
    } finally {
      setWaitingForResponse(false);
    }
  } else {
    // Voltar para seleção de especialidade
    setTimeout(() => {
      promptForFacilitys();
    }, 1000);
  }
};

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
            <div className="bg-gradient-to-r from-[#075E54] to-[#057064] text-white p-4 rounded-t-lg flex items-center justify-between shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <Image 
                      src={logoUnichristus}
                      alt="Logo Unichristus"
                      className="w-6 h-7"
                      width={32}
                      height={32}
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                </div>
                <div>
                  <h1 className="font-bold text-lg">Clínicas Unichristus</h1>
                  <p className="text-xs opacity-90 flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                    Online - Agendamento 24h
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs opacity-75">{new Date().toLocaleDateString('pt-BR')}</div>
                <div className="text-sm font-medium">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
              </div>
            </div>
            
            <div 
              className="flex-1 p-4 overflow-y-auto bg-[#E5DDD5]"
              style={{ 
                backgroundImage: "url('https://web.whatsapp.com/img/bg-chat-tile-light_04fcacde539c58cca6745483d4858c52.png')",
                backgroundRepeat: "repeat" 
              }}
            >
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`mb-4 flex ${message.sender === "bot" ? "justify-start" : "justify-end"}`}
                >
                  <div 
                    className={`p-3 rounded-lg max-w-[80%] relative ${
                      message.sender === "bot" 
                        ? "bg-white text-black" 
                        : "bg-[#DCF8C6] text-black"
                    }`}
                  >
                    {message.text && <p className="whitespace-pre-line">{message.text}</p>}
      
                    {message.component && (
                      <div className="mt-2">
                        {message.component}
                      </div>
                    )}
                                  
                    {message.options && (
                      <div className="mt-3 flex flex-col gap-2">
                        {message.options.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => handleOptionClick(option.value)}
                            className="bg-gradient-to-r from-[#075E54] to-[#057064] text-white py-2 px-4 rounded-full text-sm hover:from-[#128C7E] hover:to-[#25D366] transform
                            transition-all duration-500 hover:scale-105 shadow-md flex items-center justify-center space-x-2"
                          >
                            <span>{option.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                      
                    {message.input && message.sender === "bot" && (
                      <div className="mt-2">
                        <input
                          type={message.input.type}
                          placeholder={message.input.placeholder}
                          value={message.input.value}
                          onChange={(e) => message.input?.onChange(e.target.value)}
                          maxLength={message.input.maxLength}
                          className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring focus:ring-blue-300"
                        />
                      </div>
                    )}
                    
                    <span className="text-[10px] text-gray-500 absolute bottom-1 right-2">
                      {formatTimestamp(message.timestamp)}
                    </span>
                  </div>
                </div>
              ))}
              
              {waitingForResponse && (
                <div className="flex justify-start mb-4">
                  <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-400">
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-[#075E54] rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-[#128C7E] rounded-full animate-bounce delay-75"></div>
                        <div className="w-2 h-2 bg-[#25D366] rounded-full animate-bounce delay-150"></div>
                      </div>
                      <span className="text-sm text-gray-600">Processando sua solicitação...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
           <div className="bg-gradient-to-r from-[#F0F2F5] to-[#E8EAED] p-4 rounded-b-lg flex items-center space-x-3 shadow-inner">
            <div className="flex-1 relative">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Digite sua mensagem aqui..."
                className="w-full py-3 px-4 pr-12 rounded-full border-2 border-gray-300 focus:outline-none focus:border-[#075E54] focus:ring-2 focus:ring-[#075E54]/20 transition-all duration-300 shadow-sm"
              />
              {userInput.trim() && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
                  {userInput.length}
                </div>
              )}
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!userInput.trim() || waitingForResponse}
              className="bg-gradient-to-r from-[#075E54] to-[#128C7E] text-white p-3 rounded-full disabled:from-gray-400 disabled:to-gray-500 transition-all duration-300 transform hover:scale-110 shadow-lg"
            >
              <FaPaperPlane className="text-sm" />
            </button>
          </div>
            <div className="p-2 bg-gray-100 text-xs text-center text-gray-500">
              Seus dados estão protegidos conforme a Lei Geral de Proteção de Dados (LGPD).
            </div>
          </div>
        </div>
      </div>
    </>
  );
}