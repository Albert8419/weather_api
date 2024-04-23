import express from "express";
import weatherRoute from "./routes/weatherRoute.js";
import cors from "cors";
import axios from 'axios'; // Using ES6 import for axios
import aqiRoute from "./routes/aqiRoute.js"; // Import the new AQI route

// We will create an express app
const app = express();
app.use(cors());

// The port that the express server will listen on
const PORT = 3000;

app.use(express.json());
app.use(cors());

// We define our routes
app.use("/api/weather", weatherRoute);
app.use("/api/aqi", aqiRoute); // Add the AQI route

// Function to fetch AQI data
async function fetchAQIData(city: string) {
  const url = `https://api.waqi.info/feed/${city}/?token=e1e26600861c3e38c921da095baad05c07d509cd`;
  try {
    const response = await axios.get(url);
    return response.data; // Accessing the data part of the response
  } catch (error) {
    console.error('Error fetching AQI data:', error);
    return null; // Handle errors or throw an exception as necessary
  }
}

// Route to fetch AQI data
app.get("/api/aqi/:city", async (req, res) => {
  const city = req.params.city;
  const data = await fetchAQIData(city);
  if (data) {
    res.json(data);
  } else {
    res.status(500).json({ message: "Failed to fetch AQI data" });
  }
});

// Start the express server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
