const {
  getWeatherOfLocation,
  getWeatherOfLocationByDateRange,
} = require("../services/weatherService");
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

const getWeatherLocationByDateRange = async (req, res) => {
  const { location, startDate, endDate } = req.params;

  try {
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);

    //Se válida que la fecha de inicio no sea mayor o igual a la fecha de fin
    if (date1 >= date2)
      return handleHttpError(res, "ERROR_INVALID_DATE_RANGE", 400);

    //Se formatea la fecha a YYYY-MM-DD
    const formattedStartDate = date1.toISOString().split("T")[0];
    const formattedEndDate = date2.toISOString().split("T")[0];
    const weatherLocation = await getWeatherOfLocationByDateRange(
      location,
      formattedStartDate,
      formattedEndDate
    );
    res.status(200).json(weatherLocation);
  } catch (error) {
    if (error.message === "ERROR_LOCATION_NOT_FOUND")
      return handleHttpError(res, "ERROR_LOCATION_NOT_FOUND", 404);
    if (error.message === "ERROR_EXCEEDS_MAXIMUM_QUERY_COST")
      return handleHttpError(res, "ERROR_EXCEEDS_MAXIMUM_QUERY_COST", 401);
    handleHttpError(res, "ERROR_GET_WEATHER_OF_LOCATION_BY_DATE_RANGE", 500);
  }
};

module.exports = { getWeatherLocation, getWeatherLocationByDateRange };
