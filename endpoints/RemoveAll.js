const validAuthApiKeyToken = require('../validators/valid-auth-api-key-token');
const validCollectionName = require('../validators/valid-collection-name');
const validSelectorObj = require('../validators/valid-selector-obj');
const checkErrors = require('../validators/check-errors');

const removeAll = require('../controllers/remove-all');

// --------------------------------------------

class RemoveAll {

  constructor(server, mongo) {
    this.path = '/remove-all';
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
        ...validSelectorObj,
        checkErrors
      ],
      async (req, res) => {
        const result = await removeAll(this.mongo, this.dbName, req.body);
        res.status(!result.error ? 200 : 404).json(result);
      }
    );
  }

};

module.exports = RemoveAll;