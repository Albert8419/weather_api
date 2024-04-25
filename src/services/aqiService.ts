// Importing axios module for making HTTP requests
import axios from 'axios';

// Importing API configuration from config module
import { apiConfig } from '../config/config.js';

// Function to fetch AQI data for a specific city
export async function fetchAQIData(city) {
  // Constructing the URL for fetching AQI data
  const url = `https://api.waqi.info/feed/${city}/?token=e1e26600861c3e38c921da095baad05c07d509cd`;
  
  try {
    // Making a GET request to the API endpoint
    const response = await axios.get(url);
    // Returning the data part of the response
    return response.data;
  } catch (error) {
    // Handling errors if any occur during the request
    console.error('Error fetching AQI data:', error);
    return null; // Returning null to indicate failure
  }
}

// Function to get air quality data for a specific location
export const getAirQuality = async (location: string): Promise<any> => {
  try {
    // Constructing the URL for fetching air quality data
    const url = `${apiConfig.baseUrl}/feed/${location}/?token=${apiConfig.token}`;
    
    // Making a GET request to the API endpoint
    const response = await axios.get(url);
    
    // Checking if the response status is 'ok'
    if (response.data.status === 'ok') {
      // Returning the data part of the response
      return response.data.data;
    } else {
      // Throwing an error if response status is not 'ok'
      throw new Error('Failed to fetch air quality data');
    }
  } catch (error) {
    // Handling errors if any occur during the request
    console.error('Error fetching air quality data:', error);
    throw error; // Re-throwing the error for handling at higher levels
  }
};
