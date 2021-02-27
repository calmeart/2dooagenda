const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const date = require("./date.js")
const mongoose = require("mongoose");
const calendarRoutes = require('./routes/calendar-routes');
const taskRoutes = require('./routes/task-routes');

const Task = require('./database/task-model');

require('dotenv').config();

app.set('view engine', "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

require('./database/connection')();


app.use('/calendar', calendarRoutes);
app.use('/tasks', taskRoutes);

app.get('/', function(req, res) {
  const day = date.getDate();
  Task.find({}).sort({date: 'asc'}).exec(function(err, docs) {
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

app.post("/contact", async function(req,res){
  const {userName, userMail, message} = req.body;
  const promise = await database.createMessage(userName, userMail, message);
  res.redirect("/contact/success");
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  console.log('Server is working on port: ' + PORT);
});
