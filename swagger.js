const swaggerAutogen = require('swagger-autogen');

const doc = {
   info: {
    title: 'Users API',
    version: '1.0.0',
    description: 'A simple Express API for managing users stored in a MongoDB database.',
  },
      host: 'https://cse341project-h93z.onrender.com',
      description: 'Local development server',
      schemes: ['https', 'http']
    };
const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

//this will generate your swagger.json file
swaggerAutogen(outputFile, endpointsFiles, doc);