const express = require("express");
const app = express();
const PORT = 5000;
const path = require("path");
const authRoutes = require("../Backend/routes/authRoutes.js");
const cors = require("cors");
const { error } = require("console");




app.use(express.static(path.join(__dirname, "../Frontend/public")));
app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);


app.use((req, res) =>{
  res.status(404).sendFile(path.join(__dirname, "../Frontend/public/pages/notfound.html"));
})


app.listen(PORT, () => {
  console.log(`Szervered elindult a következő porton: ${PORT}`);
})