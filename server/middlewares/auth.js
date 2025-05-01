const jwt = require("jsonwebtoken");
const { jwtKey } = require("../config/config");
module.exports = function(req,res,next){
  const token = req.header("x-auth-token");
  if(!token) return res.status(401).send("Access denied. No token provided.");
  try {
    req.user = jwt.verify(token, jwtKey);
    next();
  } catch {
    res.status(400).send("Invalid token.");
  }
};