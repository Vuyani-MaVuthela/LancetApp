import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Main from "./layouts/Main";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Patients from "./pages/Patients";
import CreatePatient from "./pages/CreatePatient";
import {
  createPatient,
  getPatientById,
  updatePatient,
} from "./services/patientService";
import EditPatient from "./pages/EditPatient";
import PatientLoader from "./components/PatientLoader";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Main />}>
        <Route index element={<Home />} />
        <Route path="/patients" element={<Patients />} />
        <Route
          path="/add-patient"
          element={<CreatePatient createPatientSubmit={createPatient} />}
        />
        <Route
          path="/edit-patient/:id"
          element={
            <EditPatient
              getPatientById={getPatientById}
              updatePatientSubmit={updatePatient}
            />
          }
          loader={PatientLoader}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
