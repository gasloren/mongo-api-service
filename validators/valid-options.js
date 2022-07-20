const { body } = require('express-validator');

// -----------------------------------------

const validOptions = [
  body('options', 'options must exists').exists(),
  body('options', 'options must be an object').isObject()
];

module.exports = validOptions;