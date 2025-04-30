function addComment(db, user_id, content, parent_id, res) {
  const query = "INSERT INTO comments (user_id, content, parent_id) VALUES (?, ?, ?)";
  db.run(query, [user_id, content, parent_id || null], function (err) {
    if (err) return res.status(500).json({ msg: "Feil ved lagring" });
    res.json({ msg: "Kommentar lagret!", id: this.lastID });
  });
}

function getComments(db, res) {
  const query = `SELECT c.id, c.content, c.created_at, c.parent_id, u.username
                 FROM comments c
                 JOIN users u ON c.user_id = u.id
                 ORDER BY c.created_at DESC`;
  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ msg: "Feil ved henting" });
    res.json(rows);
  });
}

module.exports = { addComment, getComments };
