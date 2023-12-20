const express = require("express");
const routes = express.Router();
const { 
    getAsignaturas, 
    getAsignaturasById,
    createAsig,
    updateAsig,
    deleteAsig,
 } = require("../controllers/asignaturas.controller.js");
// Ruta para mostrar todas las asignaturas
routes.get("/", getAsignaturas);
//Ruta para obtener datos de una asignatura por su ID
routes.get("/byid/:id", getAsignaturasById);
//Ruta para crear una asignatura
routes.post("/add", createAsig);
//Ruta para actualizar una asignatura
routes.put("/update/:id", updateAsig);
//Ruta para eliminar una asignatura
routes.delete("/delete/:id", deleteAsig);
module.exports = routes;
