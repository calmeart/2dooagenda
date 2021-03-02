

const clockHeader = document.getElementById('clockHeading');

const dateOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};

document.body.onload = runningClock;

function runningClock() {
  const date = new Date().toLocaleDateString('en-GB', dateOptions);
  const time = new Date().toLocaleTimeString('en-GB', { hour12: false });
  const string = date + " - " + time;
  clockHeader.innerHTML = string;
}

setInterval(runningClock, 1000);
