// /config/swaggerConfig.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger options
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Documentation',
      version: '1.0.0',
      description: 'Description of your API',
    },
    servers: [
      {
        url: 'http://localhost:3000/',
        description: 'Local Server',
      },
      // Add more servers if needed
    ],
  },
  // Path to the API routes
  apis: ['./routes/*.js'], // Update the path based on your project structure
};

// Initialize Swagger-jsdoc
const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = { swaggerSpec, swaggerUi, swaggerJsdoc };
