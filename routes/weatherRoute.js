const { Router } = require("express");
const {
  getWeatherLocation,
  getWeatherLocationByDateRange,
} = require("../controllers/weatherController");
const weatherValidator = require("../validations/weatherValidation");
const router = Router();

router.get("/:location", getWeatherLocation);

router.get(
  "/:location/:startDate/:endDate",
  weatherValidator,
  getWeatherLocationByDateRange
);

module.exports = router;
