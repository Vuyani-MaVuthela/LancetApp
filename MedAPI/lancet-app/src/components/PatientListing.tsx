import { PatientDto } from "../interfaces/patient/PatientDto";

const PatientListing = ({ patient }: { patient: PatientDto }) => {
  const formattedImagePath = patient.avatarFilePath
    .replace(/\\/g, "/")
    .replace("..", "");
  console.log("patient.avatarFilePath :>> ", patient.avatarFilePath);
  console.log("formattedPath :>> ", formattedImagePath);
  return (
    <div className="border rounded-lg shadow-md p-6 m-4 bg-white">
      <h3 className="text-xl font-semibold mb-2">{patient.name}</h3>

      <img
        src={`/Avatars/${formattedImagePath.split("/").pop()}`}
        alt={`${patient.name}'s Avatar`}
        className="avatar-image"
        style={{ width: "200px", height: "200px" }}
      />

      <h4 className="text-lg mt-4 mb-2">Requisitions:</h4>
      {patient.requisitions.length > 0 ? (
        patient.requisitions.map((req) => (
          <div key={req.requisitionId} className="mb-4">
            <p>
              <strong>Date Submitted:</strong> {req.dateSubmitted}
            </p>
            <p>
              <strong>Referring Physician:</strong> {req.referringPhysician}
            </p>
            <h5 className="mt-2 font-semibold">Tests:</h5>
            {req.tests.map((test) => (
              <div key={test.testId} className="border-t border-gray-300 pt-2">
                <p>
                  <strong>Test Name:</strong> {test.testName}
                </p>
                <p>
                  <strong>Comment:</strong> {test.comment}
                </p>
                <p>
                  <strong>Normal Range:</strong> {test.normalRange}
                </p>
                <p>
                  <strong>Test Result:</strong> {test.testResult}
                </p>
              </div>
            ))}
          </div>
        ))
      ) : (
        <p>No requisitions found.</p>
      )}
    </div>
  );
};

export default PatientListing;
