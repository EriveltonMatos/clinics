const CORE_API_BASE_URL = process.env.NEXT_PUBLIC_API_CORE_URL;
const HEALTH_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Verifica se um CPF existe no sistema
 * @param cpf - CPF a ser verificado (apenas números, sem formatação)
 * @returns Promise que resolve para true se o CPF existe, false caso contrário
 */
export const checkCpfExists = async (cpf: string): Promise<boolean> => {
  try {
    const response = await fetch(`${CORE_API_BASE_URL}/persons/existsByCpf/${cpf}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao verificar CPF:', error);
    throw error;
  }
};

/**
 * Busca os dados detalhados de uma pessoa pelo CPF usando o endpoint de health-service
 * e extrai o ID correto do patient
 * @param cpf - CPF da pessoa (apenas números, sem formatação)
 * @returns Promise com os dados detalhados da pessoa e ID do patient
 */
export const getDetailedPersonByCpf = async (cpf: string) => {
  try {
    console.log(`Buscando dados detalhados para o CPF: ${cpf}`);
    const response = await fetch(`${HEALTH_API_BASE_URL}/patient/cpf/${cpf}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const data = await response.json();
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


/**
 * Busca os dados de uma pessoa pelo CPF
 * @param cpf - CPF da pessoa (apenas números, sem formatação)
 * @returns Promise com os dados da pessoa
 */
export const getPersonByCpf = async (cpf: string) => {
  try {
    const response = await fetch(`${CORE_API_BASE_URL}/persons/byCpf/${cpf}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar dados da pessoa:', error);
    throw error;
  }
};

/**
 * Busca todas as especialidades disponíveis
 * @returns Promise com a lista de especialidades
 */
export const getSpecialties = async () => {
    try {
      const response = await fetch(`${HEALTH_API_BASE_URL}/specialty`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar especialidades:', error);
      throw error;
    }
};

/**
 * Cria um novo cadastro de paciente de forma resumida
 * @param patientData - Dados do paciente a serem cadastrados
 * @returns Promise com a resposta da criação
 */
export const createResumedPatient = async (patientData: { 
  cpf: string, 
  fullname: string, 
  birthdate: string, 
  contact: string 
}) => {
  const url = `${HEALTH_API_BASE_URL}/patient/resumed`;
  console.log('Enviando requisição para:', url);
  console.log('Dados do paciente:', patientData);
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(patientData),
    });

    console.log('Status da resposta:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Erro ${response.status}: ${errorText}`);
      throw new Error(`Erro na requisição: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Resposta do servidor:', data);
    return data;
  } catch (error) {
    console.error('Erro ao criar paciente:', error);
    throw error;
  }
};


/**
 * Verifica se já existe agendamento ATIVO para o paciente na especialidade e data especificada ou futura
 * @param patientId - ID do paciente (patient.id, não person.id)
 * @param specialtyId - ID da especialidade
 * @param date - Data inicial para verificar agendamentos no formato YYYY-MM-DD
 * @returns Promise que resolve com informações sobre agendamentos ativos, incluindo o facilityId
 */
export const checkExistingAppointment = async (
  patientId: string,
  specialtyType: string,
  date: string,
): Promise<any> => {
  try {
    console.log('Verificando agendamentos existentes com os parâmetros:');
    console.log('- ID do Patient:', patientId);
    console.log('- ID da Especialidade:', specialtyType);
    console.log('- Data Inicial:', date);
    
    const queryParams = new URLSearchParams({
      patient: patientId,
      specialtyType: specialtyType,
      initialDate: date
    });

    const url = `${HEALTH_API_BASE_URL}/appointment?${queryParams.toString()}`;
    console.log('URL da requisição:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`Erro na requisição: ${response.status}`);
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const data = await response.json();
    console.log("Resposta completa da verificação de agendamento:", JSON.stringify(data, null, 2));
    
    // Extrair o facilityId do primeiro agendamento, se existir
    let facilityId = null;
    if (data && data.content && Array.isArray(data.content) && data.content.length > 0) {
      facilityId = data.content[0].facility?.id || null;
      console.log("Facility ID encontrado:", facilityId);
    }
    
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
          specialty: appointment.specialty?.description || 'N/A',
          status: appointment.status,
          facilityId: appointment.facility?.id || 'N/A'
        });
      });
      
      return {
        hasAppointment: true,
        appointmentData: activeAppointments,
        facilityId: facilityId
      };
    }
    
    return {
      hasAppointment: false,
      appointmentData: null,
      facilityId: facilityId
    };
  } catch (error) {
    console.error('Erro ao verificar agendamento existente:', error);
    // Em caso de erro, retornar objeto vazio por segurança
    return {
      hasAppointment: false,
      appointmentData: null,
      facilityId: null
    };
  }
};

/**
 * Busca os motivos de cancelamento
 * @returns promise com a lista de motivos de cancelamento
 */
export const getCancellationReasons = async () => {
  try {
    const response = await fetch(`${HEALTH_API_BASE_URL}/cancellationReason`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const data = await response.json();
    return data.filter((reason: any) => !reason.disable);
  } catch (error) {
    console.error('Erro ao buscar motivos de cancelamento', error);
    throw error;
  }
};

/**
 * Cancela um agendamento
 * @param appointmentId - ID do agendamento a ser cancelado
 * @param cancellationData - Dados do cancelamento (motivo e observações)
 * @returns Promise com a resposta do cancelamento
 */
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
    
    const url = `${HEALTH_API_BASE_URL}/appointment/cancellation/${appointmentId}`;
    console.log('URL da requisição:', url);
    
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(cancellationData),
    });

    console.log('Status da resposta:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Erro ${response.status}: ${errorText}`);
      throw new Error(`Erro na requisição: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log('Resposta do servidor após cancelamento:', result);
    return result;
  } catch (error) {
    console.error('Erro ao cancelar agendamento:', error);
    throw error;
  }
};

/**
 * Busca datas disponíveis para remarcar um agendamento
 * @returns Promise com a lista de datas disponíveis para remarcação
 */
export const getAvailableDates = async () => {
  try {
    console.log('Buscando datas disponíveis para remarcação');
    
    const url = `${HEALTH_API_BASE_URL}/appointment/dates-available`;
    console.log('URL da requisição:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    console.log('Status da resposta:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Erro ${response.status}: ${errorText}`);
      throw new Error(`Erro na requisição: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log('Datas disponíveis:', result);
    return result;
  } catch (error) {
    console.error('Erro ao buscar datas disponíveis:', error);
    throw error;
  }
};

/**
 * Transfere um agendamento para uma nova data
 * @param currentAppointmentId - ID do agendamento atual
 * @param newAppointmentId - ID do novo agendamento
 * @returns Promise com a resposta da transferência
 */
export const transferAppointment = async (
  currentAppointmentId: string,
  newAppointmentId: string
) => {
  try {
    console.log(`Transferindo agendamento de ${currentAppointmentId} para ${newAppointmentId}`);
    
    const url = `${HEALTH_API_BASE_URL}/appointment/transfer-appointment`;
    console.log('URL da requisição:', url);
    
    const transferData = {
      appointmentFrom: {
        id: currentAppointmentId
      },
      appointmentTo: {
        id: newAppointmentId
      }
    };
    
    console.log('Dados da transferência:', transferData);
    
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(transferData),
    });

    console.log('Status da resposta:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Erro ${response.status}: ${errorText}`);
      throw new Error(`Erro na requisição: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log('Resposta do servidor após transferência:', result);
    return result;
  } catch (error) {
    console.error('Erro ao transferir agendamento:', error);
    throw error;
  }
};

/**
 * Verifica disponibilidade de agendamentos para uma especialidade
 * @param specialtyId - ID da especialidade
 * @param date - Data para verificação (formato YYYY-MM-DD)
 * @returns Promise com a lista de agendamentos disponíveis
 */
export const checkAvailability = async (
  specialtyId: string,
  date: string
) => {
  try {
    console.log(`Verificando disponibilidade para especialidade ID: ${specialtyId} na data: ${date}`);
    
    const url = `${HEALTH_API_BASE_URL}/appointment/dates-available?specialty=${specialtyId}&initialDate=${date}`;
    console.log('URL da requisição:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });

    console.log('Status da resposta:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Erro ${response.status}: ${errorText}`);
      throw new Error(`Erro na requisição: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log('Agendamentos disponíveis:', result);
    return result;
  } catch (error) {
    console.error('Erro ao verificar disponibilidade:', error);
    throw error;
  }
}

/**
 * Adiciona um paciente à fila de espera para uma especialidade
 * @param queueData - Dados para adicionar na fila de espera
 * @returns Promise com a resposta da adição à fila
 */
export const addToWaitingQueue = async (queueData: { 
  specialty: { id: string; }; 
  patient: { id: string; }; 
  queueReason: string; 
  appointmentType: string;
  facility: { id: string; } 
}) => {
  try {
    console.log('Adicionando paciente à fila de espera com os dados:', queueData);
    
    const url = `${HEALTH_API_BASE_URL}/appointmentQueue`;
    console.log('URL da requisição:', url);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(queueData),
    });

    console.log('Status da resposta:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Erro ${response.status}: ${errorText}`);
      throw new Error(`Erro na requisição: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log('Resposta do servidor após adicionar à fila:', result);
    return result;
  } catch (error) {
    console.error('Erro ao adicionar paciente à fila de espera:', error);
    throw error;
  }
};