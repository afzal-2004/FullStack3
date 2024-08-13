/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { IoAdd } from "react-icons/io5";
import axios from "axios";
import { useState, useEffect } from "react";
export const Todoitems = () => {
  const [update, setupdate] = useState(false);
  const [Data, setData] = useState([]);
  const [model, setmodel] = useState(false);
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Age, setAge] = useState(0);
  const [currentid, setcurrentid] = useState(null);

  const OpenModel = () => {
    setmodel(true);
  };

  //1. CREATE OPERATION ON DATABASE
  const SendDataForBackend = (id, e) => {
    if (update) {
      axios
        .put(`${window.location.origin}/UpdateTodo/${id}`, {
          name: Name,
          email: Email,
          age: Age,
        })
        .then((Response) => {
          console.log(Response);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post(`${window.location.origin}/CreatedTodo`, {
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
    }

    setName("");
    setAge("");
    setEmail("");
  };

  //  2.READ OPERATION FROM DATABASE
  useEffect(() => {
    axios
      .get(`${window.location.origin}/getData`)
      .then((Response) => {
        console.log(Response.data);
        setData(Response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //  3. UPDATE OPERATION IN DATABASE
  const HandelUpdateTodo = (id) => {
    setupdate(true);
    setmodel(true);

    axios
      .get(`${window.location.origin}/users/${id}`)
      .then((response) => {
        console.log("Data is ", response.data);
        setName(response.data.name);
        setEmail(response.data.email);
        setAge(response.data.age);
        setcurrentid(response.data._id);
      })
      .catch((err) => console.log(err));
  };

  //   4. DELETE OPERATION ON DATABASE
  const HandelDeleteTodo = (id) => {
    axios
      .delete(`${window.location.origin}/deleteTodo/` + id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <button
        className=" px-3 py-2 bg-green-600  rounded-md flex  items-center m-3"
        onClick={OpenModel}
      >
        <IoAdd /> Add New Item
      </button>

      {Data.map((data, _id) => (
        <div key={_id}>
          <div className=" bg-white min-w-full p-2  rounded-xl  m-2 sm:m-3">
            <div className="flex sm:flex-col flex-row justify-between">
              <ul className=" flex justify-evenly sm:flex-row flex-col sm:text-[22px] font-semibold text-[15px]">
                <li>Name</li>
                <li>Email</li>
                <li>Age</li>
                <li>Action</li>
              </ul>
              <section>
                <hr className=" hidden sm:flex" />

                <ul className=" flex justify-evenly sm:flex-row flex-col sm:text-[22px] font-semibold text-[15px]  items-center sm:p-1">
                  <li>{data.name}</li>
                  <li>{data.email}</li>
                  <li>{data.age}</li>
                  <li>
                    <button
                      className="bg-green-300 sm:p-1 rounded-md   p-1 m-1"
                      onClick={() => {
                        setcurrentid(data._id);
                        HandelUpdateTodo(data._id);
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 sm:p-1 p-1 rounded-md "
                      onClick={() => {
                        HandelDeleteTodo(data._id);
                        setupdate(false);
                      }}
                    >
                      Delete
                    </button>
                  </li>
                </ul>
              </section>
            </div>
          </div>
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
                  value={Name}
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
                  value={Email}
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
                  value={Age}
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
                  SendDataForBackend(currentid);
                  setmodel(false);
                }}
              >
                <IoAdd />
                {update ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
