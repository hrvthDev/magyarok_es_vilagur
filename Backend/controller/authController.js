const db = require("../db/database.js");
const bcrypt = require("bcrypt");

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

    const select = "SELECT * FROM users WHERE username = ? AND password = ?";

    db.query(select, [username, password], (err, results) => {
        if (err) {
            console.error("MySQL hiba:", err);
            return res.status(500).json({ message: "Adatbázis hiba történt!" });
        }

        if (!results || results.length === 0) {
            return res
                .status(400)
                .json({ message: "Hibás felhasználónév vagy jelszó!" });
        }

        res.json({
            message: `Szia ${results[0].username}, sikeresen bejelentkeztél!`,
        });
    });
};

module.exports = { registerForm, loginForm };
