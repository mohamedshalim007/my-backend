//authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const upload = require("../middleware/uploadMiddleware");

router.post(
  "/signup",
  upload.single("photo"), // 🔥 REQUIRED
  authController.signup
);

router.post("/login", authController.login);

module.exports = router;
