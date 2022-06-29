const validApiKey = require('../validators/valid-api-key');
const validCollectionName = require('../validators/valid-collection-name');
const validSelectorObj = require('../validators/valid-selector-obj');
const validModifierObj = require('../validators/valid-modifier-obj');
const checkErrors = require('../validators/check-errors');

const getList = require('../controllers/get-list');

// --------------------------------------------

class GetList {

  constructor(server, mongo) {
    this.path = '/mongo/get/list';
    this.dbName = process.env.DATABASE;
    this.server = server;
    this.mongo = mongo;
    this.route();
  }

  route() {
    this.server.post(
      this.path,
      [
        ...validApiKey,
        ...validCollectionName,
        ...validSelectorObj,
        ...validModifierObj,
        checkErrors
      ],
      async (req, res) => {
        const result = await getList(this.mongo, this.dbName, req.body);
        res.status(!result.error ? 200 : 404).json(result);
      }
    );
  }

};

module.exports = GetList;