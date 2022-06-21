const { body } = require('express-validator');

// -----------------------------------------

const validCollectionName = [
  body('collectionName').exists(),
  body('collectionName').isString(),
  body('collectionName').notEmpty()
];

module.exports = validCollectionName;