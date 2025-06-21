const axios = require("axios");
require("dotenv").config();

const URL_BASE =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

const API_WEATHER_KEY = process.env.API_KEY;

const getWeatherOfLocation = async (location) => {
  try {
    //const res = await ax `${URL_BASE}${location}?key=${API_WEATHER_KEY}`
    const res = await axios.get(
      `${URL_BASE}${location}?key=${API_WEATHER_KEY}`
    );
    return res.data;
  } catch (error) {
    if (
      error.response &&
      error.response.data.includes("Invalid location") &&
      error.response.status === 400
    ) {
      const customError = new Error("ERROR_LOCATION_NOT_FOUND");
      throw customError;
    }
    console.log("Error al intentar obtener el clima del la locación");
    throw new Error("ERROR_GET_WEATHER_OF_LOCATION");
  }
};

const getWeatherOfLocationByDateRange = async (
  location,
  startDate,
  endDate
) => {
  try {
    const res = await axios.get(
      `${URL_BASE}${location}/${startDate}/${endDate}?key=${API_WEATHER_KEY}`
    );
    return res.data;
  } catch (error) {
    const status = error.response?.status;
    const data = error.response?.data;

    console.log("Error ocurrido:", status, data);

    switch (true) {
      case status === 400 &&
        typeof data === "string" &&
        data.includes("Invalid location"):
        throw new Error("ERROR_LOCATION_NOT_FOUND");

      case status === 401:
        throw new Error("ERROR_EXCEEDS_MAXIMUM_QUERY_COST");

      case status === 429:
        throw new Error("ERROR_EXCEEDED_MAXIMUN_NUMBER_DAILY_RESULT");

      default:
        throw new Error("ERROR_GET_WEATHER_OF_LOCATION_BY_DATE_RANGE");
    }
  }
};

module.exports = { getWeatherOfLocation, getWeatherOfLocationByDateRange };
