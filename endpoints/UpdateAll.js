const validAuthApiKeyToken = require('../validators/valid-auth-api-key-token');
const validCollectionName = require('../validators/valid-collection-name');
const validSelectorObj = require('../validators/valid-selector-obj');
const validUpdateData = require('../validators/valid-update-data');
const checkErrors = require('../validators/check-errors');

const updateAll = require('../controllers/update-all');

// --------------------------------------------

class UpdateAll {

  constructor(server, mongo) {
    this.path = '/mongo/update/all';
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
        ...validUpdateData,
        checkErrors
      ],
      async (req, res) => {
        const result = await updateAll(this.mongo, this.dbName, req.body);
        res.status(!result.error ? 200 : 404).json(result);
      }
    );
  }

};

module.exports = UpdateAll;