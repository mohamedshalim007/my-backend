 //uploadMiddleware.js
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      const stream = req.body.stream;
      const department = req.body.department;

      const dir = path.join(
        __dirname,
        "../../uploads",
        stream,
        department
      );

      fs.mkdirSync(dir, { recursive: true });

      cb(null, dir);
    } catch (err) {
      cb(err, null);
    }
  },

  filename: (req, file, cb) => {
    const employeeId = req.body.employee_id;

    const ext = path.extname(file.originalname) || ".jpg";

    cb(null, `${employeeId}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;