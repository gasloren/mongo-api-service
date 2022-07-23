const Server = require('./server/Server');

// ----------------------------

const server = new Server();

if (process.env.NODE_ENV !== 'test') {
  setTimeout(() => server.listen(), 1000);
} else {
  server.listen();
}

server.onExit();

module.exports = { server }; // <-- for test