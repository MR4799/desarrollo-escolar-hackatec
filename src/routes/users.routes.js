const express = require("express");
const routes = express.Router();
const isAuthenticated = require("../middlewares/authentication.middleware");
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  login,
  logout,
  isLogin,
  getUserById,
} = require("../controllers/users.controller.js");
// Ruta para mostrar todos los usuarios
routes.get("/", getUsers);
// Ruta para mostrar un usuario
routes.get("/:id", getUserById);
// Ruta para crear un usuario
routes.post("/add", createUser);
// Ruta para actualizar un usuario
routes.put("/update/:id", updateUser);
// Ruta para eliminar un usuario
routes.delete("/delete/:id", deleteUser);
// Ruta para hacer login a un usuario
routes.post("/login", login);
// Ruta para cerrar sesión
routes.get("/logout", logout);
// Ruta para comprobar si el usuario está autenticado
routes.get("/islogin", isAuthenticated, isLogin);
module.exports = routes;
