const express = require("express");
const routes = express.Router();
const { 
    getAlumnos, 
    getAlumnoById,
    createAlumno,
    updateAlumno,
    deleteAlumno,
 } = require("../controllers/alumnos.controller.js");
// Ruta para mostrar todos los alumnos
routes.get("/", getAlumnos);
//Ruta para obtener datos de un alumno por su ID
routes.get("/byid/:id", getAlumnoById);
//Ruta para crear un alumno
routes.post("/add", createAlumno);
//Ruta para actualizar un alumno
routes.put("/update/:id", updateAlumno);
//Ruta para eliminar un alumno
routes.delete("/delete/:id", deleteAlumno);
module.exports = routes;
