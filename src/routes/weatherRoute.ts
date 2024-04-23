import express from "express";
import { getWeatherData, fetchAirQuality } from "../controllers/weatherController.js";
import { validateCityName } from "../middleware/validators.js";

// Creating a router object for managing routes
const router = express.Router();

// Route to get weather or air quality data based on the city name
// This route includes middleware to validate the city name before processing the request in the controller
router.get("/:city", validateCityName, getWeatherData);

// Additional route to fetch real-time air quality data for a specified location
router.get("/air-quality/:location", fetchAirQuality);

// Exporting the router for use in the main server configuration
export default router;
