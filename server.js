const express = require("express");
const path = require("path");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); // serve static files

// DB Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "nehaangel19_",
  database: "mydb",
});
db.connect(err => {
  if (err) {
    console.error("❌ DB connection failed:", err);
    process.exit(1);
  }
  console.log("✅ Connected to MySQL");
});

// ---------- LOGIN ----------
app.post("/api/login", (req, res) => {
  const { userId, password, role } = req.body;
  const sql = "SELECT * FROM users WHERE email=? AND password=? AND role=?";
  db.query(sql, [userId, password, role], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "DB error" });
    if (results.length > 0) {
      res.json({ success: true, user: results[0] });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  });
});

// ---------- SUBMISSIONS ----------
// ---------- SUBMISSIONS ---------- (Updated Review 0)
app.post("/api/review0", (req, res) => {
  const {
    student_id,
    student_name,
    class_name,
    objective,
    implementation,
    tools,
    presentation_status,
    completion_status,
    final_status
  } = req.body;
  
  const sql = `
    INSERT INTO review0_submissions 
    (student_id, student_name, class_name, objective, implementation, tools, presentation_status, completion_status, final_status) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [
    student_id,
    student_name,
    class_name,
    objective,
    implementation,
    tools,
    presentation_status,
    completion_status,
    final_status
  ], err => {
    if (err) {
      console.error("❌ DB insert error:", err);
      return res.status(500).json({ error: "DB insert error" });
    }
    res.json({ message: "✅ Review 0 submitted!" });
  });
});

// ---------- EVALUATION ----------
app.post("/api/review0_eval", (req, res) => {
  const { faculty_id, student_id, marks, comments } = req.body;
  const sql = "INSERT INTO review0_evaluation (faculty_id, student_id, marks, comments) VALUES (?, ?, ?, ?)";
  db.query(sql, [faculty_id, student_id, marks, comments], err => {
    if (err) return res.status(500).json({ error: "DB insert error" });
    res.json({ message: "✅ Review 0 evaluated!" });
  });
});

// Repeat similar for review1_eval, review2_eval

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
