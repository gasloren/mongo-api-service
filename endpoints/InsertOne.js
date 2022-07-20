const validApiKey = require('../validators/valid-api-key');
const validCollection = require('../validators/valid-collection');
const validDocument = require('../validators/valid-document');
const checkErrors = require('../validators/check-errors');

// --------------------------------------------

class InsertOne {

  constructor(server, mongo) {
    this.path = '/mongo/insert/one';
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
        ...validDocument,
        checkErrors
      ],
      async (req, res) => {
        const result = await this.mongo.insertOne(req.body);
        res.status(!result.error ? 200 : 404).json(result);
      }
    );
  }

};

module.exports = InsertOne;