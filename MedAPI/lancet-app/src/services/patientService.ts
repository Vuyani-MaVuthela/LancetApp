import { PatientProfile } from "../interfaces/patient/PatientProfile";
import { PatientDto } from "../interfaces/patient/PatientDto";

const API_BASE_URL = "/api/patients";

export const getPatients = async (): Promise<PatientDto[]> => {
  try {
    const resp = await fetch(`${API_BASE_URL}`, {
      method: "GET",
    });

    if (!resp.ok) {
      const errorData = await resp.json();
      console.error("Error response:", errorData);
      throw new Error(`Error code: ${resp.status} message: ${errorData}`);
    }

    const data = await resp.json();
    return data;
  } catch (e) {
    console.error("Failed to fetch patients:", e);
    throw e;
  }
};

export const getPatientById = async (
  patientId: string
): Promise<PatientDto> => {
  try {
    const resp = await fetch(`${API_BASE_URL}/${patientId}`, {
      method: "GET",
    });

    if (!resp.ok) {
      throw new Error(`Error code: ${resp.status} message: ${resp.statusText}`);
    }

    const data = await resp.json();
    return data;
  } catch (e) {
    console.error("Failed to get patient:", e);
    throw e;
  }
};

export const createPatient = async (
  patient: PatientProfile
): Promise<PatientProfile> => {
  try {
    const resp = await fetch(`${API_BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patient),
    });

    if (!resp.ok) {
      const errorData = await resp.json();
      console.error("Error response:", errorData);
      throw new Error(`Error code: ${resp.status} message: ${errorData}`);
    }

    return resp.json();
  } catch (e) {
    console.error("Failed to create patient:", e);
    throw e;
  }
};

export const updatePatient = async (
  patientId: string,
  patient: PatientProfile
): Promise<void> => {
  try {
    patient.patient.patientAddress = {
      street: "",
      state: "",
      city: "",
      PostalCode: "",
    };

    patient.patient.patientId = patientId;

    const resp = await fetch(`${API_BASE_URL}/${patientId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patient),
    });

    if (!resp.ok) {
      const errorData = await resp.json();
      console.error("Error response:", errorData);
      throw new Error(`Error code: ${resp.status} message: ${errorData}`);
    }
  } catch (e) {
    console.error("Failed to update patient:", e);
    throw e;
  }
};
