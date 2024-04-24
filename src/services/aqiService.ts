import axios from 'axios';


import { apiConfig } from '../config/config.js';

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

export const getAirQuality = async (location: string): Promise<any> => {
  try {
    const url = `${apiConfig.baseUrl}/feed/${location}/?token=${apiConfig.token}`;
    const response = await axios.get(url);
    if (response.data.status === 'ok') {
      return response.data.data;
    } else {
      throw new Error('Failed to fetch air quality data');
    }
  } catch (error) {
    console.error('Error fetching air quality data:', error);
    throw error;
  }
};
