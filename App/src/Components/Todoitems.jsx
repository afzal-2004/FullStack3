/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { IoAdd } from "react-icons/io5";
import axios from "axios";
import { useState, useEffect } from "react";
export const Todoitems = () => {
  const [Data, setData] = useState([]);
  const [model, setmodel] = useState(false);
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Age, setAge] = useState(null);

  const OpenModel = () => {
    setmodel(true);
  };

  //   USING THIS TO DO I WANT TO  PERFROM CRUD OPERATION ON DATABASE USIG MERN STACK
  //  1.READ OPERATION FROM DATABASE
  useEffect(() => {
    axios
      .get("http://localhost:3000/getData")
      .then((Response) => {
        console.log(Response.data);
        setData(Response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // CREATE OPERATION ON DATABASE
  const SendDataForBackend = (e) => {
    axios
      .post("http://localhost:3000/CreatedTodo", {
        name: Name,
        email: Email,
        age: Age,
      })
      .then((Responce) => {
        console.log(Responce);
      })
      .catch((err) => {
        console.log(err);
      });
    setName("");
    setAge("");
    setEmail("");
  };
  const DeleteOperation = (e) => {
    console.log("Try To Ddelete AnyItem");
  };

  return (
    <>
      <button
        className=" px-3 py-2 bg-green-600  rounded-md flex  items-center m-3"
        onClick={OpenModel}
      >
        <IoAdd /> Add New Item
      </button>

      {Data.map((data, i) => (
        <div key={i}>
          <TodoItem data={data} />
        </div>
      ))}

      {model && (
        <div className=" absolute modelParent   top-[1vh] left-[1vw] min-h-[97vh] max-h-[98vh] min-w-[97vw]  max-w-[98vw] flex  ">
          <div className=" bg-white  m-auto sm:w-[50vw]  w-[95vw] rounded-md p-2">
            <div className=" ">
              <h1 className="text-center text-[20px] sm:text-[25px] font-semibold">
                Add To do items here.
              </h1>
              <div className=" p-3 ">
                <label htmlFor="Name">Name :</label>
                <input
                  type="text"
                  placeholder=" You Name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div
                className=" p-3   
              sm:flex  m-auto "
              >
                <label htmlFor="Email">Email :</label>
                <input
                  type="text"
                  placeholder="xyz@gmail.com"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className=" p-3">
                <label htmlFor="Age">Age :</label>
                <input
                  type="number"
                  placeholder="Ex.18"
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                />
              </div>

              <button
                type="submit"
                className="bg-green-200 px-3 py-2 rounded-md flex  items-center"
                onClick={() => {
                  SendDataForBackend();
                  setmodel(false);
                }}
              >
                <IoAdd />
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const TodoItem = ({ data }) => {
  return (
    <>
      <main className=" bg-white min-w-full p-2  rounded-xl  m-2 sm:m-3">
        <div className="flex sm:flex-col flex-row justify-between">
          <ul className=" flex justify-evenly sm:flex-row flex-col sm:text-[22px] font-semibold text-[15px]">
            <li>Name</li>
            <li>Email</li>
            <li>Age</li>
            <li>Action</li>
          </ul>
          <section>
            <ul className=" flex justify-evenly sm:flex-row flex-col sm:text-[22px] font-semibold text-[15px]  items-center sm:p-3">
              <li>{data.name}</li>
              <li>{data.email}</li>
              <li>{data.age}</li>
              <li>
                <button className="bg-green-300 sm:p-2 rounded-md   p-1 m-1">
                  Update
                </button>
                <button className="bg-red-500 sm:p-2 p-1 rounded-md ">
                  Delete
                </button>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </>
  );
};
