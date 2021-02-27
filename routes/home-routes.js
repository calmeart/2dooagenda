const express = require('express');
const Task = require('../database/task-model');
const Message = require('../database/message-model');

function getDate(date = new Date()) {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

module.exports = (app) => {
  app.get('/', function(req, res) {
    const day = getDate();
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
    const tempMessage = new Message({userName, userMail, message});
    await tempMessage.save();
    res.redirect("/contact/success");
  })
}
