const express = require('express');
const passport = require('passport');
const User = require('../database/user-model');
const Message = require('../database/message-model');
const validateRegister = require('../middleware/validate-registration');

module.exports = (app) => {
  app.get('/', function(req, res) {
    if (req.user) {
      const dateString = new Date().toISOString().slice(0, 10);
      res.redirect('/calendar/' + dateString.split("-").join("/"));
      return;
    }
    res.render('home');
  });

  app.route('/register')
    .get((req, res) => {
      res.render('register');
    })
    .post(validateRegister, (req, res) => {
      User.register(new User({
        username: req.body.username,
      }), req.body.password, function(err, result) {
        if (err) {
          res.render('error', {err: err.message});
        }
        passport.authenticate('local')(req, res, function() {
          const dateString = new Date().toISOString().slice(0, 10);
          res.redirect('/calendar/' + dateString.split("-").join("/"));
        })
      })
    })

  app.post('/login', passport.authenticate('local'), function(req, res) {
    const dateString = new Date().toISOString().slice(0, 10);
    res.redirect('/calendar/' + dateString.split("-").join("/"));
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  app.get("/about", function(req, res) {
    res.render("about", {
      listDate: new Date().toISOString().slice(0, 10)
    });
  });

  app.get("/contact", function(req, res) {
    res.render("contact", {
      contactMessage: "Please fill the below form",
      listDate: new Date().toISOString().slice(0, 10)
    });
  });

  app.get("/contact/success", function(req, res) {
    res.render("contact", {
      contactMessage: "Your message has been sent",
      listDate: new Date().toISOString().slice(0, 10)
    });
  });

  app.post("/contact", async function(req, res) {
    const {
      userName,
      userMail,
      message
    } = req.body;
    const tempMessage = new Message({
      userName,
      userMail,
      message
    });
    await tempMessage.save();
    res.redirect("/contact/success");
  })
}
