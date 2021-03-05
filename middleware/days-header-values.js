const moment = require('moment');

module.exports = (req, res, next) => {

  if (!req.user) {
    res.redirect("/");
    return;
  }

  const {year, month, day} = req.params;
  const dateString = `${year}-${month}-${day}`;

  const previousDay = moment(dateString).subtract(1, 'days').format("YYYY-MM-DD");
  const nextDay = moment(dateString).add(1, 'days').format("YYYY-MM-DD");

  req.daysHeaderValues = {
    previousDate: previousDay.split("-"),
    currentDate: dateString.split("-"),
    nextDate: nextDay.split("-")
  }
  next();
}
