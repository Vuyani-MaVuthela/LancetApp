import { getPatientById } from "../services/patientService";

const PatientLoader = async ({ params }: any) => {
  const data = await getPatientById(`${params.id}`);
  return data;
};

export default PatientLoader;
