const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const date = require("./date.js")
const mongoose = require("mongoose");
const database = require("./database.js")



require('dotenv').config();

app.set('view engine', "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

require('./database/connection')();

app.get('/', function(req, res) {
  const day = date.getDate();
  database.Task.find({}).sort({date: 'asc'}).exec(function(err, docs) {
    if (err) {
      console.log(err);
    } else {
      res.render("home", {
        listTitle: "Tasks To Do",
        listItems: docs,
        listDate: new Date().toISOString().slice(0,10)
      });
    }
  })
});

app.get("/calendar/:date", function(req,res){
  const listTitle = date.getDate(req.params.date);
  database.Task.find({date: new Date(req.params.date)}, function(err, docs) {
    if (err) {
      console.log(err);
    } else {
      res.render("calendar", {
        listTitle: listTitle,
        listItems: docs,
        listDate: req.params.date
      });
    }
  })
});

app.get("/tasks/:taskid", function(req,res){
  database.Task.findById(req.params.taskid, function(err, doc) {
    if (err) {
      console.log(err);
    } else {
      res.render("task", {
        doc,
        taskDate: date.getDate(doc.date),
        listDate: new Date(doc.date).toISOString().slice(0,10)
      });
    }
  })
});

app.get("/about", function(req, res) {
  res.render("about", {
    listDate: new Date().toISOString().slice(0,10)
  });
});

app.get("/contact", function(req,res){
  res.render("contact", {
    contactMessage: "Please fill the below form",
    listDate: new Date().toISOString().slice(0,10)
  });
});

app.get("/contact/success", function(req,res){
  res.render("contact", {
    contactMessage: "Your message has been sent",
    listDate: new Date().toISOString().slice(0,10)
  });
});


app.post("/calendar",async function(req,res){
  res.redirect("/calendar/" + req.body.calendar);
})

app.post('/calendar/create', async function(req, res) {
  let {newItem, newNotes, addItem } = req.body;
  if (newNotes === "") {newNotes = "No additional info"};
  const promise = await database.createTask(newItem, addItem, newNotes);
  res.redirect("/calendar/" + req.body.addItem);
});

app.post("/calendar/edit", async function(req,res){
  if (req.body.editTask) {
    res.redirect("/tasks/" + req.body.editTask);
  }
  if (req.body.completeTask) {
    const promise = await database.deleteTaskById(req.body.completeTask);
    res.redirect("/calendar/" + req.body.dateValue);
  }
  if (req.body.sendTomorrow) {
    const promise = await database.sendTaskTomorrow(req.body.sendTomorrow);
    res.redirect("/calendar/" + req.body.dateValue)
  }
})

app.post("/task", async function(req,res){
  const {editItem, editNotes, addItem} = req.body;
  const query = new Date(req.body.dateValue).toISOString().slice(0,10);
  const promise = await database.Task.findByIdAndUpdate(addItem, {taskName: editItem, notes: editNotes}, function(err){
    if (err) {console.log(err)};
  });
  res.redirect("/calendar/" + query);
})

app.post("/contact", async function(req,res){
  const {userName, userMail, message} = req.body;
  const promise = await database.createMessage(userName, userMail, message);
  res.redirect("/contact/success");
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  console.log('Server is working on port: ' + PORT);
});
