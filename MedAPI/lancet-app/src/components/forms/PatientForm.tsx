import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { uploadAvatar } from "../../services/avatarService";

const PatientForm = ({ initialData, onSubmit, buttonText }: any) => {
  const [formData, setFormData] = useState({
    patient: {
      patientId: uuidv4(),
      patientName: "",
      patientAddress: {
        street: "",
        city: "",
        state: "",
        postalCode: "",
      },
    },
    requisitions: [
      {
        requisitionId: uuidv4(),
        dateSubmitted: new Date().toISOString().slice(0, 16),
        referringPhysician: "",
        tests: [
          {
            testId: uuidv4(),
            testName: "",
            comment: "",
            normalRange: 0,
            testResult: 0,
          },
        ],
      },
    ],
    avatarFilePath: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData((prevData) => ({
        ...prevData,
        ...initialData,
      }));
    }
  }, [initialData]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    const nameParts = name.split(/[\.\[\]]+/).filter(Boolean); // access nested properties

    setFormData((prevData) => {
      let updatedData = { ...prevData };

      // Traverse the object structure using the nameParts array
      let target = updatedData;
      for (let i = 0; i < nameParts.length - 1; i++) {
        if (!target[nameParts[i]]) {
          target[nameParts[i]] = {};
        }
        target = target[nameParts[i]];
      }

      // Update the final property with the new value
      target[nameParts[nameParts.length - 1]] = value;

      return updatedData;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure the date is in the correct format
    const requisitions = formData.requisitions.map((req) => ({
      ...req,
      dateSubmitted: new Date(req.dateSubmitted).toISOString(), // Converts to the correct format
    }));

    const updatedData = { ...formData, requisitions };
    onSubmit(updatedData);
    console.log("updatedData :>> ", updatedData);
  };

  const handleAvatarChange = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    const patientId = formData.patient.patientId;

    const avatarData = new FormData();
    avatarData.append("avatar", file);

    const data = await uploadAvatar(patientId, file);

    console.log("data :>> ", data);

    setFormData((prevData) => ({
      ...prevData,
      avatarFilePath: data.filePath,
    }));
    console.log("formData :>> ", formData);
  };

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={handleSubmit}>
            <h2 className="text-3xl text-center font-semibold mb-6">
              {buttonText}
            </h2>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Patient Name
              </label>
              <input
                type="text"
                id="title"
                name="patient.patientName"
                className="border rounded w-full py-2 px-3 mb-2"
                required
                value={formData.patient.patientName}
                onChange={handleChange}
              />
            </div>

            {buttonText !== "Update Patient name" && (
              <div>
                <h3 className="text-2xl mb-5">Address</h3>

                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    street
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="patient.patientAddress.street"
                    className="border rounded w-full py-2 px-3 mb-2"
                    value={formData.patient.patientAddress?.street}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    city
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="patient.patientAddress.city"
                    className="border rounded w-full py-2 px-3 mb-2"
                    value={formData.patient.patientAddress?.city}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    state
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="patient.patientAddress.state"
                    className="border rounded w-full py-2 px-3 mb-2"
                    value={formData.patient.patientAddress?.state}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    postal Code
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="patient.patientAddress.postalCode"
                    className="border rounded w-full py-2 px-3 mb-2"
                    value={formData.patient.patientAddress?.postalCode}
                    onChange={handleChange}
                  />
                </div>

                <h3 className="text-2xl mb-5">requisitions</h3>

                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Date Submitted
                  </label>
                  <input
                    type="datetime-local"
                    id="dateSubmitted"
                    name="requisitions[0].dateSubmitted"
                    className="border rounded w-full py-2 px-3 mb-2"
                    value={formData.requisitions[0]?.dateSubmitted}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    referring Physician
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="requisitions[0].referringPhysician"
                    className="border rounded w-full py-2 px-3 mb-2"
                    value={formData.requisitions[0]?.referringPhysician}
                    onChange={handleChange}
                  />
                </div>

                <h3 className="text-2xl mb-5">tests</h3>

                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    test Name
                  </label>
                  <input
                    type="text"
                    id="title"
                    name=".requisitions[0].tests[0].testName"
                    className="border rounded w-full py-2 px-3 mb-2"
                    value={formData.requisitions[0]?.tests[0]?.testName}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    comment
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="requisitions[0].tests[0].comment"
                    className="border rounded w-full py-2 px-3 mb-2"
                    value={formData.requisitions[0]?.tests[0]?.comment}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    normal Range
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="requisitions[0].tests[0].normalRange"
                    className="border rounded w-full py-2 px-3 mb-2"
                    value={formData.requisitions[0]?.tests[0]?.normalRange}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    test Result
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="requisitions[0].tests[0].testResult"
                    className="border rounded w-full py-2 px-3 mb-2"
                    value={formData.requisitions[0]?.tests[0]?.testResult}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    avatar File Path
                  </label>
                  <input
                    type="file"
                    id="avatar"
                    name="avatarFilePath"
                    className="border rounded w-full py-2 px-3 mb-2"
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                </div>
              </div>
            )}

            <div>
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                {buttonText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PatientForm;
