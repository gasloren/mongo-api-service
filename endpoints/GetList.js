const validApiKeyToken = require('../validators/valid-api-key-token');
const validCollectionName = require('../validators/valid-collection-name');
const validSelectorObj = require('../validators/valid-selector-obj');
const validModifierObj = require('../validators/valid-modifier-obj');
const checkErrors = require('../validators/check-erros');

const getList = require('../controllers/get-list');

// --------------------------------------------

class GetList {

  constructor(server, mongo) {
    this.path = '/get-list';
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
        ...validSelectorObj,
        ...validModifierObj,
        checkErrors
      ],
      async (req, res) => {
        const result = await getList(this.mongo, this.dbName, req.body);
        res.status(!result.fail ? 200 : 404).json(result);
      }
    );
  }

};

module.exports = GetList;