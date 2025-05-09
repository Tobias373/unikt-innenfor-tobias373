const express = require("express");
const session = require("express-session");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const { addComment, getComments } = require("./public/comments");
const path = require("path");

const app = express();
const db = new sqlite3.Database("database.db");

app.use(express.static("public")); // for å serve kommentar.html og script.js
app.use(express.json());

app.use(session({
  secret: "hemmeligKake123",
  resave: false,
  saveUninitialized: false
}));
http://localhost:3000

// Opprett tabeller hvis de ikke finnes
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  password TEXT
)`);

db.run(`CREATE TABLE IF NOT EXISTS comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  content TEXT,
  parent_id INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(user_id) REFERENCES users(id)
)`);

// Registrer bruker
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashed], function(err) {
    if (err) return res.status(400).json({ msg: "Brukernavnet er allerede tatt" });
    res.json({ msg: "Bruker registrert!" });
  });
});

// Logg inn
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.get("SELECT * FROM users WHERE username = ?", [username], async (err, row) => {
    if (err || !row) return res.status(401).json({ msg: "Feil brukernavn eller passord" });

    const match = await bcrypt.compare(password, row.password);
    if (!match) return res.status(401).json({ msg: "Feil brukernavn eller passord" });

    req.session.user = { id: row.id, username: row.username };
    res.json({ msg: "Innlogging vellykket!" });
  });
});

// Send kommentar
app.post("/kommentar", (req, res) => {
  const user = req.session.user;
  const content = req.body.content;

  if (!user) return res.status(401).json({ msg: "Du må være logga inn" });
  if (!content || !content.trim()) return res.status(400).json({ msg: "Kommentaren er tom" });

  addComment(db, user.id, content, null, res);
});

// Hent kommentarer
app.get("/kommentar", (req, res) => {
  getComments(db, res);
});


// Start server
app.listen(3000, () => console.log("Server kjører på http://localhost:3000"));