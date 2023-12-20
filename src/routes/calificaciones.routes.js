const express = require("express");
const routes = express.Router();
const { 
    getCalifAlumno,
    getCalifByGrupo,
    getCalifAlumnoByAsig,
    createCalif,
    updateCalif,
    deleteCalif,
 } = require("../controllers/calificaciones.controller.js");
// Ruta para mostrar todas las calificaciones de un alumno
routes.get("/byalumno/:id", getCalifAlumno);
//Controlador para obtener calificaciones de los alumnos de un grupo
// routes.get("/bygrupo/:id", getCalifByGrupo);
//Controlador para obtener calificaciones de los alumnos de un grupo
// routes.get("/byalumno/asig/:id", getCalifAlumnoByAsig);
//Ruta para crear una calificación
routes.post("/add", createCalif);
//Ruta para actualizar un alumno
routes.put("/update/:id", updateCalif);
//Ruta para eliminar un registro de calificaciones
routes.delete("/delete/:id", deleteCalif);
module.exports = routes;
