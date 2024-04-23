import { faker } from "@faker-js/faker";
import axios from 'axios';
import { storeWeatherData } from "../helpers/helpers.js";
import { apiConfig } from "../config/config.js"; // Check if the path is correct and if it should be '.ts'

export const generateLondonWeatherData = (): WeatherData => {
  // Generate random weather data
  const generatedWeatherData = {
    city: "London",
    temperature: faker.number.int({ min: -15, max: 30 }),
    humidity: faker.number.int({ min: 79, max: 86 }),
    wind: faker.number.int({ min: 2, max: 78 }),
    rain: faker.number.int({ min: 65, max: 75 }),
  };

  storeWeatherData(generatedWeatherData).catch(console.error);

  // Return weather data
  return generatedWeatherData;
};

export const generateDublinWeatherData = (): WeatherData => {
  // Generate random weather data
  const generatedWeatherData: WeatherData = {
    city: "Dublin",
    temperature: faker.number.int({ min: -15, max: 30 }),
    humidity: faker.number.int({ min: 79, max: 86 }),
    wind: faker.number.int({ min: 2, max: 78 }),
    rain: faker.number.int({ min: 65, max: 75 }),
  };

  storeWeatherData(generatedWeatherData).catch(console.error);

  // Return weather data
  return generatedWeatherData;
};

// New function to fetch air quality data from the AQI API
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
