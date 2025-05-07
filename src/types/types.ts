/**
 * Core domain types for the clinic scheduling system
 */

// Base interfaces


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
  
  interface PatientData {
    patient: Patient;
    requisition: Requisition[];
  }
export interface BaseEntity {
  id: string;
  disabled?: boolean;
}

export interface Person extends BaseEntity {
  fullname: string;
  cpf: string;
  birthDate: string;
}

// Specialty related interfaces
export interface SpecialtyType extends BaseEntity {
  description: string;
}

export interface Specialty extends BaseEntity {
  id: string;
  professional: any;
  facility: any;
  description: string;
  specialtyType: SpecialtyType;
  minimumAge: number;
  maximumAge: number;
  hasWaitingList: boolean;
  usesElectronicPrescription: boolean;
}

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

// Contact interfaces
export type ContactType = 'EMAIL' | 'TELEFONE' | 'CELULAR' | 'WHATSAPP';

export interface ContactTypeEntity extends BaseEntity {
  description: string;
}

export interface Contact extends BaseEntity {
  value: string;
  contactType: ContactTypeEntity;
}

// Patient related interfaces
export interface Patient extends BaseEntity {
  person: string;
  preferredName: string | null;
  usePreferredName: boolean;
}

export interface DetailedPerson {
  person: Person;
  patient: Patient;
  contact: Contact[];
}

// Appointment related interfaces
export interface Facility extends BaseEntity {
  name: string;
  code: string;
}

export interface ProfessionalPerson extends BaseEntity {
  fullname: string;
}

export interface AppointmentSpecialty extends BaseEntity {
  description: string;
}

export interface AppointmentData {
  id: string;
  date: string;
  shift: 'MOR' | 'AFT' | 'EVE';
  doctorName?: string;
  specialty?: AppointmentSpecialty;
  facility: Facility;
  professionalPerson: ProfessionalPerson;
}

export interface AvailableAppointment {
  date: string;
  shift: 'MOR' | 'AFT' | 'EVE';
  appointmentId: string;
  appointmentType: 'FIR' | 'RET';
}

export interface CancellationReason extends BaseEntity {
  description: string;
}

export interface CancellationData {
  cancellationReason: {
    id: string;
  };
  patientNotes?: string;
}

// Chat related interfaces
export interface ChatOption {
  value: string;
  label: string;
}

export interface ChatInputField {
  type: string;
  placeholder: string;
  maxLength?: number;
  value: string;
  onChange: (value: string) => void;
  validator?: (value: string) => boolean;
  errorMessage?: string;
}

export interface Message {
  id: number;
  text: string;
  sender: "bot" | "user";
  options?: ChatOption[];
  input?: ChatInputField;
  timestamp: Date;
}

// API Response types
export interface ExistingAppointmentResponse {
  hasAppointment: boolean;
  appointmentData?: AppointmentData[];
}