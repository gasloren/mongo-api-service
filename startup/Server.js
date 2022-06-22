const express = require('express');

const { MongoClient } = require("mongodb");

const Routes = require('./Routes');

// -------------------------------------------

class Server {

  constructor() {
    this.port = process.env.PORT;
    this.mongoUri = process.env.MONGO_URI;
    this.database = process.env.DATABASE;
    this.server = express();
    this.mongo = new MongoClient(this.mongoUri);
    this.middlewares();
    this.routes = new Routes(this.server, this.mongo);
  }

  middlewares() {
    this.server.use(express.json());
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Mongo API listening on port ${this.port}`);
    });
  }

  onExit() {
    // listen for the signal interruption (ctrl-c) or error
    // configure "kill_timeout : 3000" on ecosystem.config.js
    // and "listen_timeout: 10000"
    process.on('SIGINT', () => {
      db.stop((err) => {
        console.log('exit server');
        process.exit(err ? 1 : 0);
      })
    });
  }

};

module.exports = Server;