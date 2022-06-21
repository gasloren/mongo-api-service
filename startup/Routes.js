const GetItem   = require('../endpoints/GetItem');
const GetList   = require('../endpoints/GetList');
const InsertOne = require('../endpoints/InsertOne');
const UpdateAll = require('../endpoints/UpdateAll');
const RemoveAll = require('../endpoints/RemoveAll');

// --------------------------------------------

class Routes {

  constructor(server, mongo) {
    this.getItem   = new GetItem(server, mongo);
    this.getList   = new GetList(server, mongo);
    this.insertOne = new InsertOne(server, mongo);
    this.updateAll = new UpdateAll(server, mongo);
    this.removeAll = new RemoveAll(server, mongo);
  }

};

module.exports = Routes;