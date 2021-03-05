require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const calendarRoutes = require('./routes/calendar-routes');
const taskRoutes = require('./routes/task-routes');
const errorHandler = require('./middleware/error-handler');

const session = require('express-session');
const passport = require('passport');

app.set('view engine', "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


require('./middleware/passport-config')();
require('./database/connection')();
require('./routes/home-routes.js')(app);

app.use('/calendar', calendarRoutes);
app.use('/tasks', taskRoutes);

app.use(errorHandler);


const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  console.log('Server is working on port: ' + PORT);
});
