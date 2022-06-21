const { body } = require('express-validator');

// -----------------------------------------

const validModifierObj = [
  body('modifierObj').exists(),
  body('modifierObj').isObject()
];

module.exports = validModifierObj;