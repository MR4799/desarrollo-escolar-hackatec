const express = require("express");
const routes = express.Router();
const { 
    getGrupos, 
    getGruposById,
    createGrupo,
    updateGrupo,
    deleteGrupo,
 } = require("../controllers/grupos.controller.js");
// Ruta para mostrar todos los grupos
routes.get("/", getGrupos);
//Ruta para obtener datos de un grupo por su ID
routes.get("/byid/:id", getGruposById);
//Ruta para crear un grupo
routes.post("/add", createGrupo);
//Ruta para actualizar un grupo
routes.put("/update/:id", updateGrupo);
//Ruta para eliminar una asignatura
routes.delete("/delete/:id", deleteGrupo);
module.exports = routes;
