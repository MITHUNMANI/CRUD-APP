const express = require("express");
const app = express();
const mongoose = require("./database/mongoose");
const List = require("./database/models/list");
const Task = require("./database/models/task");
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
app.use(express.json()); // be - 3000 , fe - 4200
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
/*List Url */

app.get("/lists", (req, res) => {
  List.find({})
    .then((lists) => res.send(lists))
    .catch((error) => console.log(error));
});
app.post("/lists", (req, res) => {
  new List({
      title: req.body.title,
    })
    .save()
    .then((list) => res.send(list))
    .catch((error) => console.log(error));
});
app.get("/lists/:listId", (req, res) => {
  List.find({
      _id: req.params.listId
    })
    .then((lists) => res.send(lists))
    .catch((error) => console.log(error));
});
app.patch("/lists/:listId", (req, res) => {
  List.findByIdAndUpdate({
      _id: req.params.listId
    }, {
      $set: req.body
    })
    .then((lists) => res.send(lists))
    .catch((error) => console.log(error));
});
app.delete('/lists/:listsId', (req, res) => {
  // console.log(req.params);
  const deleteTasks = (list) => {
    // console.log(list);
    Task.deleteMany({
        _listId: list
      })
      .then(() => res.send(deleteTasks))
      .catch((error) => console.log(error));
  };

  List.findByIdAndDelete(req.params.listsId)
    .then((list) => list)
    .catch((error) => console.log(error));
});
/*Task Url */

/* http://localhost:300/lists/:listId/tasks/:taskId */

app.get('/lists/:listId/tasks/', (req, res) => {
  // console.log(req.params.listId);
  Task.find({
      _listId: req.params.listId
    })
    .then((tasks) => res.send(tasks))
    .catch((error) => console.log(error));
})
app.post('/lists/:listId/tasks/', (req, res) => {
  (new Task({
    'title': req.body.title,
    '_listId': req.params.listId
  }))
  .save()
    .then((task) => res.send(task))
    .catch((error) => console.log(error));
})
app.get('/lists/:listId/tasks/:taskId', (req, res) => {
  Task.findOne({
      _listId: req.params.listId
    })
    .then((task) => res.send(task))
    .catch((error) => console.log(error));
})
app.patch('/lists/:listId/tasks/:taskId', (req, res) => {
  Task.findOneAndUpdate({
      _listId: req.params.task
    }, {
      $set: req.body
    })
    .then((task) => task)
    .catch((error) => console.log(error));
})
app.delete('/lists/:listId/tasks/:taskId', (req, res) => {
  Task.findOneAndDelete({
      _listId: req.params.listId,
      _id: req.params.taskId,
    })
    .then((task) => res.send(task))
    .catch((error) => console.log(error));
})
app.listen(3000, () => console.log("Server:3000"));

// List : Create , Update , ReadOne -  one list, ReadAll - all list , Delete
// Task : Create , Update , ReadOne, ReadAll , Delete
// get - get data
// post - save
// put patch