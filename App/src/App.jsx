import "./App.css";
import { Todoitems } from "./Components/Todoitems";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <ToastContainer />
      <h1 className=" text-[20px]  sm:text-[25px] font-semibold text-white m-3 text-center">
        ToDo App{" "}
      </h1>
      <Todoitems />
    </>
  );
}

export default App;
