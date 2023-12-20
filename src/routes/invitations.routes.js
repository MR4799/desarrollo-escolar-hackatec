const express = require("express");
const routes = express.Router();
const isAuthenticated = require("../middlewares/authentication.middleware");
const {
  getInvitations,
  createInvitation,
  updateInvitation,
  deleteInvitation,
  getInvitationsByUsr,
  getEvents,
  createEvent,
  deleteEvent,
  updateEvent,
  getInvitationsByUsrDate,
  getInvitationsByUsrType,
  getInvitationsById,
  createImg,
  updateImg,
  deleteImg,
} = require("../controllers/invitations.controller.js");
const multer = require('multer')
const storage = require('../config/multer')
const upload= multer({ dest: "image/"});
// Ruta para mostrar todas las invitaciones
routes.get("/", getInvitations);
// Ruta para mostrar todos los eventos
routes.get("/get/events", getEvents);
// Ruta para mostrar una invitación por ID
routes.get("/byid/:id", getInvitationsById);
// Ruta para mostrar todas las invitaciones del usuario
routes.get("/byusr/:id", getInvitationsByUsr);
// Ruta para mostrar todas las invitaciones del usuario ordenadas por fecha
routes.get("/byusr/date/:id", getInvitationsByUsrDate);
// Ruta para mostrar todas las invitaciones del usuario ordenadas por tipo de evento
routes.get("/byusr/event/:id", getInvitationsByUsrType);
// Ruta para crear una invitación
routes.post("/add", createInvitation);
// Ruta para crear un evento
routes.post("/add/event", createEvent);
// Ruta para crear una imagen
routes.post("/add/img",[upload.single("img")], createImg);
// Ruta para actualizar un evento
routes.put("/update/event/:id", updateEvent);
// Ruta para actualizar una imagen
routes.put("/update/img/:id",[upload.single("img")], updateImg);
// Ruta para actualizar una invitación
routes.put("/update/:id", updateInvitation);
// Ruta para eliminar una invitación
routes.delete("/delete/:id", deleteInvitation);
// Ruta para eliminar eventos
routes.delete("/delete/event/:id", deleteEvent);
// Ruta para eliminar imágenes
routes.delete("/delete/img/:id", deleteImg);
module.exports = routes;
