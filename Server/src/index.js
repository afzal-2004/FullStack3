import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./Db/index.js";
import { TodoModel } from "./models/todos.module.js";
const Port = process.env.PORT || 3000;
const app = express();

app.use(cors());
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

app.post("/CreatedTodo", async (res, req) => {
  const data = res.body;
  const newdata = new TodoModel(data);
  await newdata.save();
  console.log(data);
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
