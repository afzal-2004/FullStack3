import "./App.css";
import { Todoitems } from "./Components/Todoitems";
function App() {
  return (
    <>
      <h1 className=" text-[20px]  sm:text-[25px] font-semibold text-white m-3 text-center">
        ToDo App{" "}
      </h1>
      <Todoitems />
    </>
  );
}

export default App;
