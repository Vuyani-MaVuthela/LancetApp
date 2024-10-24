import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import Navbar from "../components/Navbar";

const Main = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <ToastContainer />
    </>
  );
};

export default Main;
