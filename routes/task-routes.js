const express = require('express');
const router = express.Router();
const Task = require('../database/task-model');

function getDate(date = new Date()) {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

router.get("/:taskid", function(req,res){
  Task.findById(req.params.taskid, function(err, doc) {
    if (err) {
      console.log(err);
    } else {
      res.render("task", {
        doc,
        taskDate: getDate(doc.date),
        listDate: new Date(doc.date).toISOString().slice(0,10)
      });
    }
  })
});

router.post("/", async function(req,res){
  const {editItem, editNotes, addItem} = req.body;
  const query = new Date(req.body.dateValue).toISOString().slice(0,10);
  await Task.findByIdAndUpdate(addItem, {taskName: editItem, notes: editNotes}, function(err){
    if (err) {console.log(err)};
  });
  res.redirect("/calendar/" + query.split("-").join("/"));
})

module.exports = router;
