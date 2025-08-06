import { ReactNode } from 'react';
export interface BaseEntity {
  id: string;
  disabled?: boolean;
}

export interface BaseDescriptionEntity extends BaseEntity {
  description: string;
}
export interface Person extends BaseEntity {
  fullname: string;
  cpf: string;
  birthDate: string;
}

export interface Patient extends BaseEntity {
  person: string;
  preferredName: string | null;
  usePreferredName: boolean;
}

export interface ProfessionalPerson extends BaseEntity {
  fullname: string;
}

export interface SpecialtyType extends BaseDescriptionEntity {}

export interface Specialty extends BaseDescriptionEntity {
  name: any; // Considere tipar melhor que 'any'
  specialtyType: SpecialtyType;
  minimumAge: number;
  maximumAge: number;
  hasWaitingList: boolean;
  usesElectronicPrescription: boolean;
}

export interface Facility extends BaseEntity {
  name: string;
  specialty: Specialty[];
}

export type ContactType = 'EMAIL' | 'TELEFONE' | 'CELULAR' | 'WHATSAPP';

export interface ContactTypeEntity extends BaseDescriptionEntity {}

export interface Contact extends BaseEntity {
  value: string;
  contactType: ContactTypeEntity;
}

export interface DetailedPerson {
  person: Person;
  patient: Patient;
  contact: Contact[];
}

export type ShiftType = 'MOR' | 'AFT' | 'EVE';
export type AppointmentType = 'FIR' | 'RET';

export interface AppointmentSpecialty extends BaseDescriptionEntity {}

export interface AppointmentData extends BaseEntity {
  date: string;
  shift: ShiftType;
  doctorName?: string;
  specialty?: AppointmentSpecialty;
  facility: Facility;
  professionalPerson: ProfessionalPerson;
}

export interface AvailableAppointment {
  date: string;
  shift: ShiftType;
  appointmentId: string;
  appointmentType: AppointmentType;
}

export interface CancellationReason extends BaseDescriptionEntity {}

export interface CancellationData {
  cancellationReason: {
    id: string;
  };
  patientNotes?: string;
}
export interface Test extends BaseDescriptionEntity {
  abbreviation: string;
  grouping?: string;
  estimated?: number; // dias estimados
}

export interface RequisitionTest extends BaseEntity {
  test: Test;
  testStatus: string;
  collectionDate?: string | null;
}

export interface Requisition extends BaseEntity {
  date: string;
  doctorName: string;
  requisitionTests: RequisitionTest[];
}

export interface GroupedTests {
  [key: string]: RequisitionTest[];
}
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
  component?: ReactNode;
  timestamp: Date;
}
export interface ExistingAppointmentResponse {
  hasAppointment: boolean;
  appointmentData?: AppointmentData[];
}