import { TestDto } from "./TestDto";

export interface RequisitionDto {
  requisitionId: string;
  dateSubmitted: string;
  referringPhysician: string;
  tests: TestDto[];
}
