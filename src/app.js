

//app.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path"); 
const authRoutes = require("./routes/authRoutes");
const staffRoutes = require("./routes/staffRoutes");
const profileRoutes = require("./routes/profileRoutes");
const noteRoutes = require("./routes/noteRoutes");


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* SERVE UPLOADS */
app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/notes", noteRoutes);

module.exports = app;
