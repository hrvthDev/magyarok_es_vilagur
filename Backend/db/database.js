const mysql = require("mysql");

  const db = mysql.createConnection({
    host: "localhost", 
    user: "root",
    password: "",
    database: "magyarok_es_vilagur"
  });

  
  db.connect((err) => {
    if (err) {
      console.error("Hiba történt az adatbázis csatlakozása során!", err);
      return;
    }
    console.log("Sikeresen csatlakoztál a MySql szerverhez!");
  });



module.exports = db;
