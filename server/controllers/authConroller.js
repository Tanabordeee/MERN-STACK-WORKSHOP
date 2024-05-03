const jwt = require("jsonwebtoken");
const expressJwt = require('express-jwt');
require('dotenv').config();
exports.login = (req, res) => {
  const { username, password } = req.body;

  if (password === process.env.PASSWORD && username === process.env.USERNAMES) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1d" });
    return res.json({ token, username });
  } else {
    return res.status(400).json({ error: "password or username incorrect" });
  }
}

// Check token middleware
exports.requireLogin = expressJwt.expressjwt({
  secret: process.env.JWT_SECRET, 
  algorithms: ["HS256"], 
  userProperty:"auth"
});
