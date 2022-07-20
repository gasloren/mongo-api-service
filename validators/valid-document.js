const { body } = require('express-validator');

// -----------------------------------------

const validDocument = [
  body('document', 'document must exists').exists(),
  body('document', 'document must be an object').isObject(),
  body('document', 'document can not be empty').custom(doc => {
    return !!Object.keys(doc).length;
  })
];

module.exports = validDocument;