const jwt = require('jsonwebtoken');

module.exports.verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (bearerHeader) {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, process.env.SCREET_KEY, err => {
      if (err) {
        res.sendStatus(401);
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports.getDecode = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  const bearer = bearerHeader.split(' ');
  const bearerToken = bearer[1];
  return jwt.decode(bearerToken);
};
