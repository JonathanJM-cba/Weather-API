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
    console.log("Datos del error: ", error);
    console.log("Error al intentar obtener el clima del la locación");
    throw new Error("ERROR_GET_WEATHER_OF_LOCATION");
  }
};

module.exports = { getWeatherOfLocation };
