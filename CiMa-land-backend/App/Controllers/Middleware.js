const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {

    const bearerHeader = req.headers["authorization"];
  
    if (typeof bearerHeader !== "undefined") {
      const bearerToken = bearerHeader.split(" ")[1];
      req.token = bearerToken;
      jwt.verify(req.token, "secretkey", (err, authData) => {
        if (err) {
          return res.sendStatus(403);
        }
        req.user=authData;
        next();
      });
  
    } else {
      res.sendStatus(401);
    }
  }
  