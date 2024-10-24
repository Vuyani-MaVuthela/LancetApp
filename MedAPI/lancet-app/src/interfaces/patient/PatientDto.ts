import { RequisitionDto } from "./RequisitionDto";

export interface PatientDto {
  patientId: string;
  name: string;
  address: string;
  avatarFilePath: string;

  requisitions: RequisitionDto[];
}
