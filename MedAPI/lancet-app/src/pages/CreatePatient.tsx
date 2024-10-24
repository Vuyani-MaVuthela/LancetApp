import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PatientProfile } from "../interfaces/patient/PatientProfile";
import PatientForm from "../components/forms/PatientForm";

const CreatePatient = ({ createPatientSubmit }: any) => {
  const navigate = useNavigate();

  const handleCreatePatientSubmit = (newPatient: PatientProfile) => {
    createPatientSubmit(newPatient)
      .then(() => {
        toast.success("Patient added successfully");
        navigate("/patients");
      })
      .catch((error: any) => {
        toast.error(`Error adding patient: ${error.message}`);
      });
  };

  return (
    <PatientForm
      initialData={null}
      onSubmit={handleCreatePatientSubmit}
      buttonText="Add Patient"
    />
  );
};

export default CreatePatient;
