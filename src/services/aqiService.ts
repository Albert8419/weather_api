import axios from 'axios';

export async function fetchAQIData(city) {
  const url = `https://api.waqi.info/feed/${city}/?token=e1e26600861c3e38c921da095baad05c07d509cd`;
  try {
    const response = await axios.get(url);
    return response.data; // Accessing the data part of the response
  } catch (error) {
    console.error('Error fetching AQI data:', error);
    return null; // Handle errors or throw an exception as necessary
  }
}
