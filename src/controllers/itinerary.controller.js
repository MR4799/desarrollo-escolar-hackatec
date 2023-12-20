const { request, response } = require("express");
const promisePool = require("../database/connect.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateID = require("../utils/generateID.js");

//Controlador para obtener datos de todos los itinerarios
async function getItinerary(req = request, res = response) {
    try {
      const [itin] = await promisePool.query(
        "SELECT id, act, start_time, end_time, id_invitation FROM itinerary"
      );
      if (!itin.length)
        return res.status(200).json({
        ok: false,
        status: 200,
        message: "No existen actividades para mostrar",
    });
      return res.status(200).json({
        ok: true,
        status: 200,
        message: 'Itinerarios obtenidos correctamente',
        itin
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        status: 500,
        message: 'Error al obtener los itinerarios',
        error,
      });
    }
  }

  //Controlador para obtener datos de un itinerario por ID
  async function getItineraryByInv(req = request, res = response) {
    try {
        const {id} = req.params;
      const [itin] = await promisePool.query(
        "SELECT id, act, start_time, end_time, id_invitation FROM itinerary WHERE id_invitation = ?",
        [id]
      );
      if (!itin.length)
        return res.status(200).json({
        ok: false,
        status: 200,
        message: "No existen itinerarios para mostrar",
    });
      return res.status(200).json({
        ok: true,
        status: 200,
        message: 'Itinerarios obtenidos correctamente',
        itin
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        status: 500,
        message: 'Error al obtener los itinerarios',
        error,
      });
    }
  }

  //Controlador para crear datos de un itinerario
  async function createItinerary(req = request, res = response) {
    try {
      let { act, start_time, end_time, id_invitation  } = req.body;
      const idGenerate = generateID();
      if (!act || !start_time || !end_time ||!id_invitation)
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "Todos los datos son requeridos"
          },
        });
      // verificamos que el horario esté disponible
      const [itin] = await promisePool.query(
        "SELECT id FROM itinerary WHERE id_invitation = ? AND start_time = ?",
        [id_invitation.trim(), start_time.trim()]
      );
      if (itin.length)
        return res.status(400).json({
          info: {
            ok: true,
            status: 400,
            message: "El horario ya está ocupado"
          },
        });
        const [inv] = await promisePool.query(
            "SELECT id FROM invitations WHERE id = ?",
            [id_invitation.trim()]
          );
          if (!inv.length)
            return res.status(400).json({
              info: {
                ok: true,
                status: 400,
                message: "La invitación no existe"
              },
            });
      //creamos el itinerario
      await promisePool.query("INSERT INTO itinerary SET ?", [
        {
          id: idGenerate,
          act: act.trim(),
          start_time: start_time.trim(),
          end_time: end_time.trim(),
          id_invitation: id_invitation.trim(),
          ...req.body,
        },
      ]);
        return res
          .status(200)
          .json({
            info: {
              ok: true,
              stattus: 200,
              message: "Actividad agregada Correctamente"
            },
            data: {
                id: idGenerate,
                act: act.trim(),
                start_time: start_time.trim(),
                end_time: end_time.trim(),
                id_invitation: id_invitation.trim(),
            },
          });
  
    } catch (error) {
      return res.status(500).json({
        info: {
          ok: false,
          status: 500,
          message: error
        },
      });
    }
  }

  //Controlador para actualizar datos de un itinerario
  async function updateItinerary(req = request, res = response) {
    const { id } = req.params;
    try {
      // Verificamos que la actividad exista
      const [itin] = await promisePool.query(
        "SELECT id FROM itinerary WHERE id = ?",
        [id]
      );
      if (!itin.length)
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "La actividad no existe",
          },
        });
      await promisePool.query("UPDATE itinerary SET ? WHERE id = ?", [
        { ...req.body },
        id,
      ]);
      return res.status(200).json({
        info: {
          ok: true,
          status: 200,
          message: "Actividad Actualizada Correctamente",
        },
      });
    } catch (error) {
      return res.status(500).json({
        info: {
          ok: false,
          status: 500,
          message: "Error al actualizar la actividad",
          error,
        },
      });
    }
  }

  //Controlador para eliminar datos de un itinerario
  async function deleteItinerary(req = request, res = response) {
    const { id } = req.params;
    try {
      // Verificamos que la actividad exista
      const [itin] = await promisePool.query(
        "SELECT id FROM itinerary WHERE id = ?",
        [id]
      );
      if (!itin.length)
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "La actividad no existe",
          },
        });
      await promisePool.query("DELETE FROM itinerary WHERE id = ?", [id]);
      return res.status(200).json({
        info: {
          ok: true,
          status: 200,
          message: "Actividad Eliminada Correctamente",
        },
      });
    } catch (error) {
      return res.status(500).json({
        info: {
          ok: false,
          status: 500,
          message: "Error al Eliminar la actividad",
          error,
        },
      });
    }
  }

  //Controlador para eliminar datos los itinerarios por ID de invitación
  async function deleteItineraryByInv(req = request, res = response) {
    const { id } = req.params;
    try {
      // Verificamos que la actividad exista
      const [itin] = await promisePool.query(
        "SELECT id FROM itinerary WHERE id_invitation = ?",
        [id]
      );
      if (!itin.length)
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "El itinerario no existe",
          },
        });
      await promisePool.query("DELETE FROM itinerary WHERE id_invitation = ?", [id]);
      return res.status(200).json({
        info: {
          ok: true,
          status: 200,
          message: "Itinerario Eliminado Correctamente",
        },
      });
    } catch (error) {
      return res.status(500).json({
        info: {
          ok: false,
          status: 500,
          message: "Error al Eliminar el itinerario",
          error,
        },
      });
    }
  }

  module.exports = {
    getItinerary,
    getItineraryByInv,
    createItinerary,
    updateItinerary,
    deleteItinerary,
    deleteItineraryByInv,
  }