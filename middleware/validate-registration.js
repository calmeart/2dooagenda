

module.exports = (req, res, next) => {
  const { username, password} = req.body;

  if (username.length < 4) {
    throw new Error('Username is too short');
    return;
  };

  if (password.length < 6) {
    throw new Error('Password is too short');
  }

  next();
}
