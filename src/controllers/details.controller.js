const { request, response } = require("express");
const promisePool = require("../database/connect.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateID = require("../utils/generateID.js");

//Controlador para obtener datos de todos los cumpleaños
async function getBd(req = request, res = response) {
    try {
      const [bd] = await promisePool.query(
        "SELECT details.id, details.id_invitation, details.id_event, details.name_1 AS name, details.padrino_1 AS padrino, details.madrina_1 AS madrina, events.event AS event FROM details INNER JOIN events ON events.id = details.id_event WHERE details.id_event = '3375258d2e8b53eb'"
      );
      if (!bd.length)
        return res.status(200).json({
        ok: false,
        status: 200,
        message: "No existen cumpleaños para mostrar",
    });
      return res.status(200).json({
        ok: true,
        status: 200,
        message: 'Datos de cumpleaños obtenidos correctamente',
        bd
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        status: 500,
        message: 'Error al obtener los cumpleaños',
        error,
      });
    }
  }

  //Controlador para obtener datos de todos los conciertos
  async function getConcerts(req = request, res = response) {
    try {
      const [concert] = await promisePool.query(
        "SELECT details.id, details.id_invitation, details.id_event, details.name_1 AS artist, details.name_2 AS gender, events.event AS event FROM details INNER JOIN events ON events.id = details.id_event WHERE details.id_event = '218b5c16104041d4'"
      );
      if (!concert.length)
        return res.status(200).json({
        ok: false,
        status: 200,
        message: "No existen conciertos para mostrar",
    });
      return res.status(200).json({
        ok: true,
        status: 200,
        message: 'Datos de conciertos obtenidos correctamente',
        concert
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        status: 500,
        message: 'Error al obtener los conciertos',
        error,
      });
    }
  }

  //Controlador para obtener datos de todas las bodas
  async function getBodas(req = request, res = response) {
    try {
      const [bodas] = await promisePool.query(
        "SELECT details.id, details.id_invitation, details.id_event, details.name_1 AS novio, details.name_2 AS novia, details.padrino_1, details.padrino_2, details.padrino_3, details.madrina_1, details.madrina_2, details.madrina_3, details.padres_1 AS padres_novio, details.padres_2 AS padres_novia, events.event AS event FROM details INNER JOIN events ON events.id = details.id_event WHERE details.id_event = '4eb663c3d6b8ceed'"
      );
      if (!bodas.length)
        return res.status(200).json({
        ok: false,
        status: 200,
        message: "No existen bodas para mostrar",
    });
      return res.status(200).json({
        ok: true,
        status: 200,
        message: 'Datos de bodas obtenidos correctamente',
        bodas
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        status: 500,
        message: 'Error al obtener los bodas',
        error,
      });
    }
  }

  //Controlador para obtener datos de todas las bodas de plata
  async function getBodasPlata(req = request, res = response) {
    try {
      const [bodas] = await promisePool.query(
        "SELECT details.id, details.id_invitation, details.id_event, details.name_1 AS novio, details.name_2 AS novia, details.padrino_1, details.padrino_2, details.padrino_3, details.madrina_1, details.madrina_2, details.madrina_3, details.padres_1 AS padres_novio, details.padres_2 AS padres_novia, events.event AS event FROM details INNER JOIN events ON events.id = details.id_event WHERE details.id_event = 'f53c46136e1774fa'"
      );
      if (!bodas.length)
        return res.status(200).json({
        ok: false,
        status: 200,
        message: "No existen bodas de plata para mostrar",
    });
      return res.status(200).json({
        ok: true,
        status: 200,
        message: 'Datos de bodas de plata obtenidos correctamente',
        bodas
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        status: 500,
        message: 'Error al obtener los bodas de plata',
        error,
      });
    }
  }

  //Controlador para obtener datos de todos los xv años
  async function getXv(req = request, res = response) {
    try {
      const [xv] = await promisePool.query(
        "SELECT details.id, details.id_invitation, details.id_event, details.name_1 AS name, details.padrino_1 AS padre, details.padrino_2 AS padrino, details.madrina_1 AS madre, details.madrina_2 AS madrina, events.event AS event FROM details INNER JOIN events ON events.id = details.id_event WHERE details.id_event = '8c3a4039d4b03fd3'"
      );
      if (!xv.length)
        return res.status(200).json({
        ok: false,
        status: 200,
        message: "No existen xv para mostrar",
    });
      return res.status(200).json({
        ok: true,
        status: 200,
        message: 'Datos de xv obtenidos correctamente',
        xv
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        status: 500,
        message: 'Error al obtener los xv',
        error,
      });
    }
  }

  //Controlador para obtener datos de todos los bautizos
  async function getBautizo(req = request, res = response) {
    try {
      const [bautizo] = await promisePool.query(
        "SELECT details.id, details.id_invitation, details.id_event, details.name_1 AS name, details.padrino_1 AS padre, details.padrino_2 AS padrino, details.madrina_1 AS madre, details.madrina_2 AS madrina, events.event AS event FROM details INNER JOIN events ON events.id = details.id_event WHERE details.id_event = 'b5b6aa3f72968107'"
      );
      if (!bautizo.length)
        return res.status(200).json({
        ok: false,
        status: 200,
        message: "No existen bautizos para mostrar",
    });
      return res.status(200).json({
        ok: true,
        status: 200,
        message: 'Datos de bautizos obtenidos correctamente',
        bautizo
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        status: 500,
        message: 'Error al obtener los xv',
        error,
      });
    }
  }

  //Controlador para obtener datos de todas las primeras comuniones
  async function getComun(req = request, res = response) {
    try {
      const [comunion] = await promisePool.query(
        "SELECT details.id, details.id_invitation, details.id_event, details.name_1 AS name, details.padrino_1 AS padre, details.padrino_2 AS padrino, details.madrina_1 AS madre, details.madrina_2 AS madrina, events.event AS event FROM details INNER JOIN events ON events.id = details.id_event WHERE details.id_event = '10a188a2b519cf3c'"
      );
      if (!comunion.length)
        return res.status(200).json({
        ok: false,
        status: 200,
        message: "No existen primeras comuniones para mostrar",
    });
      return res.status(200).json({
        ok: true,
        status: 200,
        message: 'Datos de primera comunión obtenidos correctamente',
        comunion
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

  //Controlador para obtener datos de todas las confirmaciones
  async function getConfirm(req = request, res = response) {
    try {
      const [confirm] = await promisePool.query(
        "SELECT details.id, details.id_invitation, details.id_event, details.name_1 AS name, details.padrino_1 AS padre, details.padrino_2 AS padrino, details.madrina_1 AS madre, details.madrina_2 AS madrina, events.event AS event FROM details INNER JOIN events ON events.id = details.id_event WHERE details.id_event = '4e3c1004fd82a1f0'"
      );
      if (!confirm.length)
        return res.status(200).json({
        ok: false,
        status: 200,
        message: "No existen confirmaciones para mostrar",
    });
      return res.status(200).json({
        ok: true,
        status: 200,
        message: 'Datos de confirmaciones obtenidos correctamente',
        confirm
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

  //Controlador para obtener datos de todos los gender reveals
  async function getGender(req = request, res = response) {
    try {
      const [gr] = await promisePool.query(
        "SELECT details.id, details.id_invitation, details.id_event, details.name_1 AS padre, details.name_2 AS madre, details.padrino_1 AS padrino, details.madrina_1 AS madrina, events.event AS event FROM details INNER JOIN events ON events.id = details.id_event WHERE details.id_event = '9353fae5d2dc0f26'"
      );
      if (!gr.length)
        return res.status(200).json({
        ok: false,
        status: 200,
        message: "No existen gender reveals para mostrar",
    });
      return res.status(200).json({
        ok: true,
        status: 200,
        message: 'Datos de gender reveals obtenidos correctamente',
        gr
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

  //Controlador para obtener datos de todas las fiestas de disfraces
  async function getDisfraces(req = request, res = response) {
    try {
      const [disfraz] = await promisePool.query(
        "SELECT details.id, details.id_invitation, details.id_event, details.name_1 AS nombre_fiesta, details.name_2 AS tematica, events.event AS event FROM details INNER JOIN events ON events.id = details.id_event WHERE details.id_event = 'e1c57df40122054b'"
      );
      if (!disfraz.length)
        return res.status(200).json({
        ok: false,
        status: 200,
        message: "No existen fiestas de disfraces para mostrar",
    });
      return res.status(200).json({
        ok: true,
        status: 200,
        message: 'Datos de fiestas de disfraces obtenidos correctamente',
        disfraz
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        status: 500,
        message: 'Error al obtener las fiestas de disfraces',
        error,
      });
    }
  }

  //Controlador para obtener datos de todas las exposiciones
  async function getExpo(req = request, res = response) {
    try {
      const [expo] = await promisePool.query(
        "SELECT details.id, details.id_invitation, details.id_event, details.name_1 AS genero, events.event AS event FROM details INNER JOIN events ON events.id = details.id_event WHERE details.id_event = 'e8fe24f18a55f206'"
      );
      if (!expo.length)
        return res.status(200).json({
        ok: false,
        status: 200,
        message: "No existen exposiciones para mostrar",
    });
      return res.status(200).json({
        ok: true,
        status: 200,
        message: 'Datos de exposiciones obtenidos correctamente',
        expo
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        status: 500,
        message: 'Error al obtener las exposiciones',
        error,
      });
    }
  }

  //Controlador para obtener datos de todas las excursiones
  async function getExcur(req = request, res = response) {
    try {
      const [excur] = await promisePool.query(
        "SELECT details.id, details.id_invitation, details.id_event, details.name_1 AS duracion, name_2 AS destino, events.event AS event FROM details INNER JOIN events ON events.id = details.id_event WHERE details.id_event = 'ca49d4c33d5775ed'"
      );
      if (!excur.length)
        return res.status(200).json({
        ok: false,
        status: 200,
        message: "No existen excursiones para mostrar",
    });
      return res.status(200).json({
        ok: true,
        status: 200,
        message: 'Datos de excursiones obtenidos correctamente',
        excur
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        status: 500,
        message: 'Error al obtener las excursiones',
        error,
      });
    }
  }

  //Controlador para obtener datos de un cumpleaños por ID
  async function getBdById(req = request, res = response) {
    try {
        const {id} = req.params;
      const [bd] = await promisePool.query(
        "SELECT details.id, details.id_event, details.name_1 AS name, details.padrino_1 AS padrino, details.madrina_1 AS madrina, events.event AS event,  invitations.* FROM details INNER JOIN events ON events.id = details.id_event INNER JOIN invitations ON details.id_invitation = invitations.id WHERE details.id_invitation = ?",
        [id]
      );
      if (!bd.length)
        return res.status(200).json({
        ok: false,
        status: 200,
        message: "El evento no existe",
    });
      return res.status(200).json({
        ok: true,
        status: 200,
        message: 'evento obtenido correctamente',
        bd
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        status: 500,
        message: 'Error al obtener el evento',
        error,
      });
    }
  }

  //Controlador para obtener datos de una boda por ID
  async function getBodasById(req = request, res = response) {
    try {
        const {id} = req.params;
      const [bd] = await promisePool.query(
        "SELECT details.id, details.id_invitation, details.id_event, details.name_1 AS novio, details.name_2 AS novia, details.padrino_1, details.padrino_2, details.padrino_3, details.madrina_1, details.madrina_2, details.madrina_3, details.padres_1 AS padres_novio, details.padres_2 AS padres_novia, events.event AS event, invitations.* FROM details INNER JOIN events ON events.id = details.id_event INNER JOIN invitations ON details.id_invitation = invitations.id WHERE details.id_invitation = ?",
        [id]
      );
      if (!bd.length)
        return res.status(200).json({
        ok: false,
        status: 200,
        message: "El evento no existe",
    });
      return res.status(200).json({
        ok: true,
        status: 200,
        message: 'evento obtenido correctamente',
        bd
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        status: 500,
        message: 'Error al obtener el evento',
        error,
      });
    }
  }

  //Controlador para obtener datos de un concierto por ID
  async function getConcertById(req = request, res = response) {
    try {
        const {id} = req.params;
      const [bd] = await promisePool.query(
        "SELECT details.id, details.id_invitation, details.id_event, details.name_1 AS artist, details.name_2 AS gender, events.event AS event, invitations.* FROM details INNER JOIN events ON events.id = details.id_event INNER JOIN invitations ON details.id_invitation = invitations.id WHERE details.id_invitation = ?",
        [id]
      );
      if (!bd.length)
        return res.status(200).json({
        ok: false,
        status: 200,
        message: "El evento no existe",
    });
      return res.status(200).json({
        ok: true,
        status: 200,
        message: 'evento obtenido correctamente',
        bd
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        status: 500,
        message: 'Error al obtener el evento',
        error,
      });
    }
  }

  //Controlador para obtener datos de unos xv años por ID
  async function getXvById(req = request, res = response) {
    try {
        const {id} = req.params;
      const [bd] = await promisePool.query(
        "SELECT details.id, details.id_event, details.name_1 AS name, details.padrino_1 AS padre, details.padrino_2 AS padrino, details.madrina_1 AS madre, details.madrina_2 AS madrina, events.event AS event, invitations.* FROM details INNER JOIN events ON events.id = details.id_event inner join invitations on details.id_invitation = invitations.id WHERE details.id_invitation = ?",
        [id]
      );
      if (!bd.length)
        return res.status(200).json({
        ok: false,
        status: 200,
        message: "El evento no existe",
    });
      return res.status(200).json({
        ok: true,
        status: 200,
        message: 'evento obtenido correctamente',
        bd
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        status: 500,
        message: 'Error al obtener el evento',
        error,
      });
    }
  }

  //Controlador para obtener datos de un bautizo por ID
  async function getBautizoById(req = request, res = response) {
    try {
        const {id} = req.params;
      const [bd] = await promisePool.query(
        "SELECT details.id, details.id_event, details.name_1 AS name, details.padrino_1 AS padrino, details.madrina_1 AS madrina, events.event AS event,  invitations.* FROM details INNER JOIN events ON events.id = details.id_event INNER JOIN invitations ON details.id_invitation = invitations.id WHERE details.id_invitation = ?",
        [id]
      );
      if (!bd.length)
        return res.status(200).json({
        ok: false,
        status: 200,
        message: "El evento no existe",
    });
      return res.status(200).json({
        ok: true,
        status: 200,
        message: 'evento obtenido correctamente',
        bd
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        status: 500,
        message: 'Error al obtener el evento',
        error,
      });
    }
  }

  //Controlador para obtener datos de una primera comunión por ID
  async function getComunById(req = request, res = response) {
    try {
        const {id} = req.params;
      const [bd] = await promisePool.query(
        "SELECT details.id, details.id_event, details.name_1 AS name, details.padrino_1 AS padrino, details.madrina_1 AS madrina, events.event AS event,  invitations.* FROM details INNER JOIN events ON events.id = details.id_event INNER JOIN invitations ON details.id_invitation = invitations.id WHERE details.id_invitation = ?",
        [id]
      );
      if (!bd.length)
        return res.status(200).json({
        ok: false,
        status: 200,
        message: "El evento no existe",
    });
      return res.status(200).json({
        ok: true,
        status: 200,
        message: 'evento obtenido correctamente',
        bd
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        status: 500,
        message: 'Error al obtener el evento',
        error,
      });
    }
  }

  //Controlador para obtener datos de una confirmación por ID
  async function getConfirmById(req = request, res = response) {
    try {
        const {id} = req.params;
      const [bd] = await promisePool.query(
        "SELECT details.id, details.id_event, details.name_1 AS name, details.padrino_1 AS padrino, details.madrina_1 AS madrina, events.event AS event,  invitations.* FROM details INNER JOIN events ON events.id = details.id_event INNER JOIN invitations ON details.id_invitation = invitations.id WHERE details.id_invitation = ?",
        [id]
      );
      if (!bd.length)
        return res.status(200).json({
        ok: false,
        status: 200,
        message: "El evento no existe",
    });
      return res.status(200).json({
        ok: true,
        status: 200,
        message: 'evento obtenido correctamente',
        bd
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        status: 500,
        message: 'Error al obtener el evento',
        error,
      });
    }
  }

  //Controlador para obtener datos de un gender reveal por ID
  async function getGenderById(req = request, res = response) {
    try {
        const {id} = req.params;
      const [bd] = await promisePool.query(
        "SELECT details.id, details.id_invitation, details.id_event, details.name_1 AS padre, details.name_2 AS madre, details.padrino_1 AS padrino, details.madrina_1 AS madrina, events.event AS event,  invitations.* FROM details INNER JOIN events ON events.id = details.id_event INNER JOIN invitations ON details.id_invitation = invitations.id WHERE details.id_invitation =  ?",
        [id]
      );
      if (!bd.length)
        return res.status(200).json({
        ok: false,
        status: 200,
        message: "El evento no existe",
    });
      return res.status(200).json({
        ok: true,
        status: 200,
        message: 'evento obtenido correctamente',
        bd
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        status: 500,
        message: 'Error al obtener el evento',
        error,
      });
    }
  }
  
  //Controlador para obtener datos de una fiesta de disfraces por ID
  async function getDisfracesById(req = request, res = response) {
    try {
        const {id} = req.params;
      const [bd] = await promisePool.query(
        "SELECT details.id, details.id_event, details.name_1 AS nombre_fiesta, details.name_2 AS tematica, events.event AS event,  invitations.* FROM details INNER JOIN events ON events.id = details.id_event INNER JOIN invitations ON details.id_invitation = invitations.id WHERE details.id_invitation = ?",
        [id]
      );
      if (!bd.length)
        return res.status(200).json({
        ok: false,
        status: 200,
        message: "El evento no existe",
    });
      return res.status(200).json({
        ok: true,
        status: 200,
        message: 'evento obtenido correctamente',
        bd
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        status: 500,
        message: 'Error al obtener el evento',
        error,
      });
    }
  }

  //Controlador para obtener datos de una exposición por ID
  async function getExpoById(req = request, res = response) {
    try {
        const {id} = req.params;
      const [bd] = await promisePool.query(
        "SELECT details.id, details.id_event, details.name_1 AS genero, events.event AS event,  invitations.* FROM details INNER JOIN events ON events.id = details.id_event INNER JOIN invitations ON details.id_invitation = invitations.id WHERE details.id_invitation = ?",
        [id]
      );
      if (!bd.length)
        return res.status(200).json({
        ok: false,
        status: 200,
        message: "El evento no existe",
    });
      return res.status(200).json({
        ok: true,
        status: 200,
        message: 'evento obtenido correctamente',
        bd
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        status: 500,
        message: 'Error al obtener el evento',
        error,
      });
    }
  }

  //Controlador para obtener datos de una excursión por ID
  async function getExcurById(req = request, res = response) {
    try {
        const {id} = req.params;
      const [bd] = await promisePool.query(
        "SELECT details.id, details.id_event, details.name_1 AS duracion, name_2 AS destino, events.event AS event,  invitations.* FROM details INNER JOIN events ON events.id = details.id_event INNER JOIN invitations ON details.id_invitation = invitations.id WHERE details.id_invitation = ?",
        [id]
      );
      if (!bd.length)
        return res.status(200).json({
        ok: false,
        status: 200,
        message: "El evento no existe",
    });
      return res.status(200).json({
        ok: true,
        status: 200,
        message: 'evento obtenido correctamente',
        bd
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        status: 500,
        message: 'Error al obtener el evento',
        error,
      });
    }
  }

  // Función para crear boda y boda de plata
  async function createBodaDet(req = request, res = response) {
    try {
      let { id_invitation, id_event, novio, novia,  padres_novio, padres_novia, madrina_1, madrina_2, madrina_3, padrino_1, padrino_2, padrino_3  } = req.body;
      const idGenerate = generateID();
      if (!novio || !novia || !id_invitation || !id_event)
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "Los nombres del novio y la novia, id_invitation, id_event son requeridos"
          },
        });
        //verificamos que la invitación exista
        const [inv] = await promisePool.query(
          "SELECT id FROM invitations WHERE id = ?",
          [id_invitation.trim()]
        );
        const [exist] = await promisePool.query(
          "SELECT * FROM details WHERE id_invitation = ?",
          [id_invitation.trim()]
        );
        const [type] = await promisePool.query(
          "SELECT id_event FROM invitations WHERE id = ?",
          [id_invitation.trim()]
        );
        if (!inv.length)
          return res.status(400).json({
            info: {
              ok: true,
              status: 400,
              message: "La invitación no existe"
            },
          });if (exist.length)
          return res.status(400).json({
            info: {
              ok: true,
              status: 400,
              message: "La invitación ya tiene descripción"
            },
          });
          if (type[0].id_event !== '4eb663c3d6b8ceed' &&  type[0].id_event !== 'f53c46136e1774fa')
          return res.status(400).json({
            info: {
              ok: true,
              status: 400,
              message: "El tipo de evento no coincide"
            },
          });
          //verificamos que el evento exista
        const [event] = await promisePool.query(
          "SELECT id FROM events WHERE id = ?",
          [id_event.trim()]
        );
        if (event[0].id !== '4eb663c3d6b8ceed' &&  event[0].id !== 'f53c46136e1774fa')
          return res.status(400).json({
            info: {
              ok: true,
              status: 400,
              message: "El evento no es una boda"
            },
          });

      //creamos la boda
      await promisePool.query("INSERT INTO details SET ?", [
        {
          id: idGenerate,
          id_invitation: id_invitation.trim(),
          id_event: id_event.trim(),
          name_1: novio.trim(),
          name_2: novia.trim(),
          padres_1: padres_novio.trim(),
          padres_2: padres_novia.trim(),
          padrino_1: padrino_1.trim(),
          padrino_2: padrino_2.trim(),
          padrino_3: padrino_3.trim(),
          madrina_1: madrina_1.trim(),
          madrina_2: madrina_2.trim(),
          madrina_3: madrina_3.trim(),
        },
      ]);
      const [ev] = await promisePool.query(
        "SELECT event FROM events WHERE id = ?",
        [id_event.trim()]
      );
        return res
          .status(200)
          .json({
            info: {
              ok: true,
              stattus: 200,
              message: "Datos de boda creados Correctamente"
            },
            data: {
                id: idGenerate,
                id_invitation: id_invitation.trim(),
                id_event: id_event.trim(),
                novio: novio.trim(),
                novia: novia.trim(),
                padres_novio: padres_novio.trim(),
                padres_novia: padres_novia.trim(),
                padrino_1: padrino_1.trim(),
                padrino_2: padrino_2.trim(),
                padrino_3: padrino_3.trim(),
                madrina_1: madrina_1.trim(),
                madrina_2: madrina_2.trim(),
                madrina_3: madrina_3.trim(),
                ev,
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

  async function createXvDet(req = request, res = response) {
    try {
      let { id_invitation, id_event, name, madre, madrina, padre, padrino  } = req.body;
      const idGenerate = generateID();
      if (!name || !id_invitation || !id_event)
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "El nombre de la quinceañera es necesario"
          },
        });
        //verificamos que la invitación exista
        const [inv] = await promisePool.query(
          "SELECT id FROM invitations WHERE id = ?",
          [id_invitation.trim()]
        );
        const [exist] = await promisePool.query(
          "SELECT * FROM details WHERE id_invitation = ?",
          [id_invitation.trim()]
        );
        const [type] = await promisePool.query(
          "SELECT id_event FROM invitations WHERE id = ?",
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
          if (exist.length)
          return res.status(400).json({
            info: {
              ok: true,
              status: 400,
              message: "La invitación ya tiene descripción"
            },
          });
          if (type[0].id_event !== '8c3a4039d4b03fd3')
          return res.status(400).json({
            info: {
              ok: true,
              status: 400,
              message: "La invitación no existe"
            },
          });
          //verificamos que el evento exista
        const [event] = await promisePool.query(
          "SELECT id FROM events WHERE id = ?",
          [id_event.trim()]
        );
        if (event[0].id !== '8c3a4039d4b03fd3')
          return res.status(400).json({
            info: {
              ok: true,
              status: 400,
              message: "El evento no es de xv años"
            },
          });

      //creamos el festejado
      await promisePool.query("INSERT INTO details SET ?", [
        {
          id: idGenerate,
          id_invitation: id_invitation.trim(),
          id_event: id_event.trim(),
          name_1: name.trim(),
          padrino_1: padre.trim(),
          padrino_2: padrino.trim(),
          madrina_1: madre.trim(),
          madrina_2: madrina.trim(),
        },
      ]);
      const [ev] = await promisePool.query(
        "SELECT event FROM events WHERE id = ?",
        [id_event.trim()]
      );
        return res
          .status(200)
          .json({
            info: {
              ok: true,
              stattus: 200,
              message: "Datos de xv años creados Correctamente"
            },
            data: {
                id: idGenerate,
                id_invitation: id_invitation.trim(),
                id_event: id_event.trim(),
                name_1: name.trim(),
                padrino_1: padre.trim(),
                padrino_2: padrino.trim(),
                madrina_1: madre.trim(),
                madrina_2: madrina.trim(),
                ev,
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

  // Función para cumpleaños, bautizo, primera comunión y confirmación
  async function createDetails(req = request, res = response) {
    try {
      let { id_invitation, id_event, name, madrina, padrino  } = req.body;
      const idGenerate = generateID();
      if (!name || !id_invitation || !id_event)
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "El nombre del festejado es necesario"
          },
        });
        //verificamos que la invitación exista
        const [inv] = await promisePool.query(
          "SELECT id FROM invitations WHERE id = ?",
          [id_invitation.trim()]
        );
        const [exist] = await promisePool.query(
          "SELECT * FROM details WHERE id_invitation = ?",
          [id_invitation.trim()]
        );
        const [type] = await promisePool.query(
          "SELECT id_event FROM invitations WHERE id = ?",
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
          if (exist.length)
          return res.status(400).json({
            info: {
              ok: true,
              status: 400,
              message: "La invitación ya tiene descripción"
            },
          });
          if (type[0].id_event !== '3375258d2e8b53eb' && type[0].id_event !== 'b5b6aa3f72968107' && type[0].id_event !== '10a188a2b519cf3c' && type[0].id_event !== '4e3c1004fd82a1f0')
          return res.status(400).json({
            info: {
              ok: true,
              status: 400,
              message: "La invitación no existe"
            },
          });
          //verificamos que el evento exista
        const [event] = await promisePool.query(
          "SELECT id FROM events WHERE id = ?",
          [id_event.trim()]
        );
        if (event[0].id !== '3375258d2e8b53eb' && event[0].id !== 'b5b6aa3f72968107' && event[0].id !== '10a188a2b519cf3c' && event[0].id !== '4e3c1004fd82a1f0')
          return res.status(400).json({
            info: {
              ok: true,
              status: 400,
              message: "El evento no coincide"
            },
          });
          
      //creamos el festejado
      await promisePool.query("INSERT INTO details SET ?", [
        {
          id: idGenerate,
          id_invitation: id_invitation.trim(),
          id_event: id_event.trim(),
          name_1: name.trim(),
          padrino_1: padrino.trim(),
          madrina_1: madrina.trim(),
        },
      ]);
      const [ev] = await promisePool.query(
        "SELECT event FROM events WHERE id = ?",
        [id_event.trim()]
      );
        return res
          .status(200)
          .json({
            info: {
              ok: true,
              stattus: 200,
              message: "Datos del evento creados Correctamente"
            },
            data: {
                id: idGenerate,
                id_invitation: id_invitation.trim(),
                id_event: id_event.trim(),
                name: name.trim(),
                padrino: padrino.trim(),
                madrina: madrina.trim(),
                ev,
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

  async function createGenderDet(req = request, res = response) {
    try {
      let { id_invitation, id_event, padre, madre, madrina, padrino  } = req.body;
      const idGenerate = generateID();
      if (!padre || !madre || !id_invitation || !id_event)
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "El nombre de los padres es necesario"
          },
        });
        //verificamos que la invitación exista
        const [inv] = await promisePool.query(
          "SELECT id FROM invitations WHERE id = ?",
          [id_invitation.trim()]
        );
        const [exist] = await promisePool.query(
          "SELECT * FROM details WHERE id_invitation = ?",
          [id_invitation.trim()]
        );
        const [type] = await promisePool.query(
          "SELECT id_event FROM invitations WHERE id = ?",
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
          if (exist.length)
          return res.status(400).json({
            info: {
              ok: true,
              status: 400,
              message: "La invitación ya tiene descripción"
            },
          });
          if (type[0].id_event !== '9353fae5d2dc0f26')
          return res.status(400).json({
            info: {
              ok: true,
              status: 400,
              message: "La invitación no existe"
            },
          });
          //verificamos que el evento exista
        const [event] = await promisePool.query(
          "SELECT id FROM events WHERE id = ?",
          [id_event.trim()]
        );
        if (event[0].id !== '9353fae5d2dc0f26')
          return res.status(400).json({
            info: {
              ok: true,
              status: 400,
              message: "El evento no existe"
            },
          });
          
      //creamos el festejado
      await promisePool.query("INSERT INTO details SET ?", [
        {
          id: idGenerate,
          id_invitation: id_invitation.trim(),
          id_event: id_event.trim(),
          name_1: padre.trim(),
          name_2: madre.trim(),
          padrino_1: padrino.trim(),
          madrina_1: madrina.trim(),
        },
      ]);
      const [ev] = await promisePool.query(
        "SELECT event FROM events WHERE id = ?",
        [id_event.trim()]
      );
        return res
          .status(200)
          .json({
            info: {
              ok: true,
              stattus: 200,
              message: "Datos de gender reveal creados Correctamente"
            },
            data: {
                id: idGenerate,
                id_invitation: id_invitation.trim(),
                id_event: id_event.trim(),
                padre: padre.trim(),
                madre: madre.trim(),
                padrino_1: padrino.trim(),
                madrina_1: madrina.trim(),
                ev,
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

  async function createDisfracesDet(req = request, res = response) {
    try {
      let { id_invitation, id_event, name, tematica  } = req.body;
      const idGenerate = generateID();
      if (!name || !tematica || !id_invitation || !id_event)
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "El nombre y la temática son necesarios"
          },
        });
        //verificamos que la invitación exista
        const [inv] = await promisePool.query(
          "SELECT id FROM invitations WHERE id = ?",
          [id_invitation.trim()]
        );
        const [exist] = await promisePool.query(
          "SELECT * FROM details WHERE id_invitation = ?",
          [id_invitation.trim()]
        );
        const [type] = await promisePool.query(
          "SELECT id_event FROM invitations WHERE id = ?",
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
          if (exist.length)
          return res.status(400).json({
            info: {
              ok: true,
              status: 400,
              message: "La invitación no existe"
            },
          });
          if (type[0].id_event !== 'e1c57df40122054b')
          return res.status(400).json({
            info: {
              ok: true,
              status: 400,
              message: "La invitación no existe"
            },
          });
          //verificamos que el evento exista
        const [event] = await promisePool.query(
          "SELECT id FROM events WHERE id = ?",
          [id_event.trim()]
        );
        if (event[0].id !== 'e1c57df40122054b')
          return res.status(400).json({
            info: {
              ok: true,
              status: 400,
              message: "El evento no existe"
            },
          });
          
      //creamos la fiesta
      await promisePool.query("INSERT INTO details SET ?", [
        {
          id: idGenerate,
          id_invitation: id_invitation.trim(),
          id_event: id_event.trim(),
          name_1: name.trim(),
          name_2: tematica.trim(),
        },
      ]);
      const [ev] = await promisePool.query(
        "SELECT event FROM events WHERE id = ?",
        [id_event.trim()]
      );
        return res
          .status(200)
          .json({
            info: {
              ok: true,
              stattus: 200,
              message: "Datos de fiesta de disfraces creados Correctamente"
            },
            data: {
                id: idGenerate,
                id_invitation: id_invitation.trim(),
                id_event: id_event.trim(),
                nombre_fiesta: name.trim(),
                tematica: tematica.trim(),
                ev,
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
 
  async function createConcertDet(req = request, res = response) {
    try {
      let { id_invitation, id_event, artist, gender  } = req.body;
      const idGenerate = generateID();
      if (!artist || !gender || !id_invitation || !id_event)
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "El artista y el género son necesarios"
          },
        });
        //verificamos que la invitación exista
        const [inv] = await promisePool.query(
          "SELECT id FROM invitations WHERE id = ?",
          [id_invitation.trim()]
        );
        const [exist] = await promisePool.query(
          "SELECT * FROM details WHERE id_invitation = ?",
          [id_invitation.trim()]
        );
        const [type] = await promisePool.query(
          "SELECT id_event FROM invitations WHERE id = ?",
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
          if (exist.length)
          return res.status(400).json({
            info: {
              ok: true,
              status: 400,
              message: "La invitación no existe"
            },
          });
          if (type[0].id_event !== '218b5c16104041d4')
          return res.status(400).json({
            info: {
              ok: true,
              status: 400,
              message: "La invitación no existe"
            },
          });
          //verificamos que el evento exista
        const [event] = await promisePool.query(
          "SELECT id FROM events WHERE id = ?",
          [id_event.trim()]
        );
        if (event[0].id !== '218b5c16104041d4')
          return res.status(400).json({
            info: {
              ok: true,
              status: 400,
              message: "El evento no existe"
            },
          });
          
      //creamos el concierto
      await promisePool.query("INSERT INTO details SET ?", [
        {
          id: idGenerate,
          id_invitation: id_invitation.trim(),
          id_event: id_event.trim(),
          name_1: artist.trim(),
          name_2: gender.trim(),
        },
      ]);
      const [ev] = await promisePool.query(
        "SELECT event FROM events WHERE id = ?",
        [id_event.trim()]
      );
        return res
          .status(200)
          .json({
            info: {
              ok: true,
              stattus: 200,
              message: "Datos de concierto creados Correctamente"
            },
            data: {
                id: idGenerate,
                id_invitation: id_invitation.trim(),
                id_event: id_event.trim(),
                artista: artist.trim(),
                genero: gender.trim(),
                ev,
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

  async function createExpoDet(req = request, res = response) {
    try {
      let { id_invitation,id_event, gender  } = req.body;
      const idGenerate = generateID();
      if (!gender || !id_invitation || !id_event)
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "El género es necesario"
          },
        });
        //verificamos que la invitación exista
        const [inv] = await promisePool.query(
          "SELECT id FROM invitations WHERE id = ?",
          [id_invitation.trim()]
        );
        const [exist] = await promisePool.query(
          "SELECT * FROM details WHERE id_invitation = ?",
          [id_invitation.trim()]
        );
        const [type] = await promisePool.query(
          "SELECT id_event FROM invitations WHERE id = ?",
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
          if (exist.length)
          return res.status(400).json({
            info: {
              ok: true,
              status: 400,
              message: "La invitación no existe"
            },
          });
          if (type[0].id_event !== 'e8fe24f18a55f206')
          return res.status(400).json({
            info: {
              ok: true,
              status: 400,
              message: "La invitación no existe"
            },
          });
          //verificamos que el evento exista
        const [event] = await promisePool.query(
          "SELECT id FROM events WHERE id = ?",
          [id_event.trim()]
        );
        if (event[0].id !== 'e8fe24f18a55f206')
          return res.status(400).json({
            info: {
              ok: true,
              status: 400,
              message: "El evento no existe"
            },
          });
          
      //creamos la exposición
      await promisePool.query("INSERT INTO details SET ?", [
        {
          id: idGenerate,
          id_invitation: id_invitation.trim(),
          id_event: id_event.trim(),
          name_1: gender.trim(),
        },
      ]);
      const [ev] = await promisePool.query(
        "SELECT event FROM events WHERE id = ?",
        [id_event.trim()]
      );
        return res
          .status(200)
          .json({
            info: {
              ok: true,
              stattus: 200,
              message: "Datos de exposición creados Correctamente"
            },
            data: {
                id: idGenerate,
                id_invitation: id_invitation.trim(),
                id_event: id_event.trim(),
                genero: gender.trim(),
                ev,
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

  async function createExcurDet(req = request, res = response) {
    try {
      let { id_invitation, id_event, duracion, destino  } = req.body;
      const idGenerate = generateID();
      if (!duracion || !destino || !id_invitation || !id_event)
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "El destino y la duración son necesarios"
          },
        });
        //verificamos que la invitación exista
        const [inv] = await promisePool.query(
          "SELECT id FROM invitations WHERE id = ?",
          [id_invitation.trim()]
        );
        const [exist] = await promisePool.query(
          "SELECT * FROM details WHERE id_invitation = ?",
          [id_invitation.trim()]
        );
        const [type] = await promisePool.query(
          "SELECT id_event FROM invitations WHERE id = ?",
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
          if (exist.length)
          return res.status(400).json({
            info: {
              ok: true,
              status: 400,
              message: "La invitación no existe"
            },
          });
          if (type[0].id_event !== 'ca49d4c33d5775ed')
          return res.status(400).json({
            info: {
              ok: true,
              status: 400,
              message: "La invitación no existe"
            },
          });
          //verificamos que el evento exista
        const [event] = await promisePool.query(
          "SELECT id FROM events WHERE id = ?",
          [id_event.trim()]
        );
        if (event[0].id !== 'ca49d4c33d5775ed')
          return res.status(400).json({
            info: {
              ok: true,
              status: 400,
              message: "El evento no existe"
            },
          });
          
      //creamos la exposición
      await promisePool.query("INSERT INTO details SET ?", [
        {
          id: idGenerate,
          id_invitation: id_invitation.trim(),
          id_event: id_event.trim(),
          name_1: duracion.trim(),
          name_2: destino.trim(),
        },
      ]);
      const [ev] = await promisePool.query(
        "SELECT event FROM events WHERE id = ?",
        [id_event.trim()]
      );
        return res
          .status(200)
          .json({
            info: {
              ok: true,
              stattus: 200,
              message: "Datos de excursión creados Correctamente"
            },
            data: {
                id: idGenerate,
                id_invitation: id_invitation.trim(),
                id_event: id_event.trim(),
                duracion: duracion.trim(),
                destino: destino.trim(),
                ev,
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

  //Controlador para crear Otros eventos
  async function createOtrosDet(req = request, res = response) {
    try {
      let { id_invitation, id_event, name_1, name_2,  padres_1, padres_2, madrina_1, madrina_2, madrina_3, padrino_1, padrino_2, padrino_3  } = req.body;
      const idGenerate = generateID();
      if (!id_invitation || !id_event)
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "EL id_invitation y id_event son requeridos"
          },
        });
        //verificamos que la invitación exista
        const [inv] = await promisePool.query(
          "SELECT id FROM invitations WHERE id = ?",
          [id_invitation.trim()]
        );
        const [exist] = await promisePool.query(
          "SELECT * FROM details WHERE id_invitation = ?",
          [id_invitation.trim()]
        );
        if (!inv.length)
          return res.status(400).json({
            info: {
              ok: true,
              status: 400,
              message: "La invitación no existe"
            },
          });if (exist.length)
          return res.status(400).json({
            info: {
              ok: true,
              status: 400,
              message: "La invitación ya tiene descripción"
            },
          });
          //verificamos que el evento exista
        const [event] = await promisePool.query(
          "SELECT id FROM events WHERE id = ?",
          [id_event.trim()]
        );
        if (!event.length)
          return res.status(400).json({
            info: {
              ok: true,
              status: 400,
              message: "El evento no existe"
            },
          });
          
      //creamos el evento
      await promisePool.query("INSERT INTO details SET ?", [
        {
          id: idGenerate,
          id_event: id_event,
          ...req.body,
        },
      ]);
      const [ev] = await promisePool.query(
        "SELECT event AS Tipo, otreve AS Evento FROM events WHERE id = ?",
        [id_event.trim()]
      );
        return res
          .status(200)
          .json({
            info: {
              ok: true,
              stattus: 200,
              message: "Datos de evento creados Correctamente"
            },
            data: {
                id: idGenerate,
                id_invitation: id_invitation.trim(),
                id_event: id_event.trim(),
                ...req.body,
                ev,
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

  //Controlador para editar datos o detalles de un evento por ID
  async function updateDet(req = request, res = response) {
    const { id } = req.params;
    try {
      // Verificamos que el evento exista
      const [det] = await promisePool.query(
        "SELECT id FROM details WHERE id = ?",
        [id]
      );
      if (!det.length)
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "El evento no existe",
          },
        });
      await promisePool.query("UPDATE details SET ? WHERE id = ?", [
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

  async function deleteDetByInv(req = request, res = response) {
    const { id } = req.params;
    try {
      // Verificamos que el evento exista
      const [det] = await promisePool.query(
        "SELECT id FROM details WHERE id_invitation = ?",
        [id]
      );
      if (!det.length)
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "El evento no existe",
          },
        });
        await promisePool.query("DELETE FROM invitations WHERE id = ?", [id]);
        await promisePool.query("DELETE FROM itinerary WHERE id_invitation = ?", [id]);
        await promisePool.query("DELETE FROM guests WHERE id_invitation = ?", [id]);
        await promisePool.query("DELETE FROM details WHERE id_invitation = ?", [id]);
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

  //Controlador para borrar detalles o datos de un evento por ID
  async function deleteDet(req = request, res = response) {
    const { id } = req.params;
    try {
      // Verificamos que la actividad exista
      const [det] = await promisePool.query(
        "SELECT id FROM details WHERE id = ?",
        [id]
      );
      if (!det.length)
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "El evento no existe",
          },
        });
      await promisePool.query("DELETE FROM details WHERE id = ?", [id]);
      return res.status(200).json({
        info: {
          ok: true,
          status: 200,
          message: "Eventos Eliminado Correctamente",
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

  module.exports = {
    getBd,
    getConcerts,
    getBodas,
    getBodasPlata,
    getXv,
    getBautizo,
    getComun,
    getConfirm,
    getGender,
    getDisfraces,
    getExpo,
    getExcur,
    getBdById,
    getConcertById,
    getBodasById,
    getXvById,
    getBautizoById,
    getComunById,
    getConfirmById,
    getGenderById,
    getDisfracesById,
    getExpoById,
    getExcurById,
    createBodaDet,
    createXvDet,
    createDetails,
    createGenderDet,
    createDisfracesDet,
    createConcertDet,
    createExpoDet,
    createExcurDet,
    createOtrosDet,
    updateDet,
    deleteDetByInv,
    deleteDet,
  }