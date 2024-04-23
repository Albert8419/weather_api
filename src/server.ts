import express from "express";
import cors from "cors";
import axios from 'axios'; // Using ES6 import for axios
import weatherRoute from "./routes/weatherRoute.js";
import aqiRoute from "./routes/aqiRoute.js"; // Import the new AQI route

// We will create an express app
const app = express();

// CORS configuration for development, replace '*' with your specific front-end domain in production
const corsOptions = {
  origin: '*', // Allow all origins for development
  optionsSuccessStatus: 200 // For legacy browser support
};
app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(express.json());

// API Routes
app.use("/api/weather", weatherRoute);
app.use("/api/aqi", aqiRoute);

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

// Route to fetch AQI data dynamically from the AQI API
app.get("/api/aqi/:city", async (req, res) => {
  const city = req.params.city;
  const data = await fetchAQIData(city);
  if (data) {
    res.json(data);
  } else {
    res.status(500).json({ message: "Failed to fetch AQI data" });
  }
});

// Define the server's listening port
const PORT = 3000;

// Start the express server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
