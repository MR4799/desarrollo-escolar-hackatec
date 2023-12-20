const express = require("express");
const routes = express.Router();
const { 
    getComm,
    getCommById,
    createComm,
    updateComm,
    deleteComm,
 } = require("../controllers/comunicados.controller.js");
// Ruta para mostrar todos los comunicados
routes.get("/", getComm);
//Ruta para obtener datos de un comunicado por su ID
routes.get("/byid/:id", getCommById);
//Ruta para crear un comunicado
routes.post("/add", createComm);
//Ruta para actualizar un comunicado
routes.put("/update/:id", updateComm);
//Ruta para eliminar un comunicado
routes.delete("/delete/:id", deleteComm);
module.exports = routes;
