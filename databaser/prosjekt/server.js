// Importerer SQLite3-biblioteket og aktiverer verbose-modus for bedre feilsøking

const sqlite3 = require('sqlite3').verbose();


// Importerer body-parser for å håndtere innkommende forespørselsdata (for eksempel JSON)

const bodyParser = require('body-parser');


// Oppretter en ny Express-applikasjon

const app = express();


// Definerer portnummeret som serveren skal kjøre på

const PORT = 3000;


// Konfigurerer Express til å bruke EJS som template-motor for å rendere HTML-sider

app.set('view engine', 'ejs');


// Oppretter en tilkobling til SQLite-databasen 'database.db'

const db = new sqlite3.Database('database.db');


// Definerer en rute for HTTP GET-forespørsler til rot-URL ('/')

app.get('/', (req, res) => {

// Kjører en SQL-spørring for å hente alle rader fra 'users'-tabellen

db.all('SELECT * FROM users', [], (err, rows) => {

if (err) {

// Logger feilmeldingen til konsollen hvis en feil oppstår

console.error(err.message);

// Sender en HTTP 500-statuskode og en feilmelding til klienten

res.status(500).send("Database error!");

} else {

// Rendrer 'index.ejs' og sender 'rows' (brukerdataene) til templaten

res.render('index', { users: rows });

}

});

});


// Starter serveren på den definerte porten og skriver en melding i konsollen

app.listen(PORT, () => {

console.log(`Server running at http://localhost:${PORT}/`);

});