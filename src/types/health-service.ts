// types/health-service.ts
export interface SpecialtyType {
  id: string;
    description: string;
}

export interface Specialty {
  id: number;
  description: string;
  specialtyType: SpecialtyType;
  minimumAge: number;
  maximumAge: number;
  hasWaitingList: boolean;
  usesEletronicPrescription: boolean;
  disable: boolean;
}

export interface Appointment {
  id: string;
  specialtyId: number;
  date: string;
  available: boolean;
  shift?: 'morning' | 'afternoon' | 'evening';
}

export interface Patient {
  id: string;
  cpf: string;
  name: string;
}

