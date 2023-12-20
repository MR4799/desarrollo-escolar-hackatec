const express = require('express');
const cors = require('cors');
const path = require('path');
class Server {
  constructor() {
    this.app = express();
    this.middlewares();
    this.port = process.env.PORT;
    this.routes();
    this.server = require("http").createServer(this.app);
  }
  routes() {
    this.app.use(express.static(path.join(__dirname,'../static')));
    this.app.use('/users', require('../routes/users.routes.js'))
    this.app.use('/invitations', require('../routes/invitations.routes.js'))
    this.app.use('/itinerary', require('../routes/itinerary.routes.js'))
    this.app.use('/guests', require('../routes/guests.routes.js'))
    this.app.use('/details', require('../routes/details.routes.js'))
  }
  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }
  listen() {
    this.server.listen(this.port, () => {
      console.log(`Server listening on port` , this.port);
    });
  }
}
module.exports = Server;
