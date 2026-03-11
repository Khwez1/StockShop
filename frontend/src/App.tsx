import { Outlet } from "react-router";
import Navbar from "./Components/Navbar";
import "react-toastify/ReactToastify.css"
import "./App.css";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./Context/UseAuth";

function App() {
  return (
    <>
    <UserProvider>
      <Navbar />
      <Outlet />
      <ToastContainer />
    </UserProvider>
    </>
  );
}

export default App;
