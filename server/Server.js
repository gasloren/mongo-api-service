const express = require('express');

const Mongo = require('./Mongo');
const Routes = require('./Routes');

// -------------------------------------------

class Server {

  constructor() {
    this.port = process.env.PORT;
    this.mongoUri = process.env.MONGO_URI;
    this.database = process.env.DATABASE;
    this.app = express();
    this.mongo = new Mongo();
    this.appMiddlewares();
    this.routes = new Routes(this.app, this.mongo);
  }

  appMiddlewares() {
    this.app.use(express.json());
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Mongo API listening on port ${this.port}`);
    });
  }

  onExit() {
    // listen for the signal interruption (ctrl-c) or error
    // configure "kill_timeout : 3000" on ecosystem.config.js
    // and "listen_timeout: 10000"
    process.on('SIGINT', (err) => {
      this.mongo.close();
      console.log('exit server');
      process.exit(err ? 1 : 0);
    });
  }

};

module.exports = Server;