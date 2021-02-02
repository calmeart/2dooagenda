


exports.getDate = function(date = new Date()) {

  return new Date(date).toLocaleDateString("en-US", {weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'});

};

exports.getDay = function(date = new Date()) {

  return new Date(date).toLocaleDateString("en-US", {weekday: 'long'});

};
