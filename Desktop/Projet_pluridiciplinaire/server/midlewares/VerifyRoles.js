const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = async (req, res, next) => {
  const roles = req.headers["Roles"];
  const roles_decoded = [];
  if (!roles) return res.sendStatus(401);
  if (roles.lenght != 0) {
    roles.array.forEach((element) => {
      jwt.verify(element, process.env.Roles_KEY, (err, decoded) => {
        if (err) {
          res.sendStatus(401);
        }
        //the decoded contains the User.email as user
        roles_decoded.push(decoded);
      });
      next();
    });
  } else {
    res.sendStatus(403);
  }
};

module.exports = verifyJWT;
