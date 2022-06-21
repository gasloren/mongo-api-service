const { body } = require('express-validator');

// -----------------------------------------

const validSelectorObj = [
  body('selectorObj').exists(),
  body('selectorObj').isObject()
];

module.exports = validSelectorObj;
