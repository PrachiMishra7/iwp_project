// 1. Import modules
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

// 2. Create Express app
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// 3. Connect to MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",       // leave empty if you didn't set a password
  database: "testdb"
});

db.connect(err => {
  if (err) throw err;
  console.log("✅ MySQL Connected!");
});

// 4. Routes
// Insert data
app.post("/submit", (req, res) => {
  const { name, email } = req.body;
  const sql = "INSERT INTO users1 (name, email) VALUES (?, ?)";
  db.query(sql, [name, email], (err, result) => {
    if (err) throw err;
    console.log("✅ Data inserted:", result);
    res.send("Data stored successfully!");
  });
});

// Fetch all users
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users1", (err, results) => {
    if (err) throw err;
    console.log("📊 Users:", results);
    res.json(results);
  });
});

// 5. Start server
app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
