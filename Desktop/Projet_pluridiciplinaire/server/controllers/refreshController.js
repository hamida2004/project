const User = require("../db_schema/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// this function generates new access token
// later it would
const refresh = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.token) return res.sendStatus(401);
  const foundUser = await User.findOne({ token: cookies.token });
  if (!foundUser) return res.sendStatus(403);
  jwt.verify(cookies.token, process.env.REFRESH_TOKEN_KEY, (err, decoded) => {
    if (err || decoded.user !== foundUser.email) {
      res.status(403).json({ error: err.message });
      console.log(err);
    }
    const accessToken = jwt.sign(
      { user: foundUser.email },
      process.env.ACCESS_TOKEN_KEY,
      {
        expiresIn: "300s",
      }
    );
    res.json({ accessToken });
  });
};

module.exports = { refresh };
