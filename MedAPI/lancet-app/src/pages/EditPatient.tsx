import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import PatientForm from "../components/forms/PatientForm";
import { PatientDto } from "../interfaces/patient/PatientDto";

const EditPatient = ({ getPatientById, updatePatientSubmit }: any) => {
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getPatientById(id)
      .then((data: PatientDto) => {
        setInitialData({
          patient: {
            patientId: data.patientId,
            patientName: data.name,
          },
        });
      })
      .catch((error: any) => {
        toast.error(`Error fetching patient: ${error.message}`);
      });
  }, [id, getPatientById]);

  const handleUpdatePatientSubmit = (updatedPatient: PatientDto) => {
    updatePatientSubmit(id, updatedPatient)
      .then(() => {
        toast.success("Patient updated successfully");
        navigate("/patients");
      })
      .catch((error: any) => {
        toast.error(`Error updating patient: ${error.message}`);
      });
  };

  return (
    initialData && (
      <PatientForm
        initialData={initialData}
        onSubmit={handleUpdatePatientSubmit}
        buttonText="Update Patient name"
      />
    )
  );
};

export default EditPatient;
