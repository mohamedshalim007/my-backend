const db = require("../config/db");

/* ================= STAFF SEND NOTE ================= */
exports.addNote = async (req, res) => {
  try {
    const { note } = req.body;
    const staffId = req.user.id; // 🔥 FROM JWT

    if (!note || !note.trim()) {
      return res.status(400).json({ message: "Note is required" });
    }

    await db.execute(
      "INSERT INTO staff_notes (staff_id, note) VALUES (?, ?)",
      [staffId, note]
    );

    res.json({ message: "Note sent successfully" });
  } catch (err) {
    console.error("ADD NOTE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= ADMIN VIEW NOTES ================= */
exports.getNotes = async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT 
        sn.id,
        sn.note,
        sn.created_at,
        s.employee_id,
        s.name_with_initial,
        s.department,
        s.designation
      FROM staff_notes sn
      JOIN staff s ON sn.staff_id = s.id
      ORDER BY sn.created_at DESC
    `);

    res.json(rows);
  } catch (err) {
    console.error("GET NOTES ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
