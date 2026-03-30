const bcrypt = require("bcrypt");

exports.hashPassword = (password) => {
  return bcrypt.hash(password, 10);
};
