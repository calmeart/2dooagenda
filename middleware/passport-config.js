const passport = require('passport')
const User = require('../database/user-model');

module.exports = () => {
  passport.use(User.createStrategy());
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
}
