 const bcrypt = require("bcrypt");
const db = require("../config/db");

/* =========================
   UPDATE OWN PROFILE
========================= */
exports.updateOwnProfile = async (req, res) => {
  try {
    const employee_id = req.user.employee_id;

    const { mobile, email, dob, address, password } = req.body;

    if (!mobile || !email || !address) {
      return res.status(400).json({
        message: "Mobile, Email and Address are required",
      });
    }

    /* ================= PHOTO PATH ================= */
    let photoPath = null;

    if (req.file) {
      const normalizedPath = req.file.path.replace(/\\/g, "/");

      const index = normalizedPath.indexOf("uploads/");

      if (index !== -1) {
        photoPath = normalizedPath.substring(index);
      }
    }

    /* ================= UPDATE QUERY ================= */
    let sql = `
      UPDATE staff 
      SET mobile = ?, 
          email = ?, 
          dob = ?, 
          address = ?
    `;

    const values = [
      mobile,
      email,
      dob || null,
      address,
    ];

    /* ===== OPTIONAL PASSWORD CHANGE ===== */
    if (password && password.trim() !== "") {
      const hashedPassword = await bcrypt.hash(password, 10);
      sql += `, password = ?`;
      values.push(hashedPassword);
    }

    /* ===== OPTIONAL PHOTO CHANGE ===== */
    if (photoPath) {
      sql += `, photo_path = ?`;
      values.push(photoPath);
    }

    sql += ` WHERE employee_id = ?`;
    values.push(employee_id);

    db.query(sql, values, (err) => {
      if (err) {
        console.error("PROFILE UPDATE DB ERROR:", err);
        return res.status(500).json({ message: "Database error" });
      }

      /* ===== RETURN UPDATED USER ===== */
      db.query(
        `SELECT 
            employee_id,
            name_with_initial,
            mobile,
            email,
            dob,
            address,
            photo_path
         FROM staff 
         WHERE employee_id = ?`,
        [employee_id],
        (err, result) => {
          if (err || result.length === 0) {
            return res.status(500).json({ message: "Fetch failed" });
          }

          res.json({
            message: "Profile updated successfully",
            user: result[0],
          });
        }
      );
    });

  } catch (error) {
    console.error("PROFILE UPDATE SERVER ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};