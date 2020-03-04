const jwt = require("jsonwebtoken");

const jwtAuth = function(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    console.log("no token");
    res.status(401).json({
      code: 401,
      message: "No token provided"
    });
  } else {
    jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
      if (err) {
        res.status(401).json({
          code: 401,
          message: "Unauthorized invalid token"
        });
      } else {
        next();
      }
    });
  }
};

module.exports = jwtAuth;
