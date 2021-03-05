// ERROR SCENERIOS MUST BE HANDLED MUCH BETTER THAN THIS

module.exports = (err, req, res, next) => {
  res.render('error', {err: err});
}
