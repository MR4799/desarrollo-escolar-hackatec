const { request, response } = require("express");
const promisePool = require("../database/connect.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateID = require("../utils/generateID.js");

//Controlador para obtener datos de todos los usuarios por ID
async function getGuests(req = request, res = response) {
    try {
      const [guest] = await promisePool.query(
        "SELECT * FROM guests"
      );
      if (!guest.length)
        return res.status(200).json({
        ok: false,
        status: 200,
        message: "No existen invitados para mostrar",
    });
      return res.status(200).json({
        ok: true,
        status: 200,
        message: 'Invitados obtenidos correctamente',
        guest
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        status: 500,
        message: 'Error al obtener los invitados',
        error,
      });
    }
  }

  //Controlador para obtener datos de un invitado por ID de invitado
  async function getGuestById(req = request, res = response) {
    try {
        const {id} = req.params;
      const [guest] = await promisePool.query(
        "SELECT * FROM guests WHERE id = ?",
        [id]
      );
      if (!guest.length)
        return res.status(200).json({
        ok: false,
        status: 200,
        message: "El invitado no existe",
    });
      return res.status(200).json({
        ok: true,
        status: 200,
        message: 'Invitado obtenido correctamente',
        guest
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        status: 500,
        message: 'Error al obtener el invitado',
        error,
      });
    }
  }

  //Controlador para obtener datos de los invitados por ID de invitación
  async function getGuestByInv(req = request, res = response) {
    try {
        const {id} = req.params;
      const [guest] = await promisePool.query(
        "SELECT * FROM guests WHERE id_invitation = ?",
        [id]
      );
      if (!guest.length)
        return res.status(200).json({
        ok: false,
        status: 200,
        message: "No exisxten invitados para mostrar",
    });
      return res.status(200).json({
        ok: true,
        status: 200,
        message: 'Invitados obtenidos correctamente',
        guest
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        status: 500,
        message: 'Error al obtener los invitados',
        error,
      });
    }
  }

  //Controlador para crear datos de un invitado
  async function createGuest(req = request, res = response) {
    try {
      let {name, id_invitation, tickets  } = req.body;
      const idGenerate = generateID();
      if (!name || !id_invitation || !tickets)
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "Todos los datos son requeridos"
          },
        });
        //verificamos que la invitación exista
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
        const [plan] = await promisePool.query(
          "SELECT plan FROM invitations WHERE id = ?",
          [id_invitation.trim()]
        );
        // verificamos el plan del usuario y su límite de invitaciones
      if(plan[0].plan === "0" ){
       const [inv] = await promisePool.query(
            "SELECT COUNT(*) AS total FROM guests WHERE id_invitation = ?",
            [id_invitation.trim()]
        );
        if(inv[0].total === 2)
        {
            return res.status(400).json({
                info: {
                    ok: true,
                    status: 400,
                    message: "Has alcanzado el límite de invitaciones del plan gratuito"
                },
              });
        }
      }
      //creamos el invitado
      await promisePool.query("INSERT INTO guests SET ?", [
        {
          id: idGenerate,
          name: name.trim(),
          status: "pending",
          ...req.body,
        },
      ]);
        return res
          .status(200)
          .json({
            info: {
              ok: true,
              stattus: 200,
              message: "Invitado creado Correctamente"
            },
            data: {
                id: idGenerate,
                name: name.trim(),
                status: "pending",
                tickets: tickets.trim(),
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

  //Controlador para actualizar datos de un invitado
  async function updateGuest(req = request, res = response) {
    const { id } = req.params;
    try {
      // Verificamos que la actividad exista
      const [guest] = await promisePool.query(
        "SELECT id FROM guests WHERE id = ?",
        [id]
      );
      if (!guest.length)
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "El invitado no existe",
          },
        });
      await promisePool.query("UPDATE guests SET ? WHERE id = ?", [
        { ...req.body },
        id,
      ]);
      return res.status(200).json({
        info: {
          ok: true,
          status: 200,
          message: "Invitado Actualizado Correctamente",
        },
      });
    } catch (error) {
      return res.status(500).json({
        info: {
          ok: false,
          status: 500,
          message: "Error al actualizar el invitado",
          error,
        },
      });
    }
  }

  //Controlador para eliminar datos de un invitado
  async function deleteGuest(req = request, res = response) {
    const { id } = req.params;
    try {
      // Verificamos que la actividad exista
      const [guest] = await promisePool.query(
        "SELECT id FROM guests WHERE id = ?",
        [id]
      );
      if (!guest.length)
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "El invitado no existe",
          },
        });
      await promisePool.query("DELETE FROM guests WHERE id = ?", [id]);
      return res.status(200).json({
        info: {
          ok: true,
          status: 200,
          message: "Invitado Eliminado Correctamente",
        },
      });
    } catch (error) {
      return res.status(500).json({
        info: {
          ok: false,
          status: 500,
          message: "Error al Eliminar el invitado",
          error,
        },
      });
    }
  }

  //Controlador para eliminar datos de invitados por ID de invitación 
  async function deleteGuestsByInv(req = request, res = response) {
    const { id } = req.params;
    try {
      // Verificamos que la actividad exista
      const [itin] = await promisePool.query(
        "SELECT id FROM guests WHERE id_invitation = ?",
        [id]
      );
      if (!itin.length)
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "Los invitados no existen",
          },
        });
      await promisePool.query("DELETE FROM guests WHERE id_invitation = ?", [id]);
      return res.status(200).json({
        info: {
          ok: true,
          status: 200,
          message: "Invitados Eliminados Correctamente",
        },
      });
    } catch (error) {
      return res.status(500).json({
        info: {
          ok: false,
          status: 500,
          message: "Error al Eliminar los invitados",
          error,
        },
      });
    }
  }

  module.exports = {
    getGuests,
    getGuestById,
    getGuestByInv,
    createGuest,
    updateGuest,
    deleteGuest,
    deleteGuestsByInv,
  }