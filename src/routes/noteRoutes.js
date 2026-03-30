const express = require("express");
const router = express.Router();

const noteController = require("../controllers/noteController");
const authMiddleware = require("../middleware/authMiddleware");

// Staff sends note
router.post("/send", authMiddleware, noteController.addNote);

// Admin views notes
router.get("/admin", authMiddleware, noteController.getNotes);

module.exports = router;
