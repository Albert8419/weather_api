Air Quality Index (AQI) API

This AQI API is built using Node.js and Express, designed to fetch Air Quality Index (AQI) data for a specified city. It's a demonstration of creating and deploying RESTful APIs with a service layer architecture, using TypeScript for improved code reliability.

Features

Fetch AQI data for any city.

Implemented using Node.js, Express, and TypeScript.

API documentation using Swagger (OpenAPI Specification).

Test API endpoints with Postman.

Installation

To get started with this project, clone the repository and install the dependencies.


git clone https://github.com/Albert8419/aqi-api.git

cd aqi-api

Now install the dependencies.

npm install

Run in Development

To run the AQI API in a development environment, follow these steps:

Start the TypeScript Compiler in Watch Mode:

Open a terminal in the project root directory.

Run the TypeScript compiler in watch mode, which will compile the TypeScript files to JavaScript in real-time as you make changes.

npm run build:watch

Start the Development Server:

Open another terminal while the first one is still running.

Run the development server, which will use the compiled JavaScript files.

npm run dev

This setup allows you to actively develop and test your application with live updates as you save your TypeScript files.

Run Locally

For local running of the AQI API, especially in a production-like environment, follow these steps:

Compile the TypeScript files to JavaScript.

npm run build

Start the server

npm run start