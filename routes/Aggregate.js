const validApiKey = require('../validators/valid-api-key');
const validCollection = require('../validators/valid-collection');
const validPipeline = require('../validators/valid-pipeline');
const checkErrors = require('../validators/check-errors');

// --------------------------------------------

class Aggregate {

  constructor(server, mongo) {
    this.path = '/mongo/aggregate';
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
        ...validPipeline,
        checkErrors
      ],
      async (req, res) => {
        const result = await this.mongo.aggregate(req.body);
        res.status(!result.error ? 200 : 404).json(result);
      }
    );
  }

};

module.exports = Aggregate;