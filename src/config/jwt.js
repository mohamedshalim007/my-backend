const jwt = require("jsonwebtoken");

exports.generateToken = (staff) => {
  return jwt.sign(
    {
      employee_id: staff.employee_id,
      verified: staff.verified
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};
