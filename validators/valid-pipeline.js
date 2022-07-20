const { body } = require('express-validator');

// -----------------------------------------

const validPipeline = [
  body('pipeline', 'pipeline must exists').exists(),
  body('pipeline', 'pipeline must be an array').isArray(),
  body('pipeline', 'pipeline can not be empty').custom(pipe => !!pipe[0])
];

module.exports = validPipeline;