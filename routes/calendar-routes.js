const express = require('express');
const router = express.Router();
const Task = require('../database/task-model');
const moment = require("moment");
const getDaysOfMonth = require('../middleware/get-days-of-month');

function getDate(date = new Date()) {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

router.get("/:date", async function(req, res) {
  const listTitle = getDate(req.params.date);
  const foundTasks = await Task.find({
    date: new Date(req.params.date)
  });
  res.render("days", {
    listTitle: listTitle,
    listItems: foundTasks,
    listDate: req.params.date
  });
});

router.post("/", async function(req,res){
  res.redirect("/calendar/" + req.body.calendar);
})

router.get("/:year/:month", getDaysOfMonth, async function(req, res) {
  res.render('months', {
    listDate: new Date().toISOString().slice(0, 10),
    daysOfMonth: req.daysOfMonth
  });
})

router.post('/create', async function(req, res) {
  let {newItem, newNotes, addItem } = req.body;
  if (newNotes === "") {newNotes = "No additional info"};
  const tempTask = new Task({taskName: newItem, date: addItem, notes: newNotes});
  await tempTask.save();
  res.redirect("/calendar/" + req.body.addItem);
});

router.post("/edit", async function(req,res){
  if (req.body.editTask) {
    res.redirect("/tasks/" + req.body.editTask);
  }
  if (req.body.completeTask) {
    await Task.findByIdAndDelete(req.body.completeTask);
    res.redirect("/calendar/" + req.body.dateValue);
  }
  if (req.body.sendTomorrow) {
    const foundTask = await Task.findById(req.body.sendTomorrow);
    const newDate = moment(foundTask.date).add(1, 'days').format("YYYY-MM-DD");
    await Task.findByIdAndUpdate(req.body.sendTomorrow, {date: newDate});
    res.redirect("/calendar/" + req.body.dateValue)
  }
});


module.exports = router;
