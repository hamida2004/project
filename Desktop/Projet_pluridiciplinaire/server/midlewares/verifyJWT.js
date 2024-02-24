const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = async (req, res, next) => {
    console.log(req.headers)
    const authHeaders = req.headers['authorization']
    console.log(authHeaders)
    if(!authHeaders) return res.sendStatus(401)
  const accessToken = authHeaders.split(" ")[1];
  console.log(accessToken)
  if (accessToken) {
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY, (err,decoded) => {
      if (err) {
        res.sendStatus(401);
      }
      req.user = decoded;
    });
    next();
  } else {
    res.sendStatus(403);
  }
};

module.exports = verifyJWT;
