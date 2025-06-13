const { Router } = require("express");
const { getWeatherLocation } = require("../controllers/weatherController");
const router = Router();

router.get("/:location", getWeatherLocation);

module.exports = router;
