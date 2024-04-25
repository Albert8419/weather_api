import { Request, Response } from "express";
import { getAirQuality } from "../services/aqiService.js";
import { validationResult } from "express-validator";

/**
 * Getting the AQI data for a city
 * @param req the request object
 * @param res the response object
 */

export const getAQIData = async (req: Request, res: Response) => {
  // Validating the request parameters
  const errors = validationResult(req);

  // Checking for validation errors
  if (!errors.isEmpty()) {
      // Logging validation errors
      console.error("Validation error", errors.mapped());
      // Returning validation error response
      res.status(400).json({ errors: errors.array() });
      return;
  }

  try {
      // Extracting city parameter from the request
      const { city } = req.params;

      // Checking if city parameter is missing
      if (!city) {
          // Returning missing city parameter error response
          res.status(400).json({ message: "City parameter is missing" });
          return;
      }

      try {
          // Fetching AQI data for the city
          const aqiData = await getAirQuality(city);
          // Returning AQI data response
          res.status(200).json(aqiData);
          return;
      } catch (aqiError) {
          // Log AQI fetching error
          console.error("AQI Fetching error", aqiError);
          // Returning city not found or AQI data unavailable error response
          res.status(404).json({ message: "City not found or AQI data unavailable" });
          return;
      }
  } catch (error) {
      // Logging error in fetching AQI data
      console.error("Error in fetching AQI data", error);
      // Return internal server error response
      res.status(500).send("Error in fetching AQI data");
  }
};

