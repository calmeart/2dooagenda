

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
        month: month,
        day: i
      }
    } else  if (i < 1 ) {
      const previousMonth = month - 1;
      const previousMonthDays = new Date(year, previousMonth, 0).getDate();
      tempObj = {
        month: previousMonth.toString().length == 1 ? "0" + previousMonth : previousMonth.toString(),
        day: previousMonthDays + i
      }
    } else if (i > date) {
      const nextMonth = Number(month) + 1;
      tempObj = {
        month: nextMonth.toString().length == 1 ? "0" + nextMonth : nextMonth.toString(),
        day: i - date
      }
    }
    calendarArray.push(tempObj);
  }
  req.daysOfMonth = calendarArray;
  next();
}
