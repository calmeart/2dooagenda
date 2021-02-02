const mongoose = require("mongoose");
const moment = require("moment");

mongoose.set('useFindAndModify', false);

const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  notes: String
});

const Task = mongoose.model("Task", taskSchema);

const messageSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  userMail: String,
  message: {
    type: String,
    required: true
  }
});

const Message = mongoose.model("Message", messageSchema);

const createMessage = async function(userName, userMail, message) {
  const tempMessage = new Message({
    userName,
    userMail,
    message
  });
  await tempMessage.save();
}

const createTask = async function(taskName, date, notes) {
  const tempTask = new Task({
    taskName,
    date,
    notes
  })
  await tempTask.save();
};



const deleteTaskById = async function(id) {
  await Task.findByIdAndDelete(id, function(err){
    if (err) {console.log(err)};
  })
};

const sendTaskTomorrow = async function(id) {
  await Task.findById(id, function(err, docs){
    if (err) {
      console.log(err);
    } else {
      const newDate = moment(docs.date).add(1, 'days').format("YYYY-MM-DD");
      Task.findByIdAndUpdate(id, {date: newDate}, function(err,seconddoc){
        if (err) {console.log(err)}
      });
    }
  })
}

exports.Task = Task;
exports.createMessage = createMessage;
exports.createTask = createTask;
exports.deleteTaskById = deleteTaskById
exports.sendTaskTomorrow = sendTaskTomorrow;
