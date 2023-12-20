const express = require("express");
const routes = express.Router();
const isAuthenticated = require("../middlewares/authentication.middleware");
const {
  getGuests,
  createGuest,
  updateGuest,
  deleteGuest,
  getGuestById,
  getGuestByInv,
  deleteGuestsByInv,
} = require("../controllers/guests.controller.js");
// Ruta para mostrar todos los invitados
routes.get("/", getGuests);
// Ruta para mostrar un invitado por ID
routes.get("/byid/:id", getGuestById);
// Ruta para mostrar todos los invitados por ID de invitación
routes.get("/byinv/:id", getGuestByInv);
// Ruta para crear un invitado
routes.post("/add", createGuest);
// Ruta para actualizar un invitado
routes.put("/update/:id", updateGuest);
// Ruta para eliminar un invitado
routes.delete("/delete/:id", deleteGuest);
// Ruta para eliminar invitados por ID de invitación 
routes.delete("/delete/byinv/:id", deleteGuestsByInv);
module.exports = routes;
