const { Router } = require("express");
const {
  getWeatherLocation,
  getWeatherLocationByDateRange,
} = require("../controllers/weatherController");
const router = Router();

router.get("/:location", getWeatherLocation);

router.get("/:location/:startDate/:endDate", getWeatherLocationByDateRange);

module.exports = router;
