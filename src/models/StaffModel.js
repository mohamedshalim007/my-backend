const db = require("../config/db");

exports.findByEmployeeId = (employee_id, callback) => {
  db.query(
    "SELECT * FROM staff WHERE employee_id=?",
    [employee_id],
    callback
  );
};
