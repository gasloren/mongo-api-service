const { body } = require('express-validator');

// -----------------------------------------

const validFilters = [
  body('filters', 'filters must exists').exists(),
  body('filters', 'filters must be an object').isObject()
];

module.exports = validFilters;
