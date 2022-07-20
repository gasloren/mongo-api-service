const GetItem   = require('../routes/GetItem');
const GetList   = require('../routes/GetList');
const InsertOne = require('../routes/InsertOne');
const UpdateAll = require('../routes/UpdateAll');
const RemoveAll = require('../routes/RemoveAll');
const Aggregate = require('../routes/Aggregate');

// --------------------------------------------

class Routes {

  constructor(server, mongo) {
    this.GetItem   = new GetItem(server, mongo);
    this.getList   = new GetList(server, mongo);
    this.insertOne = new InsertOne(server, mongo);
    this.updateAll = new UpdateAll(server, mongo);
    this.removeAll = new RemoveAll(server, mongo);
    this.aggregate = new Aggregate(server, mongo);
  }

};

module.exports = Routes;