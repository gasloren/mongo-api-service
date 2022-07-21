const { MongoClient } = require("mongodb");

// -------------------------------------------

class Mongo {

  constructor() {
    this.mongoUri = process.env.MONGO_URI;
    this.mongo = new MongoClient(this.mongoUri);
    this.database = process.env.DATABASE;
  }

  async _handle(collection, execute) {
    try {
      await this.mongo.connect();
      const db = this.mongo.db(this.database);
      const cursor = db.collection(collection);
      const data = await execute(cursor);
      return {
        data
      };
    } catch (error) {
      return {
        error
      };
    } finally {
      await this.mongo.close();
    }
  }

  // GET ITEM
  async getItem({ collection, filters, options }) {
    return await this._handle(collection, (cursor) => {
      return cursor.findOne(filters, options);
    });
  }

  // GET LIST
  async getList({ collection, filters, options }) {
    return await this._handle(collection, (cursor) => {
      return cursor.find(filters, options).toArray();
    });
  }

  // INSERT ONE
  async insertOne({ collection, document }) {
    return await this._handle(collection, (cursor) => {
      return cursor.insertOne(document);
    });
  }

  // UPDATE ALL
  async updateAll({ collection, filters, document }) {
    return await this._handle(collection, (cursor) => {
      return cursor.updateMany(filters, { $set: document });
    });
  }

  // REMOVE ALL
  async removeAll({ collection, filters }) {
    return await this._handle(collection, (cursor) => {
      return cursor.deleteMany(filters);
    });
  }

  // AGGREGATE PIPELINE
  async aggregate({ collection, pipeline }) {
    return await this._handle(collection, (cursor) => {
      return cursor.aggregate(pipeline).toArray();
    });
  }

};

module.exports = Mongo;