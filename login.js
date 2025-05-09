const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const app = express();
const users = {}; // fake brukerdatabase
const saltRounds = 10;

app.use(bodyParser.json());
app.use(express.static("public")); // her ligger index.html og sånt

// Registrering
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (users[username]) {
    return res.status(400).json({ msg: "Brukernavn finnes allerede" });
  }

  const hashed = await bcrypt.hash(password, saltRounds);
  users[username] = hashed;

  res.json({ msg: "Bruker opprettet ✅" });
});

// Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const hashed = users[username];
  if (!hashed) return res.json({ success: false, msg: "Feil brukernavn" });

  const match = await bcrypt.compare(password, hashed);
  if (match) {
    res.json({ success: true, msg: "Innlogging vellykket 🔐" });
  } else {
    res.json({ success: false, msg: "Feil passord" });
  }
});

// Start server
app.listen(3000, () => {
  console.log("Server kjører på http://localhost:3000 🚀");
});
