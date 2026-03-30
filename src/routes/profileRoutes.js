const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const profileController = require("../controllers/profileController");

/* =========================
   UPDATE OWN PROFILE
========================= */
const upload = require("../middleware/uploadMiddleware");

router.put(
  "/update",
  authMiddleware,
  upload.single("photo"),
  profileController.updateOwnProfile
);

module.exports = router;
