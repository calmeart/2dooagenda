

module.exports = (req, res, next) => {
  const {year, month, day} = req.params;

  const numberOfDays = new Date(year, month, 0).getDate();
  console.log(numberOfDays)

  if (month === "01" && day == "01") {
    const previousDay = "31";
    const previousMonth = "12";
    const previousYear = Number(year) - 1;
    const nextDay = "02";
    const nextMonth = "01";
    const nextYear = year;
  } else if (month == "12" && day == "31") {
    const previousDay = "30";
    const previousMonth = "12"
    const previousYear = year
    const nextDay = "01";
    const nextMonth = "01";
    const nextYear = Number(year) + 1;
  } else {
    const previousMonth = day === "01" ? Number(month) - 1 : month;
    const previousDay = day === "01" ? new Date(year, previousMonth, 0).getDate() : Number(day) - 1;
    const previousYear = year
    const nextMonth = day == numberOfDays ? Number(month) + 1 : month;
    const nextDay = day == numberOfDays ? "01" : Number(day) + 1;
    const nextYear = year;
  }

  req.daysHeaderValues = {
    previousDay,
    previousMonth,
    previousYear,
    nextDay,
    nextMonth,
    nextYear
  };
}
