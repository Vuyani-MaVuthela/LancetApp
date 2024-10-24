export interface Patient {
  patientId: string;
  patientName: string;
  patientAddress: PatientAddress;
}

interface PatientAddress {
  street: string;
  city: string;
  state: string;
  PostalCode: string;
}
