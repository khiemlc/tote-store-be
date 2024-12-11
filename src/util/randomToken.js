const jwt = require("jsonwebtoken");
require("dotenv/config");
const createTokenRandom = async ({ email, roleId, action }) => {
  return jwt.sign(
    {
      email,
    },
    action === "admin"
      ? process.env.SECRET_KEY
      : process.env.SECRET_KEY_CUSTOMER,
    { expiresIn: "10d" }
  );
};
module.exports = createTokenRandom;
