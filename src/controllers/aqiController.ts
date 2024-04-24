import { Request, Response } from "express";
import { getAirQuality } from "../services/aqiService.js"; // Make sure this path is correct
import { validationResult } from "express-validator";

/**
 * Gets the AQI data for a city
 * @param req the request object
 * @param res the response object
 */
export const getAQIData = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.error("Validation error", errors.mapped());
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const { city } = req.params;

    if (!city) {
      res.status(400).json({ message: "City parameter is missing" });
      return;
    }

    try {
      const aqiData = await getAirQuality(city);
      res.status(200).json(aqiData);
      return;
    } catch (aqiError) {
      console.error("AQI Fetching error", aqiError);
      res.status(404).json({ message: "City not found or AQI data unavailable" });
      return;
    }
  } catch (error) {
    console.error("Error in fetching AQI data", error);
    res.status(500).send("Error in fetching AQI data");
  }
};

// Removing the fetchAirQuality function as it's redundant
