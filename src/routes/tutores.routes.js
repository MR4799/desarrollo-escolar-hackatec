const express = require("express");
const routes = express.Router();
const { 
    getTutores,
    getTutorById,
    createTutor,
    updateTutor,
    deleteTutor,
 } = require("../controllers/tutores.controller.js");
// Ruta para mostrar todos los tutores
routes.get("/", getTutores);
//Ruta para obtener datos de un tutor por su ID
routes.get("/byid/:id", getTutorById);
//Ruta para crear un tutor
routes.post("/add", createTutor);
//Ruta para actualizar un tutor
routes.put("/update/:id", updateTutor);
//Ruta para eliminar un tutor
routes.delete("/delete/:id", deleteTutor);
module.exports = routes;
