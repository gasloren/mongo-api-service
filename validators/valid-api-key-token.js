const { header } = require('express-validator');

const apiKeyToken = process.env.API_KEY_TOKEN;

// -----------------------------------------

const validApiKeyToken = [
  header('api-key-token').exists(),
  header('api-key-token').isString(),
  header('api-key-token').notEmpty(),
  header('api-key-token').equals(apiKeyToken)
];

module.exports = validApiKeyToken;