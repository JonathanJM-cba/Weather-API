const { createClient } = require("redis");
require("dotenv").config();

const urlRedis = process.env.REDIS_URL;

const redisClient = createClient({
  url: urlRedis,
});

redisClient.on("error", (err) => console.log("Redis client error: ", err));

(async () => {
  await redisClient.connect();
  console.log("Conectado a Redis");
})();

module.exports = redisClient;
