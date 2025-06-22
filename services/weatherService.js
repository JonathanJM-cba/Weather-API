const axios = require("axios");
const redisClient = require("../config/redisClient");
require("dotenv").config();

const URL_BASE =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

const API_WEATHER_KEY = process.env.API_KEY;

// TTL (tiempo de expiración en segundos): 12 horas
const CACHE_EXPIRATION = 60 * 60 * 12; // 43200

const getWeatherOfLocation = async (location) => {
  try {
    //Se verifica si existe el clima de la localidad almacenada en la cache
    const weatherCached = await redisClient.get(location.toLowerCase());

    if (weatherCached) {
      console.log("Clima de la locación devuelta desde la cache");
      return JSON.parse(weatherCached);
    }

    //Si no existe se almacena en la cache
    const res = await axios.get(
      `${URL_BASE}${location}?key=${API_WEATHER_KEY}`
    );

    await redisClient.setEx(
      location.toLowerCase(),
      CACHE_EXPIRATION,
      JSON.stringify(res.data)
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
