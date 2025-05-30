import axios from 'axios';
import { spec } from 'node:test/reporters';

const CORE_API_BASE_URL = process.env.NEXT_PUBLIC_API_CORE_URL;
const HEALTH_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const coreApiClient = axios.create({
  baseURL: CORE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const healthApiClient = axios.create({
  baseURL: HEALTH_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export const checkCpfExists = async (cpf: string): Promise<boolean> => {
  try {
    const response = await coreApiClient.get(`/persons/existsByCpf/${cpf}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao verificar CPF:', error);
    throw error;
  }
};

export const getDetailedPersonByCpf = async (cpf: string) => {
  try {
    console.log(`Buscando dados detalhados para o CPF: ${cpf}`);
    const response = await healthApiClient.get(`/patient/cpf/${cpf}`);
    
    const data = response.data;
    console.log('Resposta completa da API:', JSON.stringify(data, null, 2));
    
    // Log específico para identificar o ID do patient
    if (data.patient && data.patient.id) {
      console.log('ID do Patient encontrado:', data.patient.id);
    } else {
      console.warn('ID do Patient não encontrado na resposta!');
    }
    
    return data;
  } catch (error) {
    console.error('Erro ao buscar dados detalhados da pessoa:', error);
    throw error;
  }
};

export const getPersonByCpf = async (cpf: string) => {
  try {
    const response = await coreApiClient.get(`/persons/byCpf/${cpf}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados da pessoa:', error);
    throw error;
  }
};

export const getFacilitys = async () => {
    try {
      const response = await healthApiClient.get('/facility/available');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar especialidades:', error);
      throw error;
    }
};

export const createResumedPatient = async (patientData: { 
  cpf: string, 
  fullname: string, 
  birthdate: string, 
  contact: string 
}) => {
  const url = '/patient/resumed';
  console.log('Enviando requisição para:', HEALTH_API_BASE_URL + url);
  console.log('Dados do paciente:', patientData);
  
  try {
    const response = await healthApiClient.post(url, patientData);
    
    console.log('Status da resposta:', response.status);
    console.log('Resposta do servidor:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar paciente:', error);
    if (axios.isAxiosError(error) && error.response) {
      console.error(`Erro ${error.response.status}: ${JSON.stringify(error.response.data)}`);
    }
    throw error;
  }
};

/**
 * Busca os motivos de cancelamento
 * @returns promise com a lista de motivos de cancelamento
 */
export const getCancellationReasons = async () => {
  try {
    const response = await healthApiClient.get('/cancellationReason');
    return response.data.filter((reason: any) => !reason.disable);
  } catch (error) {
    console.error('Erro ao buscar motivos de cancelamento', error);
    throw error;
  }
};

export const cancelAppointment = async (
  appointmentId: string,
  cancellationData: {
    cancellationReason: {
      id: string
    },
    patientNotes?: string
  }
) => {
  try {
    console.log(`Cancelando agendamento ID: ${appointmentId}`);
    console.log('Dados do cancelamento:', cancellationData);
    
    const url = `/appointment/cancellation/${appointmentId}`;
    console.log('URL da requisição:', HEALTH_API_BASE_URL + url);
    
    const response = await healthApiClient.put(url, cancellationData);

    console.log('Status da resposta:', response.status);
    console.log('Resposta do servidor após cancelamento:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao cancelar agendamento:', error);
    if (axios.isAxiosError(error) && error.response) {
      console.error(`Erro ${error.response.status}: ${JSON.stringify(error.response.data)}`);
    }
    throw error;
  }
};

export const getAvailableDates = async () => {
  try {
    console.log('Buscando datas disponíveis para remarcação');
    
    const url = '/appointment/dates-available';
    console.log('URL da requisição:', HEALTH_API_BASE_URL + url);
    
    const response = await healthApiClient.get(url);

    console.log('Status da resposta:', response.status);
    console.log('Datas disponíveis:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar datas disponíveis:', error);
    if (axios.isAxiosError(error) && error.response) {
      console.error(`Erro ${error.response.status}: ${JSON.stringify(error.response.data)}`);
    }
    throw error;
  }
};

export const transferAppointment = async (
  currentAppointmentId: string,
  newAppointmentId: string
) => {
  try {
    console.log(`Transferindo agendamento de ${currentAppointmentId} para ${newAppointmentId}`);
    
    const url = '/appointment/transfer-appointment';
    console.log('URL da requisição:', HEALTH_API_BASE_URL + url);
    
    const transferData = {
      appointmentFrom: {
        id: currentAppointmentId
      },
      appointmentTo: {
        id: newAppointmentId
      }
    };
    
    console.log('Dados da transferência:', transferData);
    
    const response = await healthApiClient.put(url, transferData);

    console.log('Status da resposta:', response.status);
    console.log('Resposta do servidor após transferência:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao transferir agendamento:', error);
    if (axios.isAxiosError(error) && error.response) {
      console.error(`Erro ${error.response.status}: ${JSON.stringify(error.response.data)}`);
    }
    throw error;
  }
};

export const checkExistingAppointment = async (
  patientId: string,
  facilityId: string,
  date: string,
): Promise<any> => {
  try {
    console.log('Verificando agendamentos existentes com os parâmetros:');
    console.log('- ID do Patient:', patientId);
    console.log('- ID da clínica:', facilityId);
    console.log('- Data Inicial:', date);
    
    const params = {
      patient: patientId,
      facility: facilityId,
      initialDate: date
    };
    
    console.log('URL da requisição:', `${HEALTH_API_BASE_URL}/appointment com parâmetros:`, params);
    
    const response = await healthApiClient.get('/appointment', { params });

    const data = response.data;
    console.log("Resposta completa da verificação de agendamento:", JSON.stringify(data, null, 2));
    
    const activeAppointments = data && data.content && Array.isArray(data.content) 
      ? data.content.filter((appointment: any) => 
          appointment.status !== 'CAN')
      : [];
    
    const hasActiveAppointments = activeAppointments.length > 0;
    console.log("Existem agendamentos ativos?", hasActiveAppointments);
    
    if (hasActiveAppointments) {
      console.log("Detalhes dos agendamentos ativos encontrados:");
      activeAppointments.forEach((appointment: any, index: number) => {
        console.log(`Agendamento ${index + 1}:`, {
          id: appointment.id,
          date: appointment.date,
          facility: appointment.facility?.name || 'N/A',
          specialty: appointment.specialty?.name || 'N/A',
          appointmentType: appointment.appointmentType,
          status: appointment.status
        });
      });
      
      return {
        hasAppointment: true,
        appointmentData: activeAppointments
      };
    }
    
    return {
      hasAppointment: false,
      appointmentData: null
    };
  } catch (error) {
    console.error('Erro ao verificar agendamento existente:', error);
    // Em caso de erro, retornar objeto vazio por segurança
    return {
      hasAppointment: false,
      appointmentData: null
    };
  }
};

export const checkAvailability = async (
  facilityId: string,
  specialtyId: string,
  appointmentType: string,
  date: string,
) => {
  try {
    console.log(`Verificando disponibilidade para especialidade ID: ${facilityId} na data: ${date}`);
    
    const params = {
      facility: facilityId,
      specialtyType: specialtyId,
      appointmentType: appointmentType,
      initialDate: date
    };
    
    console.log('URL da requisição:', `${HEALTH_API_BASE_URL}/appointment/dates-available com parâmetros:`, params);
    
    const response = await healthApiClient.get('/appointment/dates-available', { params });

    console.log('Status da resposta:', response.status);
    console.log('Agendamentos disponíveis:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao verificar disponibilidade:', error);
    if (axios.isAxiosError(error) && error.response) {
      console.error(`Erro ${error.response.status}: ${JSON.stringify(error.response.data)}`);
    }
    throw error;
  }
};


export const addToWaitingQueue = async (queueData: { 
  facility: { id: string; }; 
  patient: { id: string; }; 
  queueReason: string; 
  appointmentType: string;
}) => {
  try {
    console.log('Adicionando paciente à fila de espera com os dados:', queueData);
    
    const url = '/appointmentQueue';
    console.log('URL da requisição:', HEALTH_API_BASE_URL + url);
    
    const response = await healthApiClient.post(url, queueData);

    console.log('Status da resposta:', response.status);
    console.log('Resposta do servidor após adicionar à fila:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar paciente à fila de espera:', error);
    if (axios.isAxiosError(error) && error.response) {
      console.error(`Erro ${error.response.status}: ${JSON.stringify(error.response.data)}`);
    }
    throw error;
  }
};

export const scheduleAppointment = async (appointmentId: string, patientId: string) => {
  try {
    console.log(`Agendando consulta para o appointmentId: ${appointmentId} e patientId: ${patientId}`);

    const url = `/appointment/schedule/${appointmentId}`;
    console.log('URL da requisição:', HEALTH_API_BASE_URL + url);
    const appointmentData = {
      patient: {
        id: patientId
      }
    };
    console.log('Dados do agendamento:', appointmentData);
    const response = await healthApiClient.put(url, appointmentData);
    console.log('Status da resposta:', response.status);
    console.log('Resposta do servidor após agendamento:', response.data);
    return response.data;
   } catch (error) {
    console.error('Erro ao agendar consultas', error);
    if (axios.isAxiosError(error) && error.response) {
      console.error(`Erro ${error.response.status}: ${JSON.stringify(error.response.data)}`);
    }
    throw error;
   }
  }
