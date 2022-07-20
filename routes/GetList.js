const validApiKey = require('../validators/valid-api-key');
const validCollection = require('../validators/valid-collection');
const validFilters = require('../validators/valid-filters');
const validOptions = require('../validators/valid-options');
const checkErrors = require('../validators/check-errors');

// --------------------------------------------

class GetList {

  constructor(server, mongo) {
    this.path = '/mongo/get/list';
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
        ...validOptions,
        checkErrors
      ],
      async (req, res) => {
        const result = await this.mongo.getList(req.body);
        res.status(!result.error ? 200 : 404).json(result);
      }
    );
  }

};

module.exports = GetList;