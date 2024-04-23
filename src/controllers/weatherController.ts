import { Request, Response } from "express";
import {
  generateDublinWeatherData,
  generateLondonWeatherData,
  getAirQuality
} from "../services/weatherService.js"; // Make sure this path is correct
import { validationResult } from "express-validator";

/**
 * Gets the weather data for a city
 * @param req the request object
 * @param res the response object
 */
export const getWeatherData = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.error("Validation error", errors.mapped());
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const { city } = req.params;

    let finalWeatherData: WeatherData;

    if (city === "london") {
      finalWeatherData = generateLondonWeatherData();
    } else if (city === "dublin") {
      finalWeatherData = generateDublinWeatherData();
    } else {
      try {
        const aqiData = await getAirQuality(city);
        res.status(200).json(aqiData);
        return;
      } catch (aqiError) {
        console.error("AQI Fetching error", aqiError);
        res.status(404).json({ message: "City not found or AQI data unavailable" });
        return;
      }
    }

    res.status(200).json(finalWeatherData);
  } catch (error) {
    console.error("Error in fetching weather data", error);
    res.status(500).send("Error in fetching weather data");
  }
};

// Adding the fetchAirQuality function
export const fetchAirQuality = async (req: Request, res: Response) => {
  try {
    const location = req.params.location; // Assumes location is passed as a URL parameter
    const data = await getAirQuality(location);
    res.status(200).json(data);
  } catch (error: unknown) {
    console.error("Failed to fetch AQI data", error);
    const message = (error as Error).message; // Asserting error as an instance of Error
    res.status(500).json({ message: "Failed to fetch AQI data", error: message });
  }  
};
