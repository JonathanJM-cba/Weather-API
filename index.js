const express = require("express");
const app = express();
const cors = require("cors");
const responseTime = require("response-time");
const redisClient = require("./config/redisClient");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(responseTime());

app.get("/", (req, res) => {
  res.send("Bienvenido a la API para consultar el tiempo");
});

app.use("/api/v1", require("./routes"));

app.listen(PORT, () => {
  console.log(`Servidor escuchando en localhost:${PORT}`);
});
