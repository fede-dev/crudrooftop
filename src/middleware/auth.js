const jwt = require("jsonwebtoken");
//const {makeObjError} = require('./errorHandler')

const verifytoken = (req, res, next) => {
  const bearerHeader = req.header("Authorization");
  if (bearerHeader) {
    jwt.verify(bearerHeader, process.env.SECRET_KEY, (error, tokenInfo) => {
      if (error) {
        res.status(403).json("ERROR", error);
        return;
      } else {
        req.user = tokenInfo.user;
      }
      next();
    });
  } else {
    res.status(403).json({ message: "Acceso prohibido" });
  }
};

module.exports = verifytoken;
