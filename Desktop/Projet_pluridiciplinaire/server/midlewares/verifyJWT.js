const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = async (req, res, next) => {
    const authHeaders = req.headers['authorization']

    if(!authHeaders) return res.sendStatus(401)
  const accessToken = authHeaders.split(" ")[1];
  console.log(accessToken)
  if (accessToken) {
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY, (err,decoded) => {
      if (err) {
        res.sendStatus(401);

      }
      //the decoded contains the User.email as user
      req.user = decoded;
    });
    next();
  } else {
    res.sendStatus(403);
  }
};

module.exports = verifyJWT;
