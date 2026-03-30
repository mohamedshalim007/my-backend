const db = require("../config/db");

exports.getAllStaff = (req, res) => {
  const sql = `
    SELECT 
      employee_id,
      name_with_initial,
      department,
      designation,
      dob,
      mobile,
      email,
      address,
      category,
      photo_path
    FROM staff
    WHERE verified = 1
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("STAFF FETCH ERROR:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json(results);
  });
};
