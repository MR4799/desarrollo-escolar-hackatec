const express = require("express");
const routes = express.Router();
const isAuthenticated = require("../middlewares/authentication.middleware");
const { 
    createBodaDet, 
    createXvDet,
    createDetails,
    createGenderDet,
    createDisfracesDet,
    createConcertDet,
    createExpoDet,
    createExcurDet,
    getBd,
    getConcerts,
    getBodas,
    getXv,
    getBautizo,
    getComun,
    getConfirm,
    getGender,
    getDisfraces,
    getBodasPlata,
    getExpo,
    getExcur,
    getBdById,
    getBodasById,
    getConcertById,
    getXvById,
    getBautizoById,
    getComunById,
    getConfirmById,
    getGenderById,
    getDisfracesById,
    getExpoById,
    getExcurById,
    deleteDet,
    deleteDetByInv,
    updateDet,
 } = require("../controllers/details.controller.js");
// Ruta para mostrar todos los cumpleaños
routes.get("/bday", getBd);
// Ruta para mostrar un cumpleaños por ID
routes.get("/bday/:id", getBdById);
// Ruta para mostrar todos los conciertos
routes.get("/concert", getConcerts);
// Ruta para mostrar un concierto por ID
routes.get("/concert", getConcerts);
// Ruta para mostrar un concierto por ID
routes.get("/concert/:id", getConcertById);
// Ruta para mostrar todas las bodas
routes.get("/bodas", getBodas);
// Ruta para mostrar todas las bodas de plata
routes.get("/bodasp", getBodasPlata);
// Ruta para mostrar una boda por ID
routes.get("/bodas/:id", getBodasById);
// Ruta para mostrar todos los xv años
routes.get("/xv", getXv);
// Ruta para mostrar xv años por ID
routes.get("/xv/:id", getXvById);
// Ruta para mostrar todos los bautizos
routes.get("/bautizo", getBautizo);
// Ruta para mostrar un bautizo por ID
routes.get("/bautizo/:id", getBautizoById);
// Ruta para mostrar todas las primeras comuniones
routes.get("/comun", getComun);
// Ruta para mostrar primeras comuniones por ID
routes.get("/comun/:id", getComunById);
// Ruta para mostrar todas las confirmaciones
routes.get("/confirm", getConfirm);
// Ruta para mostrar confirmaciones por ID
routes.get("/confirm/:id", getConfirmById);
// Ruta para mostrar todos los gender reveal
routes.get("/gender", getGender);
// Ruta para mostrar un gender reveal por ID
routes.get("/gender/:id", getGenderById);
// Ruta para mostrar todas las fiestas de disfraces
routes.get("/disfraces", getDisfraces);
// Ruta para mostrar fiestas de disfraces por ID
routes.get("/disfraces/:id", getDisfracesById);
// Ruta para mostrar todas las exposiciones
routes.get("/expo", getExpo);
// Ruta para mostrar exposiciones por ID
routes.get("/expo/:id", getExpoById);
// Ruta para mostrar todas las excursiones
routes.get("/excur", getExcur);
// Ruta para mostrar todas las excursiones
routes.get("/excur/:id", getExcurById);
// Ruta para crear la información de una boda o boda de plata
routes.post("/add/boda", createBodaDet);
// Ruta para crear la información de xv años
routes.post("/add/xv", createXvDet);
// Ruta para crear la información de cumpleaños, bautizo, primera comunión y confirmación
routes.post("/add/details", createDetails);
// Ruta para crear la información de gender reveal
routes.post("/add/gender", createGenderDet);
// Ruta para crear la información de fiesta de disfraces
routes.post("/add/disfraces", createDisfracesDet);
// Ruta para crear la información de concierto
routes.post("/add/concert", createConcertDet);
// Ruta para crear la información de exposición
routes.post("/add/expo", createExpoDet);
// Ruta para crear la información de excursión
routes.post("/add/excur", createExcurDet);
// Ruta para actualizar un evento
routes.put("/update/details/:id", updateDet);
// // Ruta para eliminar eventos
routes.delete("/delete/event/:id", deleteDet);
// // Ruta para eliminar eventos por Invitación
routes.delete("/delete/eventbyinv/:id", deleteDetByInv);
module.exports = routes;
