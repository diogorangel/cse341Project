const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.use('/users', require('./users')); // Example of using another route file

module.exports = router; // Make sure you are exporting the router object