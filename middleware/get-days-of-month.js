

module.exports = (req, res, next) => {
  const {year, month} = req.params;
  const calendarArray = [];
  const date = new Date(year, month, 0).getDate();
  const monthStart = year + "-" + month + "-01";
  const monthEnd = year + "-" + month + "-" + date
  const dayStart = new Date(monthStart).getDay();
  const dayEnd = new Date(monthEnd).getDay();

  for (let i = 1 - dayStart; i <= date + (6 - dayEnd); i++) {
    var tempObj = {};
    if (i >= 1 && i <= date) {
      tempObj = {
        year,
        month: month,
        day: i.toString().length == 1 ? "0" + i : i.toString()
      }
    } else  if (i < 1 ) {
      const previousMonth = month - 1;
      const previousMonthDays = new Date(year, previousMonth, 0).getDate();
      const previousDay = previousMonthDays + i;
      tempObj = {
        year,
        month: previousMonth.toString().length == 1 ? "0" + previousMonth : previousMonth.toString(),
        day: previousDay.toString().length == 1 ? "0" + previousDay : previousDay.toString()
      }
    } else if (i > date) {
      const nextMonth = Number(month) + 1;
      const nextDay = i - date;
      tempObj = {
        year,
        month: nextMonth.toString().length == 1 ? "0" + nextMonth : nextMonth.toString(),
        day: nextDay.toString().length == 1 ? "0" + nextDay : nextDay.toString()
      }
    }
    calendarArray.push(tempObj);
  }
  req.daysOfMonth = calendarArray;
  next();
}
