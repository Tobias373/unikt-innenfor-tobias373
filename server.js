const express = require("express");
const bcrypt = require("bcrypt");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./database");
const comments = require("./comments");

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(bodyParser.json());

app.use(session({
  secret: "hemmeligkode123",
  resave: false,
  saveUninitialized: true
}));

// Registrering
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashed], (err) => {
    if (err) return res.json({ msg: "Brukernavn finnes", success: false });
    res.json({ msg: "Registrert!", success: true });
  });
});

// Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.get("SELECT * FROM users WHERE username = ?", [username], async (err, user) => {
    if (err || !user) return res.json({ msg: "Feil brukernavn", success: false });

    const correct = await bcrypt.compare(password, user.password);
    if (!correct) return res.json({ msg: "Feil passord", success: false });

    req.session.user = { id: user.id, username: user.username };
    res.json({ msg: "Logget inn", success: true });
  });
});

// Legg til kommentar
app.post("/comments", (req, res) => {
  if (!req.session.user) return res.status(401).json({ msg: "Ikke innlogget" });

  const { content, parent_id } = req.body;
  comments.addComment(db, req.session.user.id, content, parent_id, res);
});

// Hent kommentarer
app.get("/comments", (req, res) => {
  comments.getComments(db, res);
});

app.listen(PORT, () => console.log(`Server kjører på http://localhost:${PORT}`));
