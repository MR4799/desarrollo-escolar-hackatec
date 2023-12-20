const express = require("express");
const routes = express.Router();
const { 
    getHorario,
    getHorarioById,
    createHorario,
    updateHorario,
    deleteHorario,
 } = require("../controllers/horarios.controller.js");
// Ruta para mostrar todos los horarios
routes.get("/", getHorario);
//Ruta para obtener datos de un horario por su ID
routes.get("/byid/:id", getHorarioById);
//Ruta para crear un horario
routes.post("/add", createHorario);
//Ruta para actualizar un horario
routes.put("/update/:id", updateHorario);
//Ruta para eliminar un horario
routes.delete("/delete/:id", deleteHorario);
module.exports = routes;
