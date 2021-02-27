const mongoose = require("mongoose");

module.exports = () => mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Server connection is established!");
  }
});
