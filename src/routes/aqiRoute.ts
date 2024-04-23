import express from 'express';
import { fetchAQIData } from '../services/aqiService.js'; // Assuming fetchAQIData will be moved to a service file

const router = express.Router();

router.get('/:city', async (req, res) => {
  const city = req.params.city;
  const data = await fetchAQIData(city);
  if (data) {
    res.json(data);
  } else {
    res.status(500).json({ message: "Failed to fetch AQI data" });
  }
});

export default router;
