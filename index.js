const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Bienvenido a la API para consultar el tiempo");
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en localhost:${PORT}`);
});
