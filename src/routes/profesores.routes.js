const express = require("express");
const routes = express.Router();
const isAuthenticated = require("../middlewares/authentication.middleware");
const { 
    getProfesores,
    getProfesorById,
    createProfesor,
    updateProfesor,
    deleteProfesor,
    login,
    logout,
    isLogin,
 } = require("../controllers/profesores.controller.js");
// Ruta para mostrar todos los profesores
routes.get("/", getProfesores);
//Ruta para obtener datos de un profesor por su ID
routes.get("/byid/:id", getProfesorById);
//Ruta para crear un profesor
routes.post("/add", createProfesor);
//Ruta para actualizar un profesor
routes.put("/update/:id", updateProfesor);
//Ruta para eliminar un profesor
routes.delete("/delete/:id", deleteProfesor);
// Ruta para hacer login a un usuario
routes.post("/login", login);
// Ruta para cerrar sesión
routes.get("/logout", logout);
// Ruta para comprobar si el usuario está autenticado
routes.get("/islogin", isAuthenticated, isLogin);
module.exports = routes;
