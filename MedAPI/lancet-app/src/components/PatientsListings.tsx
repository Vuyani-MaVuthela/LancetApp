import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import PatientListing from "./PatientListing";
import { getPatients } from "../services/patientService";
import { PatientDto } from "./../interfaces/patient/PatientDto";
import { Link } from "react-router-dom";

const PatientsListings = () => {
  const [patients, setPatients] = useState<PatientDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await getPatients();
        setPatients(data);
      } catch (e) {
        console.log("Error fetching data :>> ", e);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          Patients
        </h2>
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {patients.map((patient) => (
              <Link to={`/edit-patient/${patient.patientId}`}>
                <PatientListing key={patient.patientId} patient={patient} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PatientsListings;
