// Importing the param function from express-validator
import { param } from "express-validator";

// Validating the city name parameter
export const validateCityName = param("city");
