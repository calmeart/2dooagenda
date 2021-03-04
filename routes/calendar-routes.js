const express = require('express');
const router = express.Router();
const Task = require('../database/task-model');
const moment = require("moment");
const getDaysOfMonth = require('../middleware/get-days-of-month');
const addTasksToDate = require('../middleware/add-tasks-to-dates');
const daysHeaderValues = require('../middleware/days-header-values');

function getDate(date = new Date()) {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

router.post("/", async function(req,res){
  res.redirect("/calendar/" + req.body.calendar.split("-").join("/"));
})

router.get("/:year/:month", getDaysOfMonth, addTasksToDate, async function(req, res) {
  let {year, month} = req.params;
  month = new Date(year, month - 1).toLocaleDateString('en-GB', { month:'long' });
  res.render('months', {
    headerValues: req.headerValues,
    listDate: new Date().toISOString().slice(0, 10),
    daysOfMonth: req.daysOfMonth
  });
});

router.get('/:year', (req, res) => {
  const year = req.params.year;
  const yearArray = {
    previousYear: (Number(year) - 1).toString(),
    currentYear: year,
    nextYear: (Number(year) + 1).toString()
  }
  res.render('years', {
    listDate: new Date().toISOString().slice(0, 10),
    headerValues: yearArray
  });
});

router.get("/:year/:month/:day", daysHeaderValues, async function(req, res) {
  const {year, month, day} = req.params;
  const dateString = `${year}-${month}-${day}`;
  const listTitle = getDate(dateString);
  const foundTasks = await Task.find({
    date: new Date(dateString)
  });
  res.render("days", {
    listTitle: listTitle,
    listItems: foundTasks,
    listDate: dateString,
    headerValues: req.daysHeaderValues
  });
});

router.post('/create', async function(req, res) {
  let {newItem, newNotes, addItem } = req.body;
  if (newNotes === "") {newNotes = "No additional info"};
  const tempTask = new Task({taskName: newItem, date: addItem, notes: newNotes});
  await tempTask.save();
  res.redirect("/calendar/" + req.body.addItem.split("-").join("/"));
});

router.post("/edit", async function(req,res){
  if (req.body.editTask) {
    res.redirect("/tasks/" + req.body.editTask);
  }
  if (req.body.completeTask) {
    await Task.findByIdAndDelete(req.body.completeTask);
    res.redirect("/calendar/" + req.body.dateValue.split("-").join("/"));
  }
  if (req.body.sendTomorrow) {
    const foundTask = await Task.findById(req.body.sendTomorrow);
    const newDate = moment(foundTask.date).add(1, 'days').format("YYYY-MM-DD");
    await Task.findByIdAndUpdate(req.body.sendTomorrow, {date: newDate});
    res.redirect("/calendar/" + req.body.dateValue.split("-").join("/"))
  }
});


module.exports = router;
