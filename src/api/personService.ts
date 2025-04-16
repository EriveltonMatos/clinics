// src/services/personService.ts

// Obtém as URLs base da API a partir das variáveis de ambiente
const CORE_API_BASE_URL = process.env.NEXT_PUBLIC_API_CORE_URL || 'http://130.11.0.35:8080/core-service';
const HEALTH_API_BASE_URL = process.env.NEXT_PUBLIC_API_HEALTH_URL || 'http://130.11.0.35:8080/health-service';

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
 * @param cpf - CPF da pessoa (apenas números, sem formatação)
 * @returns Promise com os dados detalhados da pessoa
 */
export const getDetailedPersonByCpf = async (cpf: string) => {
  try {
    const response = await fetch(`${HEALTH_API_BASE_URL}/persons/cpf/${cpf}`, {
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
 * Verifica se já existe agendamento para o paciente na especialidade e data especificadas
 * @param patientId - ID do paciente
 * @param specialtyId - ID da especialidade
 * @param date - Data do agendamento no formato YYYY-MM-DD
 * @returns Promise que resolve para true se existe agendamento, false caso contrário
 */
export const checkExistingAppointment = async (
  patient: string,
  specialtyId: string,
  date: string
): Promise<boolean> => {
  try {
    const queryParams = new URLSearchParams({
      patient,
      specialtyId,
      initialDate: date
    });
    
    const response = await fetch(
      `${HEALTH_API_BASE_URL}/appointment?${queryParams.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const data = await response.json();
    console.log("Resposta da verificação de agendamento:", data);
    
    // Verifica se a resposta contém elementos (agendamentos)
    if (data && data.content && Array.isArray(data.content)) {
      return data.content.length > 0;
    }
    
    // Se não conseguir determinar, retorna false por segurança
    return false;
  } catch (error) {
    console.error('Erro ao verificar agendamento existente:', error);
    // Em caso de erro, retornar false por segurança
    return false;
  }
};