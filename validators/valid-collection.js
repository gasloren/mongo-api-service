const { body } = require('express-validator');

// -----------------------------------------

const validCollection = [
  body('collection', 'collection must exits').exists(),
  body('collection', 'collection must be a string').isString(),
  body('collection', 'collection can not be empty').notEmpty()
];

module.exports = validCollection;