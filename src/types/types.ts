// types.ts
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
  
  interface Test {
    id: string;
    description: string;
    abbreviation: string;
    specimenCollected: string;
    grouping: string;
    price: number | null;
  }
  
  interface RequisitionTest {
    id: string;
    test: Test;
    testStatus: string;
    collectionLocation: string | null;
    collectionDate: string | null;
  }
  
  interface Requisition {
    id: string;
    date: string;
    doctorName: string;
    notes: string;
    requisitionTests: RequisitionTest[];
  }
  
  interface PatientData {
    patient: Patient;
    requisition: Requisition[];
  }