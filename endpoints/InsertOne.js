const validApiKeyToken = require('../validators/valid-api-key-token');
const validCollectionName = require('../validators/valid-collection-name');
const validInsertData = require('../validators/valid-insert-data');
const checkErrors = require('../validators/check-erros');

const insertOne = require('../controllers/insert-one');

// --------------------------------------------

class InsertOne {

  constructor(server, mongo) {
    this.path = '/insert-one';
    this.dbName = process.env.DATABASE;
    this.server = server;
    this.mongo = mongo;
    this.route();
  }

  route() {
    this.server.post(
      this.path,
      [
        ...validApiKeyToken,
        ...validCollectionName,
        ...validInsertData,
        checkErrors
      ],
      async (req, res) => {
        const result = await getList(this.mongo, this.dbName, req.body);
        res.status(!result.error ? 200 : 404).json(result);
      }
    );
  }

};

module.exports = InsertOne;