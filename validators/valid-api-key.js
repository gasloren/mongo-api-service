const { header } = require('express-validator');

const apiKey = process.env.API_KEY;

// -----------------------------------------

const validApiKey = [
  header('Api-Key', 'Api-Key must exists').exists(),
  header('Api-Key', 'Api-Key must be a string').isString(),
  header('Api-Key', 'Api-Key can not be empty').notEmpty(),
  header('Api-Key', 'Api-Key does not match').equals(apiKey)
];

module.exports = validApiKey;