const Task = require('../database/task-model');

module.exports = async (req, res, next) => {
  const tempArray = await Promise.all(
    req.daysOfMonth.map(async dateObj => {
      const {year, month, day, className} = dateObj;
      const taskDate = year + "-" + month + "-" + day;
      const foundTask = await Task.find({date: new Date(taskDate)});
      return {year, month, day, tasks: foundTask, className};
    })
  )
  req.daysOfMonth = tempArray;
  next();
}
