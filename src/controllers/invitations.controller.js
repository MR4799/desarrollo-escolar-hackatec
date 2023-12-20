const { request, response } = require("express");
const promisePool = require("../database/connect.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateID = require("../utils/generateID.js");
const uploadImage = require('../utils/imgur.js')

//Controlador para obtener datos de todas las invitaciones
async function getInvitations(req = request, res = response) {
    try {
      const [inv] = await promisePool.query(
        "SELECT invitations.*, users.name, users.lastname, events.event, events.otreve FROM invitations INNER JOIN users ON invitations.id_user = users.id JOIN events ON invitations.id_event = events.id"
      );
      if (!inv.length)
        return res.status(200).json({
        ok: false,
        status: 200,
        message: "No existen invitaciones para mostrar",
    });
      return res.status(200).json({
        ok: true,
        status: 200,
        message: 'Invitaciones obtenidas correctamente',
        inv
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        status: 500,
        message: 'Error al obtener las invitaciones',
        error,
      });
    }
}

  //Controlador para obtener datos de todos los eventos
  async function getEvents(req = request, res = response) {
    try {
      const [event] = await promisePool.query(
        "SELECT * FROM events"
      );
      if (!event.length)
        return res.status(200).json({
        ok: false,
        status: 200,
        message: "No existen eventos para mostrar",
    });
      return res.status(200).json({
        ok: true,
        status: 200,
        message: 'Eventos obtenidas correctamente',
        event
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        status: 500,
        message: 'Error al obtener los eventos',
        error,
      });
    }
  }

//   //Controlador para obtener datos de una invitación por ID
  async function getInvitationsById(req = request, res = response) {
    try {
        const {id} = req.params;
      const [inv] = await promisePool.query(
        "SELECT invitations.*, users.name, users.lastname, events.event, events.otreve FROM invitations INNER JOIN users ON invitations.id_user = users.id JOIN events ON invitations.id_event = events.id WHERE invitations.id = ?",
        id
      );
      const [cont] = await promisePool.query(
        "SELECT SUM(tickets) as asistentes FROM guests where status = 'accepted' and id_invitation = ?",
        id
      );
      if (!inv.length)
        return res.status(200).json({
        ok: false,
        status: 200,
        message: "No existen invitaciones para mostrar",
    });
      return res.status(200).json({
        ok: true,
        status: 200,
        message: 'Invitaciones obtenidas correctamente',
        inv,
        cont
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        status: 500,
        message: 'Error al obtener las invitaciones',
        error,
      });
    }
  }

//   //Controlador para obtener datos de las invitaciones de un usuario
  async function getInvitationsByUsr(req = request, res = response) {
    try {
        const {id} = req.params;
      const [inv] = await promisePool.query(
        "SELECT invitations.*, users.name, users.lastname, events.event, events.otreve FROM invitations INNER JOIN users ON invitations.id_user = users.id JOIN events ON invitations.id_event = events.id WHERE invitations.id_user = ?",
        id
      );
      if (!inv.length)
        return res.status(200).json({
        ok: false,
        status: 200,
        message: "No existen invitaciones para mostrar",
    });
      return res.status(200).json({
        ok: true,
        status: 200,
        message: 'Invitaciones obtenidas correctamente',
        inv
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        status: 500,
        message: 'Error al obtener las invitaciones',
        error,
      });
    }
  }

//   //Controlador para obtener datos de las invitaciones de un usuario ordenadas por fecha
  async function getInvitationsByUsrDate(req = request, res = response) {
    try {
        const {id} = req.params;
      const [inv] = await promisePool.query(
        "SELECT invitations.*, users.name, users.lastname, events.event, events.otreve invitations FROM invitations INNER JOIN users ON invitations.id_user = users.id JOIN events ON invitations.id_event = events.id WHERE invitations.id_user = ? ORDER BY date",
        id
      );
      if (!inv.length)
        return res.status(200).json({
        ok: false,
        status: 200,
        message: "No existen invitaciones para mostrar",
    });
      return res.status(200).json({
        ok: true,
        status: 200,
        message: 'Invitaciones obtenidas correctamente',
        inv
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        status: 500,
        message: 'Error al obtener las invitaciones',
        error,
      });
    }
  }

//   //Controlador para obtener datos de las invitaciones de un usuario ordenadas por tipo de evento
  async function getInvitationsByUsrType(req = request, res = response) {
    try {
        const {id} = req.params;
      const [inv] = await promisePool.query(
        "SELECT invitations.*, users.name, users.lastname, events.event, events.otreve invitations FROM invitations INNER JOIN users ON invitations.id_user = users.id JOIN events ON invitations.id_event = events.id WHERE invitations.id_user = ? ORDER BY id_event",
        id
      );
      if (!inv.length)
        return res.status(200).json({
        ok: false,
        status: 200,
        message: "No existen invitaciones para mostrar",
    });
      return res.status(200).json({
        ok: true,
        status: 200,
        message: 'Invitaciones obtenidas correctamente',
        inv
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        status: 500,
        message: 'Error al obtener las invitaciones',
        error,
      });
    }
  }

//   //Controlador para crear datos de una invitación
  async function createInvitation(req = request, res = response) {
    try {
      let { id_event, id_user, date, lat, long, vestiment, message, image  } = req.body;
      const idGenerate = generateID();
      
      // verificamos que se ingresen los datos requeridos
      if (!id_event || !id_user || !lat || !long || !vestiment )
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "Todos los datos son requeridos"
          },
        });
        //Verificamos que el usuario exista
        const [user] = await promisePool.query(
          "SELECT id FROM users WHERE id = ?",
          [id_user.trim()]
        );
        if (!user.length)
          return res.status(400).json({
            info: {
              ok: true,
              status: 400,
              message: "El usuario no existe"
            },
          });
             //Verificamos que el evento exista
        const [ev] = await promisePool.query(
          "SELECT id FROM events WHERE id = ?",
          [id_event.trim()]
        );
        if (!ev.length)
          return res.status(400).json({
            info: {
              ok: true,
              status: 400,
              message: "El evento no existe"
            },
          });
        
      //creamos la invitación
      await promisePool.query("INSERT INTO invitations SET ?", [
        {
          id: idGenerate,
          id_event: id_event.trim(),
          id_user: id_user.trim(),
          date: date.trim(),
          lat: lat.trim(),
          long: long.trim(),
          vestiment: vestiment || "formal" || "semiformal"  || "casual" || "informal" || "traje de etiqueta" || "casual elegante" || "playero" || "sport" || "traje de baño" || "disfraz tematico",
          message: message.trim(),
          image: image.trim(),
          watermark: "Marca de agua",
          plan: 0,
          ...req.body,
        },
      ]);
        return res
          .status(200)
          .json({
            info: {
              ok: true,
              stattus: 200,
              message: "Invitación agregada Correctamente"
            },
            data: {
                id: idGenerate,
                id_event: id_event.trim(),
                id_user: id_user.trim(),
                date: date,
                lat: lat.trim(),
                long: long.trim(),
                vestiment: vestiment || "formal" || "semiformal"  || "casual" || "informal" || "traje de etiqueta" || "casual elegante" || "playero" || "sport" || "traje de baño" || "disfraz tematico",
                message: message.trim(),
                image: image.trim(),
                watermark: "Marca de agua",
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

//   //Controlador para crear datos de un evento
  async function createEvent(req = request, res = response) {
    try {
      let { event, otreve  } = req.body;
      const idGenerate = generateID();
      
      // verificamos que se ingresen los datos requeridos
      if (!event )
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "Tipo de evento requerido"
          },
        });
        //Verificamos que el evento exista
        const eve = await promisePool.query(
            "SELECT id FROM events WHERE event = ?",
            [event.trim()]
          );
          if (!eve.length)
            return res.status(400).json({
              info: {
                ok: true,
                status: 400,
                message: "El evento no existe"
              },
            });
      //creamos el evento
      if(event !== "otro"){
      await promisePool.query("INSERT INTO events SET ?", [
        {
          id: idGenerate,
          event: event || "boda" || "xv years"|| "graduacion"  || "birthday" || "bautizo" || "primera comunion" || "confirmacion" || "gender reveal" || "boda de plata" || "fiesta de disfraces" || "concierto" || "exposicion" || !"excursion" || !"otro",
        },
      ]);
      return res
          .status(200)
          .json({
            info: {
              ok: true,
              stattus: 200,
              message: "Evento agregado Correctamente"
            },
            data: {
                id: idGenerate,
          event: event.trim(),
          event: event || "boda" || "xv years"|| "graduacion"  || "birthday" || "bautizo" || "primera comunion" || "confirmacion" || "gender reveal" || "boda de plata" || "fiesta de disfraces" || "concierto" || "exposicion" || !"excursion" || !"otro",
            },
          });
        }
      if(event == "otro"){
      await promisePool.query("INSERT INTO events SET ?", [
        {
          id: idGenerate,
          event: event || "boda" || "graduacion"  || "cumpleaños" || "bautizo" || "primera comunion" || "confirmacion" || "gender reveal" || "boda de plata" || "fiesta de disfraces" || "concierto" || "exposicion" || !"excursion" || !"otro",
          otreve: otreve.trim(),
          ...req.body,
        },
      ]);
      return res
          .status(200)
          .json({
            info: {
              ok: true,
              stattus: 200,
              message: "Invitación agregada Correctamente"
            },
            data: {
                id: idGenerate,
          event: event.trim(),
          event: event || "boda" || "graduacion"  || "cumpleaños" || "bautizo" || "primera comunion" || "confirmacion" || "gender reveal" || "boda de plata" || "fiesta de disfraces" || "concierto" || "exposicion" || !"excursion" || !"otro",
          otreve: otreve.trim(),
            },
          });
    }
  
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

//   //Controlador para crear imágenes 
  async function createImg(req = request, res = response) {
    try {
      const { id_invitation  } = req.body;
      const idGenerate = generateID();
      
      // verificamos que se ingresen los datos requeridos
      if (!id_invitation)
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "Todos los datos son requeridos"
          },
        });
        //Verificamos que la invitación exista
        const [image] = await promisePool.query(
          "SELECT id FROM invitations WHERE id = ?",
          [id_invitation.trim()]
        );
        if (!image.length)
          return res.status(400).json({
            info: {
              ok: true,
              status: 400,
              message: "La invitación no existe"
            },
          });
          if (req.file) {
            const imageUpload = await uploadImage(req.file);
            req.body.img = imageUpload.data.link;
          }
       
      //creamos la imagen
      await promisePool.query("INSERT INTO images SET ?", [
        {
          id: idGenerate,
          id_invitation: id_invitation.trim(),
          img: req.body.img,
        },
      ]);
        return res
          .status(200)
          .json({
            info: {
              ok: true,
              stattus: 200,
              message: "Imagen agregada Correctamente"
            }
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

//   //Controlador para actualizar datos de una invitación
  async function updateInvitation(req = request, res = response) {
    const { id } = req.params;
    try {
      // Verificamos que la invitación exista
      const [inv] = await promisePool.query(
        "SELECT id FROM invitations WHERE id = ?",
        [id]
      );
      if (!inv.length)
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "La invitación no existe",
          },
        });
      await promisePool.query("UPDATE invitations SET ? WHERE id = ?", [
        { ...req.body },
        id,
      ]);
      return res.status(200).json({
        info: {
          ok: true,
          status: 200,
          message: "Invitación Actualizada Correctamente",
        },
      });
    } catch (error) {
      return res.status(500).json({
        info: {
          ok: false,
          status: 500,
          message: "Error al actualizar la invitación",
          error,
        },
      });
    }
  }

//   //Controlador para actualizar datos de un evento
  async function updateEvent(req = request, res = response) {
    const { id } = req.params;
    try {
      // Verificamos que el evento exista
      const [ev] = await promisePool.query(
        "SELECT id FROM events WHERE id = ?",
        [id]
      );
      if (!ev.length)
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "El evento no existe",
          },
        });
      await promisePool.query("UPDATE events SET ? WHERE id = ?", [
        { ...req.body },
        id,
      ]);
      return res.status(200).json({
        info: {
          ok: true,
          status: 200,
          message: "Evento Actualizado Correctamente",
        },
      });
    } catch (error) {
      return res.status(500).json({
        info: {
          ok: false,
          status: 500,
          message: "Error al actualizar el evento",
          error,
        },
      });
    }
  }

//   //Controlador para actualizar una imagen
  async function updateImg(req = request, res = response) {
    const { id } = req.params;
    try {
      // Verificamos que la invitación exista
      const [img] = await promisePool.query(
        "SELECT id FROM images WHERE id = ?",
        [id]
      );
      if (!img.length)
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "La invitación no existe",
          },
        });
        if (req.file) {
          const imageUpload = await uploadImage(req.file);
          req.body.img = imageUpload.data.link;
        }
        await promisePool.query("UPDATE images SET img = ? WHERE id = ?", [req.body.img, id]);
        const [newImg] = await promisePool.query('SELECT * FROM images WHERE id = ?', [id]);
      return res.status(200).json({
        info: {
          ok: true,
          status: 200,
          message: "Imagen Actualizada Correctamente",
          image: newImg[0]
        },
      });
    } catch (error) {
      return res.status(500).json({
        info: {
          ok: false,
          status: 500,
          message: "Error al actualizar la imagen",
          error,
        },
      });
    }
  }

//   //Controlador para eliminar datos de una invitación
  async function deleteInvitation(req = request, res = response) {
    const { id } = req.params;
    try {
      // Verificamos que la invitación exista
      const [inv] = await promisePool.query(
        "SELECT id FROM invitations WHERE id = ?",
        [id]
      );
      if (!inv.length)
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "La Invitación no existe",
          },
        });
      await promisePool.query("DELETE FROM invitations WHERE id = ?", [id]);
      await promisePool.query("DELETE FROM itinerary WHERE id_invitation = ?", [id]);
      await promisePool.query("DELETE FROM guests WHERE id_invitation = ?", [id]);
      await promisePool.query("DELETE FROM details WHERE id_invitation = ?", [id]);
      await promisePool.query("DELETE FROM images WHERE id_invitation = ?", [id]);
      return res.status(200).json({
        info: {
          ok: true,
          status: 200,
          message: "Invitación Eliminada Correctamente",
        },
      });
    } catch (error) {
      return res.status(500).json({
        info: {
          ok: false,
          status: 500,
          message: "Error al Eliminar la invitación",
          error,
        },
      });
    }
  }

//   //Controlador para eliminar datos de un evento
  async function deleteEvent(req = request, res = response) {
    const { id } = req.params;
    try {
      // Verificamos que el evento exista
      const [ev] = await promisePool.query(
        "SELECT id FROM events WHERE id = ?",
        [id]
      );
      if (!ev.length)
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "El evento no existe",
          },
        });
      await promisePool.query("DELETE FROM events WHERE id = ?", [id]);
      return res.status(200).json({
        info: {
          ok: true,
          status: 200,
          message: "Evento Eliminado Correctamente",
        },
      });
    } catch (error) {
      return res.status(500).json({
        info: {
          ok: false,
          status: 500,
          message: "Error al Eliminar el evento",
          error,
        },
      });
    }
  }

//   //Controlador para eliminar una imagen
  async function deleteImg(req = request, res = response) {
    const { id } = req.params;
    try {
      // Verificamos que el evento exista
      const [img] = await promisePool.query(
        "SELECT id FROM images WHERE id = ?",
        [id]
      );
      if (!img.length)
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "La imagen no existe",
          },
        });
      await promisePool.query("DELETE FROM images WHERE id = ?", [id]);
      return res.status(200).json({
        info: {
          ok: true,
          status: 200,
          message: "Imagen Eliminada Correctamente",
        },
      });
    } catch (error) {
      return res.status(500).json({
        info: {
          ok: false,
          status: 500,
          message: "Error al Eliminar la imagen",
          error,
        },
      });
    }
  }

  module.exports = {
    getInvitations,
    getEvents,
    getInvitationsById,
    getInvitationsByUsr,
    getInvitationsByUsrDate,
    getInvitationsByUsrType,
    createInvitation,
    createEvent,
    createImg,
    updateInvitation,
    updateEvent,
    updateImg,
    deleteInvitation,
    deleteEvent,
    deleteImg,
  }