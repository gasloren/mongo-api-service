const validAuthApiKeyToken = require('../validators/valid-auth-api-key-token');
const validCollectionName = require('../validators/valid-collection-name');
const validInsertData = require('../validators/valid-insert-data');
const checkErrors = require('../validators/check-errors');

const insertOne = require('../controllers/insert-one');

// --------------------------------------------

class InsertOne {

  constructor(server, mongo) {
    this.path = '/mongo/insert-one';
    this.dbName = process.env.DATABASE;
    this.server = server;
    this.mongo = mongo;
    this.route();
  }

  route() {
    this.server.post(
      this.path,
      [
        ...validAuthApiKeyToken,
        ...validCollectionName,
        ...validInsertData,
        checkErrors
      ],
      async (req, res) => {
        const result = await insertOne(this.mongo, this.dbName, req.body);
        res.status(!result.error ? 200 : 404).json(result);
      }
    );
  }

};

module.exports = InsertOne;