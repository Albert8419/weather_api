// Importing express module
import express from 'express';

// Importing fetchAQIData function from aqiService module
import { fetchAQIData } from '../services/aqiService.js';

// Creating a new router instance
const router = express.Router();

// Handling GET requests to '/:city' endpoint
router.get('/:city', async (req, res) => {
  // Extracting city parameter from request params
  const city = req.params.city;
  
  // Fetching AQI data for the specified city
  const data = await fetchAQIData(city);
  
  // Checking if data was fetched successfully
  if (data) {
    // Sending JSON response with the fetched data
    res.json(data);
  } else {
    // Sending error response if data fetching failed
    res.status(500).json({ message: "Failed to fetch AQI data" });
  }
});

// Exporting the router instance
export default router;
