const validApiKey = require('../validators/valid-api-key');
const validCollection = require('../validators/valid-collection');
const validFilters = require('../validators/valid-filters');
const checkErrors = require('../validators/check-errors');

// --------------------------------------------

class RemoveAll {

  constructor(server, mongo) {
    this.path = '/mongo/remove/all';
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
        checkErrors
      ],
      async (req, res) => {
        const result = await this.mongo.removeAll(req.body);
        res.status(!result.error ? 200 : 404).json(result);
      }
    );
  }

};

module.exports = RemoveAll;