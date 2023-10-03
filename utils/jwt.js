const jwt = require("jsonwebtoken");
require('dotenv').config();

const createAccessToken = (user) => {
  const expToken = new Date();
  expToken.setHours(expToken.getHours() + 3);
  const payload = {
    token_type: "access",
    user_id: user._id,
    iat: Date.now(),
    exp: expToken.getTime(),
  };
  return jwt.sign(payload, process.env.JWT_SECRET_KEY);
};

const createRefreshToken = (user) => {
  const expToken = new Date();
  expToken.setHours(expToken.getHours() + 3);
  const payload = {
    token_type: "refresh",
    user_id: user._id,
    iat: Date.now(),
    exp: expToken.getTime(),
  };
};

const verify = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};
module.exports = {
  createAccessToken,
  createRefreshToken,
  verify,
};