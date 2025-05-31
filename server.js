// server.js
require('dotenv').config();

const express = require('express');
const path = require('path');
const mysql = require("mysql2/promise");
const app = express();
const PORT = 3010; // ✅ Adjusted port as requested

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

// MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});


// API route to log search data
app.post("/api/log-search", async (req, res) => {
  console.log("🔍 Incoming log request:", req.body); // 👈 Add this
  try {
    const { zipCode, tribesReturned, manualZipEntry = true } = req.body;
    const userAgent = req.headers["user-agent"];

    if (!zipCode || typeof tribesReturned !== "number") {
      console.warn("⚠️ Invalid request format", req.body);
      return res.status(400).json({ error: "Invalid request format" });
    }

    const conn = await pool.getConnection();
    await conn.execute(
      `INSERT INTO search_logs (zip_code, tribes_returned, manual_zip_entry, user_agent)
       VALUES (?, ?, ?, ?)`,
      [zipCode, tribesReturned, manualZipEntry, userAgent]
    );
    conn.release();
    res.json({ message: "Logged successfully" });
  } catch (err) {
    console.error("❌ Error logging search:", err);
    res.status(500).json({ error: "Failed to log search" });
  }
});


// Catch-all route to serve index.html for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Production server is running on http://localhost:${PORT}`);
});
