 "use client";
 import { useState, useEffect, useRef } from "react";
 import footerBackground from "@/assets/footer-background.jpg";
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
 
 
 export default function Schedule() {
   // State definitions - Replaced specialties with facilities
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
 
   // Fetch facilities on component mount
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
 
     // If date is already in DD/MM/YYYY format
     if (dateString.includes("/")) return dateString;
 
     // Convert from YYYY-MM-DD to DD/MM/YYYY for display
     const parts = dateString.split("-");
     if (parts.length === 3) {
       return `${parts[2]}/${parts[1]}/${parts[0]}`;
     }
     return dateString;
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
      addMessage("bot", "Deseja confirmar a remarcação para esta data e turno?", [
        { value: "confirm_reschedule", label: "Sim, confirmar remarcação" },
        { value: "cancel_reschedule", label: "Não, cancelar" }
      ]);
    }, 1000);
  }, 1000);
};

// Função para lidar com a seleção de data no agendamento
const handleNewAppointmentDateSelection = (selectedDate: string) => {
  setSelectedDate(selectedDate);
  addMessage("user", formatDateForDisplay(selectedDate)); 
  
  // Filtrar os turnos disponíveis para a data selecionada
  const shiftsForDate = availableDates.filter((appointment: any) => 
    appointment.date === selectedDate
  );
  
  // Mapear turnos disponíveis para opções de seleção
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

// Função para lidar com a seleção de turno no agendamento
const handleNewAppointmentShiftSelection = (shiftData: string) => {
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
      appointmentType: "FIR" // Primeira consulta
    };
    
    console.log("Dados para agendamento:", appointmentData);
    
    const result = await scheduleAppointment(newAppointmentId, patientId);
    
    console.log("Resultado do agendamento:", result);

    addMessage("bot", "✅ Seu agendamento foi realizado com sucesso!");
        
    setTimeout(() => {
        selectedShift === "MOR" ? "Manhã" : 
        selectedShift === "AFT" ? "Tarde" : 
        selectedShift === "EVE" ? "Noite" : selectedShift;

      addMessage("bot", `Você agendou uma consulta para ${formatDateForDisplay(selectedDate)} no turno da ${selectedShift}`);
      
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
        // Caso não encontre os dados do agendamento no estado
        addMessage("bot", "Desculpe, não consegui recuperar os detalhes do seu agendamento.");
        
        setTimeout(() => {
          addMessage("bot", "Deseja agendar outra especialidade?", [
            { value: "sim", label: "Sim, quero agendar outra" },
            { value: "nao", label: "Não, obrigado" }
          ]);
        }, 1000);
      }
    } else {
      // Voltar para seleção de especialidade
      setTimeout(() => {
        promptForFacilitys();
      }, 1000);
    }
  } else if (context === "another_appointment") {
    if (response === "sim") {
      // Voltar para seleção de clínica
      setTimeout(() => {
        promptForFacilitys();
      }, 1000);
    } else {
      // Encerrar conversa
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
  // Lógica para remarcação
  if (appointmentData && appointmentData.length > 0) {
    setSelectedAppointmentId(appointmentData[0].id);
    setIsRescheduling(true);
    
    addMessage("bot", "Buscando datas disponíveis para remarcação...");
    setWaitingForResponse(true);
    
    try {
      // Buscar datas disponíveis para remarcação
      const datesData = await getAvailableDates();
      
      // Filtrar apenas primeira consulta (FIR)
      const firstAppointments = datesData.filter((appointment: any) => 
        appointment.appointmentType === "FIR"
      );
      
      // Obter a data atual do agendamento
      const currentAppointmentDate = new Date(appointmentData[0].date);
      
      // Filtrar datas que são pelo menos um dia após a data atual do agendamento
      const validDates = firstAppointments.filter((appointment: any) => {
        const appointmentDate = new Date(appointment.date);
        // Calcular a diferença em dias
        const timeDiff = appointmentDate.getTime() - currentAppointmentDate.getTime();
        const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
        return daysDiff >= 1;
      });
      
      setAvailableDates(validDates);
      
      if (validDates.length === 0) {
        addMessage("bot", "Não encontramos datas disponíveis para remarcação após a data do seu agendamento atual.");
        
        setTimeout(() => {
          addMessage("bot", "Deseja agendar uma nova consulta em outra clínica?", [
            { value: "sim", label: "Sim, quero agendar outra" },
            { value: "nao", label: "Não, obrigado" }
          ]);
        }, 1500);
      } else {
        // Agrupar datas disponíveis e seus turnos
        const dateMap = new Map();
        validDates.forEach((appointment: any) => {
          if (!dateMap.has(appointment.date)) {
            dateMap.set(appointment.date, []);
          }
          dateMap.get(appointment.date).push(appointment);
        });
        
        // Converter datas para o formato de exibição
        const dateOptions = Array.from(dateMap.keys()).map(date => ({
          value: date,
          label: formatDateForDisplay(date)
        }));
        
        setTimeout(() => {
          addMessage("bot", "Selecione uma data para remarcação:", dateOptions);
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
      addMessage("bot", "Entendido! Seu agendamento permanece como está.");
      
      setTimeout(() => {
        addMessage("bot", "Deseja agendar uma consulta em outra clínica?", [
          { value: "sim", label: "Sim, quero agendar outra" },
          { value: "nao", label: "Não, obrigado" }
        ]);
      }, 1000);
    }
  }
};

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
    // Verifica se é uma clínica
    if (facilitys.some(f => f.id === value)) {
      handleFacilitySelection(value);
    } 
    else if (specialties.some(s => s.specialtyType.id === value)) {
      handleSpecialtySelection(value);
    }
    // Verifica se é resposta sim/não para agendamento existente
    else if (value === "sim" || value === "nao") {
      if (lastBotMessage.text.includes("já possui um agendamento")) {
        const context = "existing_appointment";
        handleYesNoResponse(value, context);
      } 
      else if (lastBotMessage.text.includes("Deseja verificar a disponibilidade")) {
        // Chamada para verificação de disponibilidade
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
        addMessage("bot", "Deseja agendar uma consulta em outra especialidade?", [
          { value: "sim", label: "Sim, quero agendar outra" },
          { value: "nao", label: "Não, obrigado" }
        ]);
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
    // Lidar com sim/não para tentar remarcar novamente
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
    const selectedSpecialty = specialties.find(s => s.specialtyType.id === selectedSpecialtyTypeId);

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
            addMessage("bot", "Selecione uma data disponível para o agendamento:", dateOptions);
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
          addMessage("bot", "Deseja agendar uma consulta em outra especialidade?", [
            { value: "sim", label: "Sim, quero agendar outra" },
            { value: "nao", label: "Não, obrigado" }
          ]);
        }, 1500);
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
            <div className="bg-[#075E54] text-white p-3 rounded-t-lg flex items-center justify-center">
              <div>
                <h1 className="font-bold">Atendimento Clínica</h1>
                <p className="text-xs">Agendamento de Consultas</p>
              </div>
            </div>
            
            {/* Área de mensagens */}
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
              Seus dados estão protegidos conforme a Lei Geral de Proteção de Dados (LGPD).
            </div>
          </div>
        </div>
      </div>
    </>
  );
}