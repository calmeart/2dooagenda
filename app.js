const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const date = require("./date.js")
const mongoose = require("mongoose");
const calendarRoutes = require('./routes/calendar-routes');
const taskRoutes = require('./routes/task-routes');

const Task = require('./database/task-model');

require('dotenv').config();

app.set('view engine', "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

require('./database/connection')();

require('./routes/home-routes.js')(app);

app.use('/calendar', calendarRoutes);
app.use('/tasks', taskRoutes);



const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  console.log('Server is working on port: ' + PORT);
});
