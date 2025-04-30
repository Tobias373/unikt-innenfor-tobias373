// database.js
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// DB-fil lagres i rotmappa som "database.db"
const db = new sqlite3.Database(path.resolve(__dirname, "database.db"), (err) => {
  if (err) {
    console.error("Kunne ikke koble til database:", err.message);
  } else {
    console.log("Kobla til SQLite-database ✅");
  }
});

// Oppretter tabeller hvis de ikke finnes
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    parent_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`);
});

module.exports = db;
