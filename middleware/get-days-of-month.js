// MOVE NEXT MONTH AND NEXT YEAR FUNCTIONS ONE SCOPE ABOVE
// USE MOMENT TO CALCULATE ONE MONTH BEFORE AND ONE MONTH AFTER

module.exports = (req, res, next) => {
  const {year, month} = req.params;
  const calendarArray = [];
  const date = new Date(year, month, 0).getDate();
  const monthStart = year + "-" + month + "-01";
  const monthEnd = year + "-" + month + "-" + date
  const dayStart = new Date(monthStart).getDay();
  const dayEnd = new Date(monthEnd).getDay();

  // Calculating Previous and Next dates' headerValues

  const previousMonth = month === "01" ? "12" : Number(month) - 1;
  const previousYear = month === "01" ? (Number(year) - 1).toString() : year;
  const nextMonth = month === "12" ? "01" : Number(month) + 1;
  const nextYear = month === "12" ? (Number(year) + 1).toString() : year;

  // CREATING AN OBJECT WITH THE DAYS OF THIS MONTH

  for (let i = 1 - dayStart; i <= date + (6 - dayEnd); i++) {
    var tempObj = {};
    if (i >= 1 && i <= date) {
      tempObj = {
        year,
        month: month,
        day: i.toString().length == 1 ? "0" + i : i.toString()
      }
    } else  if (i < 1 ) {
      const previousMonthDays = new Date(previousYear, previousMonth, 0).getDate();
      const previousDay = previousMonthDays + i;
      tempObj = {
        previousYear,
        month: previousMonth.toString().length == 1 ? "0" + previousMonth : previousMonth.toString(),
        day: previousDay.toString().length == 1 ? "0" + previousDay : previousDay.toString()
      }
    } else if (i > date) {
      const nextDay = i - date;
      tempObj = {
        nextYear,
        month: nextMonth.toString().length == 1 ? "0" + nextMonth : nextMonth.toString(),
        day: nextDay.toString().length == 1 ? "0" + nextDay : nextDay.toString()
      }
    }
    calendarArray.push(tempObj);
  }
  req.daysOfMonth = calendarArray;

  // CREATING AN OBJECT FOR HEADER TITLE AND LINK ARROWS

  const headerValues = {
    year,
    month,
    monthName: new Date(year, month - 1).toLocaleDateString('en-GB', { month:'long' }),
    previousYear: month === "01" ? (Number(year) - 1).toString() : year,
    previousMonth: previousMonth.toString().length == 1 ? "0" + previousMonth : previousMonth.toString(),
    nextYear: month === "12" ? (Number(year) + 1).toString() : year,
    nextMonth: nextMonth.toString().length == 1 ? "0" + nextMonth : nextMonth.toString(),
  };
  req.headerValues = headerValues;
  next();
}
