const { body } = require('express-validator');

// -----------------------------------------

const validUpdateData = [
  body('updateData').exists(),
  body('updateData').isObject()
];

module.exports = validUpdateData;