// types.ts

export interface Test {
  id: string;
  description: string;
  abbreviation: string;
  grouping?: string; // Adicionando o campo grouping que pode ser opcional
}

export interface RequisitionTest {
  id: string;
  test: Test;
  testStatus: string;
  collectionDate?: string | null;
}

export interface Requisition {
  id: string;
  date: string;
  doctorName: string;
  requisitionTests: RequisitionTest[];
}

// Interface para agrupar os testes
export interface GroupedTests {
  [key: string]: RequisitionTest[];
}
interface RG {
    id: string;
    number: string;
    issuingAgency: string;
    issuingState: string;
    issueDate: string;
  }
  
  interface Patient {
    id: string;
    fullname: string;
    cpf: string;
    rg: RG;
    birthDate: string;
    motherName: string;
    fatherName: string;
    gender: string;
    maritalStatus: string;
  }
  
  
  
  
  interface PatientData {
    patient: Patient;
    requisition: Requisition[];
  }