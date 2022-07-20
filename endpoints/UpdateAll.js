const validApiKey = require('../validators/valid-api-key');
const validCollection = require('../validators/valid-collection');
const validFilters = require('../validators/valid-filters');
const validDocument = require('../validators/valid-document');
const checkErrors = require('../validators/check-errors');

// --------------------------------------------

class UpdateAll {

  constructor(server, mongo) {
    this.path = '/mongo/update/all';
    this.server = server;
    this.mongo = mongo;
    this.route();
  }

  route() {
    this.server.post(
      this.path,
      [
        ...validApiKey,
        ...validCollection,
        ...validFilters,
        ...validDocument,
        checkErrors
      ],
      async (req, res) => {
        const result = await this.mongo.updateAll(req.body);
        res.status(!result.error ? 200 : 404).json(result);
      }
    );
  }

};

module.exports = UpdateAll;