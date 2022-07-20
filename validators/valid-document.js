const { body } = require('express-validator');

// -----------------------------------------

const validDocument = [
  body('document', 'document must exists').exists(),
  body('document', 'document must be an object').isObject()
];

module.exports = validDocument;