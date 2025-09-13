const express = require('express');
const router = express.Router();

router.use('/', require('./swagger')); // Route for Swagger documentation

router.get('/', (req, res) => {
  //#swagger.tags = ['Users']
  res.send('Hello World!');
});

router.use('/users', require('./users')); // Example of using another route file

module.exports = router; // Make sure you are exporting the router object