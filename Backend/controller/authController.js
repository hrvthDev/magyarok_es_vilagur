const db = require("../db/database.js");
const bcrypt = require("bcrypt");
const util = require("util");


const registerForm = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const check = "SELECT * FROM users WHERE username = ?";
    const insert = "INSERT INTO users (username, password) VALUES (?, ?)";

    try {
        db.query(check, [username], (err, results) => {
            if (err) {
                console.error("Hiba a lekérdezésnél:", err);
                return res
                    .status(500)
                    .json({ message: "Adatbázis hiba történt!" });
            }

            if (results.length > 0) {
                return res.status(400).json({
                    message: "Ez a felhasználónév már foglalt!",
                });
            }

            db.query(insert, [username, hashedPassword], (err2) => {
                if (err2) {
                    console.error("Hiba a beszúrásnál:", err2);
                    return res
                        .status(500)
                        .json({ message: "Szerver hiba történt!" });
                }

                return res
                    .status(201)
                    .json({ message: "Sikeresen regisztráltál!" });
            });
        });
    } catch (err) {
        console.error("Szerver hiba történt:", err);
        return res.status(500).json({ message: "Szerver hiba történt!" });
    }
};




const loginForm = (req, res) => {
  const { username, password } = req.body;
  const select = "SELECT * FROM users WHERE username = ?";

  db.query(select, [username], async (err, results) => {
  if (err) {
    console.error("Adatbázis hiba:", err);
    return res.status(500).json({ message: "Szerver hiba történt!" });
  }

  if (!results || results.length === 0) {
    return res.status(400).json({ message: "Hibás felhasználónév vagy jelszó!" });
  }

  const user = results[0];

  console.log("Kliens által küldött jelszó:", password);
  console.log("Hash az adatbázisból:", user.password);

  try {
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Compare eredmény:", isPasswordValid);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Hibás felhasználónév vagy jelszó!" });
    }

    return res.json({ message: `Szia ${user.username}, sikeresen bejelentkeztél!` });
  } catch (e) {
    console.error("bcrypt hiba:", e);
    return res.status(500).json({ message: "Szerver hiba történt!" });
  }
});




};


module.exports = { registerForm, loginForm };
