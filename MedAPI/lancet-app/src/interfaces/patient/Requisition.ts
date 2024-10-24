import { Test } from "./Test";

export interface Requisition {
  requisitionId: string;
  dateSubmitted: string;
  referringPhysician: string;
  tests: Test[];
}
