const { body } = require('express-validator');

// -----------------------------------------

const validInsertData = [
  body('insertData').exists(),
  body('insertData').isObject()
];

module.exports = validInsertData;