 const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const path = require("path");

/* =========================
   SIGNUP
========================= */
exports.signup = async (req, res) => {
  try {
    const data = req.body;

    if (!data.employee_id || !data.password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // ✅ Store correct relative path
    let photoPath = null;
if (req.file) {
  const normalizedPath = req.file.path.replace(/\\/g, "/");
  const index = normalizedPath.indexOf("uploads/");

  if (index !== -1) {
    photoPath = normalizedPath.substring(index);
  }
}

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const sql = `
      INSERT INTO staff (
        employee_id,
        title,
        name_with_initial,
        category,
        qualification,
        stream,
        department,
        designation,
        dob,
        mobile,
        email,
        address,
        photo_path,
        password
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      data.employee_id.trim(),
      data.title || null,
      data.name_with_initial,
      data.category,
      data.qualification || null,
      data.stream,
      data.department,
      data.designation,
      data.dob,
      data.mobile,
      data.email.toLowerCase(),
      data.address,
      photoPath,
      hashedPassword,
    ];

    db.query(sql, values, (err) => {
      if (err) {
        console.error("SIGNUP DB ERROR:", err);
        return res.status(500).json({ message: "Database error" });
      }

      res.status(201).json({
        message: "Registered successfully. Waiting for admin verification.",
      });
    });
  } catch (error) {
    console.error("SIGNUP ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   LOGIN
========================= */
exports.login = (req, res) => {
  try {
    const employee_id = req.body.employee_id?.trim();
    const password = req.body.password;

    if (!employee_id || !password) {
      return res.status(400).json({
        message: "Employee ID and password required",
      });
    }

    db.query(
      "SELECT * FROM staff WHERE employee_id = ?",
      [employee_id],
      async (err, result) => {
        if (err) {
          console.error("LOGIN DB ERROR:", err);
          return res.status(500).json({ message: "Database error" });
        }
            console.log("LOGIN INPUT:", employee_id);
    console.log("DB RESULT:", result);

        if (result.length === 0) {
          
          return res.status(401).json({
            message: "Invalid Employee ID or Password",
          });
        }

 
const user = result[0];
console.log("LOGIN INPUT:", employee_id);
console.log("DB RESULT:", result);
// 🔥 ADD THESE LINES HERE
console.log("Entered Password:", password);
console.log("Stored Hash:", user.password);



const isMatch = await bcrypt.compare(password, user.password);

console.log("MATCH RESULT:", isMatch); // 🔥 VERY IMPORTANT

if (!isMatch) {
  return res.status(401).json({
    message: "Invalid Employee ID or Password",
  });
}


        

        // BLOCK UNVERIFIED USERS
        if (user.verified === 0) {
          return res.status(403).json({
            message: "Account not verified by admin",
          });
        }

        // GENERATE TOKEN
        const token = jwt.sign(
          {
            id: user.id,
            employee_id: user.employee_id,
          },
          process.env.JWT_SECRET,
          { expiresIn: "7d" },
        );

        res.json({
          token,
          user: {
            id: user.id,
            employee_id: user.employee_id,
            title: user.title,
            name_with_initial: user.name_with_initial,
            category: user.category,
            qualification: user.qualification,
            stream: user.stream,
            department: user.department,
            designation: user.designation,
            dob: user.dob,
            mobile: user.mobile,
            email: user.email,
            address: user.address,
            photo_path: user.photo_path,
            verified: user.verified,
          },
        });
      },
    );
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
