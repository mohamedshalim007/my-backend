//staffRoutes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const staffController = require("../controllers/staffController");

router.get("/", authMiddleware, staffController.getAllStaff);

module.exports = router;
