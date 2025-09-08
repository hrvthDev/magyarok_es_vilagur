const db = require("../db/database.js");


const registerForm =  async (req, res) => {

const {username, password} = req.body;


  try{

    const insert = "INSERT INTO users (username, password) VALUES (?,  ?)";

    db.query(insert, [username, password], (err) => {

      if(err){
        return res.status(500).json({message: "Szerver hiba történt!"});
      }else{
        res.status(201).json({message: "Sikeresen regisztráltál!"});
      }
    })
  
  }

  catch(err){
    console.log("Szerver hiba történt!", err);
    res.status(500).json({message: "Szerver hiba történt!"});
  }

}


const loginForm = (req, res) => {
  const { username, password } = req.body;

  const select = "SELECT * FROM users WHERE username = ? AND password = ?";

  db.query(select, [username, password], (err, results) => {
    if (err) {
      console.error("MySQL hiba:", err);
      return res.status(500).json({ message: "Adatbázis hiba történt!" });
    }

    if (!results || results.length === 0) {
      return res.status(400).json({ message: "Hibás felhasználónév vagy jelszó!" });
    }

    res.json({ message: `Szia ${results[0].username}, sikeresen bejelentkeztél!` });
  });
};




module.exports = {registerForm, loginForm};