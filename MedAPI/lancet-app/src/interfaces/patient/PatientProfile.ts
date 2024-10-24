import { Patient } from "./Patient";
import { Requisition } from "./Requisition";

export interface PatientProfile {
  patient: Patient;
  requisitions: Requisition[];
  avatarFilePath?: string;
}
