const validators = require('./validators');

// --------------------------------------------

class Routes {

  constructor(app, mongo) {
    this.app = app;
    this.mongo = mongo;
    this.getItem('/mongo/get/item');            // POST
    this.getList('/mongo/get/list');            // POST
    this.insertOne('/mongo/insert/one');        // POST
    this.updateAll('/mongo/update/all');        // POST
    this.removeAll('/mongo/remove/all');        // POST
    this.aggregate('/mongo/aggregate');         // POST
  }

  getItem(path) {
    this.app.post(
      path,
      [
        ...validators.validApiKey,
        ...validators.validCollection,
        ...validators.validFilters,
        ...validators.validOptions,
        validators.checkErrors
      ],
      async (req, res) => {
        const result = await this.mongo.getItem(req.body);
        res.status(!result.error ? 200 : 404).json(result);
      }
    );
  }

  getList(path) {
    this.app.post(
      path,
      [
        ...validators.validApiKey,
        ...validators.validCollection,
        ...validators.validFilters,
        ...validators.validOptions,
        validators.checkErrors
      ],
      async (req, res) => {
        const result = await this.mongo.getList(req.body);
        res.status(!result.error ? 200 : 404).json(result);
      }
    );
  }

  insertOne(path) {
    this.app.post(
      path,
      [
        ...validators.validApiKey,
        ...validators.validCollection,
        ...validators.validDocument,
        validators.checkErrors
      ],
      async (req, res) => {
        const result = await this.mongo.insertOne(req.body);
        res.status(!result.error ? 200 : 404).json(result);
      }
    );
  }

  updateAll(path) {
    this.app.post(
      path,
      [
        ...validators.validApiKey,
        ...validators.validCollection,
        ...validators.validFilters,
        ...validators.validDocument,
        validators.checkErrors
      ],
      async (req, res) => {
        const result = await this.mongo.updateAll(req.body);
        res.status(!result.error ? 200 : 404).json(result);
      }
    );
  }

  removeAll(path) {
    this.app.post(
      path,
      [
        ...validators.validApiKey,
        ...validators.validCollection,
        ...validators.validFilters,
        validators.checkErrors
      ],
      async (req, res) => {
        const result = await this.mongo.removeAll(req.body);
        res.status(!result.error ? 200 : 404).json(result);
      }
    );
  }

  aggregate(path) {
    this.app.post(
      path,
      [
        ...validators.validApiKey,
        ...validators.validCollection,
        ...validators.validPipeline,
        validators.checkErrors
      ],
      async (req, res) => {
        const result = await this.mongo.aggregate(req.body);
        res.status(!result.error ? 200 : 404).json(result);
      }
    );
  }

};

module.exports = Routes;