const { validationResult } = require('express-validator');

const { NODE_ENV } = process.env;
const isDev = NODE_ENV !== 'production';

// ----------------------------------------------

const checkErrors = (req, res, next) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: isDev ? errors.array()[0] : 'Request errors!'
    });
  }

  next();

};

module.exports = checkErrors;