const express = require("express");
const routes = express.Router();
const isAuthenticated = require("../middlewares/authentication.middleware");
const {
  getItinerary,
  createItinerary,
  updateItinerary,
  deleteItinerary,
  getItineraryByInv,
  deleteItineraryByInv,
} = require("../controllers/itinerary.controller.js");
// Ruta para mostrar todos los itinerarios
routes.get("/", getItinerary);
// Ruta para mostrar todos los itinerarios
routes.get("/byinv/:id", getItineraryByInv);
// Ruta para crear una actividad
routes.post("/add", createItinerary);
// Ruta para actualizar una actividad
routes.put("/update/:id", updateItinerary);
// Ruta para eliminar una actividad
routes.delete("/delete/:id", deleteItinerary);
// Ruta para eliminar un itinerario
routes.delete("/delete/byinv/:id", deleteItineraryByInv);
module.exports = routes;
