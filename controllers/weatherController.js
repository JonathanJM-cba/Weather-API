const { getWeatherOfLocation } = require("../services/weatherService");
const handleHttpError = require("../utils/handleHttpError");

const getWeatherLocation = async (req, res) => {
  const { location } = req.params;
  try {
    const weatherLocation = await getWeatherOfLocation(location);
    res.status(200).json(weatherLocation);
  } catch (error) {
    handleHttpError(res, "ERROR_GET_WEATHER_OF_LOCATION");
  }
};

module.exports = { getWeatherLocation };
