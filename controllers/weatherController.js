const { getWeatherOfLocation } = require("../services/weatherService");
const handleHttpError = require("../utils/handleHttpError");

const getWeatherLocation = async (req, res) => {
  const { location } = req.params;
  try {
    const weatherLocation = await getWeatherOfLocation(location);
    res.status(200).json(weatherLocation);
  } catch (error) {
    if (error.message === "ERROR_LOCATION_NOT_FOUND")
      return handleHttpError(res, "ERROR_LOCATION_NOT_FOUND", 404);
    handleHttpError(res, "ERROR_GET_WEATHER_OF_LOCATION");
  }
};

module.exports = { getWeatherLocation };
