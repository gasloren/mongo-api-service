const validCollectionName = require('../validators/valid-collection-name');
const validSelectorObj = require('../validators/valid-selector-obj');
const checkErrors = require('../validators/check-erros');

const getItem = require('../controllers/get-item');

// --------------------------------------------

class GetItem {

  constructor(server, mongo) {
    this.path = '/get-item';
    this.dbName = process.env.DATABASE;
    this.server = server;
    this.mongo = mongo;
    this.route();
  }

  route() {
    this.server.post(
      this.path,
      [
        ...validCollectionName,
        ...validSelectorObj,
        checkErrors
      ],
      async (req, res) => {
        const result = await getItem(this.mongo, this.dbName, req.body);
        res.status(!result.fail ? 200 : 404).json(result);
      }
    );
  }

};

module.exports = GetItem;