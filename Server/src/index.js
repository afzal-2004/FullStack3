import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./Db/index.js";
import { TodoModel } from "./models/todos.module.js";
const Port = process.env.PORT || 3000;
const app = express();

app.use(
  cors({
    origin: ["https://full-stackclient.vercel.app/"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
dotenv.config({
  path: "./.env",
});

app.get("/getData", function (req, res) {
  TodoModel.find({})
    .then(function (todos) {
      res.json(todos);
      console.log("Todo Data is ", todos);
    })
    .catch(function (err) {
      res.json(err);
    });
});

app.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  TodoModel.findById({ _id: id })
    .then(function (todos) {
      res.json(todos);
      console.log("Todo Data is ", todos);
    })
    .catch(function (err) {
      res.json(err);
    });
});

app.post("/CreatedTodo", async (req, res) => {
  try {
    const data = req.body;
    const newdata = new TodoModel(data);
    await newdata.save();

    console.log(newdata);
  } catch (error) {
    return res.status(401).json({
      error: "Something Went Wrong",
      details: error,
    });
  }
});

app.delete("/deleteTodo/:id", async (req, res) => {
  const id = req.params.id;
  TodoModel.findByIdAndDelete({ _id: id })
    .then((res) => res.json(res))
    .catch((err) => res.json(err));
});

app.put("/UpdateTodo/:id", (req, res) => {
  const id = req.params.id;
  TodoModel.findByIdAndUpdate(
    { _id: id },
    { name: req.body.name, email: req.body.email, age: req.body.age }
  )
    .then((res) => res.json(res))
    .catch((err) => res.json(err));
});
app.get("/", function (req, res) {
  res.send("Hello World");
});

connectDB()
  .then(() => {
    app.listen(Port, () => {
      console.log(`App is Listen on ${Port}`);
    });
  })
  .catch((err) => console.log("Mongo Db connection is Failed !!!", err));
