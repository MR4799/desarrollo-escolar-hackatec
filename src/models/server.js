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
    this.app.use('/asignaturas', require('../routes/asignaturas.routes.js'))
    this.app.use('/grupos', require('../routes/grupos.routes.js'))
    this.app.use('/alumnos', require('../routes/alumnos.routes.js'))
    this.app.use('/calificaciones', require('../routes/calificaciones.routes.js'))
    this.app.use('/profesores', require('../routes/profesores.routes.js'))
    this.app.use('/tutores', require('../routes/tutores.routes.js'))
    this.app.use('/comunicados', require('../routes/comunicados.routes.js'))
    this.app.use('/horarios', require('../routes/horarios.routes.js'))
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
