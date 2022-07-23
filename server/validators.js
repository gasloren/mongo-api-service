const { header, body, validationResult } = require('express-validator');
const { ObjectId } = require('mongodb');

const { NODE_ENV, API_KEY } = process.env;
const isDev = NODE_ENV !== 'production';

// ----------------------------------------------

const validators = {

  validApiKey: [
    header('Api-Key', 'Api-Key must exists').exists(),
    header('Api-Key', 'Api-Key must be a string').isString(),
    header('Api-Key', 'Api-Key can not be empty').notEmpty(),
    header('Api-Key', 'Api-Key does not match').equals(API_KEY)
  ],

  validCollection: [
    body('collection', 'collection must exits').exists(),
    body('collection', 'collection must be a string').isString(),
    body('collection', 'collection can not be empty').notEmpty()
  ],

  validDocument: [
    body('document', 'document must exists').exists(),
    body('document', 'document must be an object').isObject(),
    body('document', 'document can not be empty').custom(doc => {
      return !!Object.keys(doc).length;
    }),
    body('document').customSanitizer(({ _id, ...doc }) => doc) // no permito un custom _id
  ],

  validFilters: [
    body('filters', 'filters must exists').exists(),
    body('filters', 'filters must be an object').isObject(),
    body('filters._id', '_id must be an MongoId').custom(_id => {
      return !_id || ObjectId.isValid(_id);
    })
  ],
  
  validOptions: [
    body('options', 'options must exists').exists(),
    body('options', 'options must be an object').isObject()
  ],

  validPipeline: [
    body('pipeline', 'pipeline must exists').exists(),
    body('pipeline', 'pipeline must be an array').isArray(),
    body('pipeline', 'pipeline can not be empty').custom(pipe => !!pipe[0])
  ],

  checkErrors: (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // console.log(errors.array()[0]);
      return res.status(400).json({
        error: isDev ? errors.array()[0] : 'Request errors!'
      });
    }
    next();
  }

};

module.exports = validators;
