const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const TodoModel = require("./Models/Todolist");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to a MongoDB database (you need to have MongoDB installed and running)
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// API endpoint to get all tasks
app.get("/api", (req, res) => {
  TodoModel.find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// API endpoint to add a new task
app.post("/api", async (req, res) => {
  const task = req.body.task;

  TodoModel.create({
    task: task,
  });
  task
    .save()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// API endpoint to mark a task as complete
app.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);

  TodoModel.findByIdAndUpdate({ _id: id }, { done: true })

    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// API endpoint to delete a task by ID
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete({ _id: id })
    .then(() => res.json({ message: "Task deleted successfully" }))
    .catch((err) => res.json(err));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
