const db = require("../config/db");

/* ================= CREATE NOTE ================= */
exports.createNote = async (staffId, note) => {
  const [result] = await db.execute(
    "INSERT INTO staff_notes (staff_id, note) VALUES (?, ?)",
    [staffId, note]
  );
  return result;
};

/* ================= GET ALL NOTES (ADMIN) ================= */
exports.getAllNotes = async () => {
  const [rows] = await db.execute(`
    SELECT 
      n.id,
      n.note,
      n.created_at,
      s.employee_id,
      s.name_with_initial,
      s.department,
      s.designation
    FROM staff_notes n
    JOIN staff s ON s.id = n.staff_id
    ORDER BY n.created_at DESC
  `);
  return rows;
};
