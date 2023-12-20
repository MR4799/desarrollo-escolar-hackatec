const { request, response } = require("express");
const promisePool = require("../database/connect.js");
const generateID = require("../utils/generateID.js");

//Controlador para obtener datos de todos los tutores
async function getTutores(req = request, res = response) {
    try {
      const [tut] = await promisePool.query(
        "SELECT * FROM tutores"
      );
      if (!tut.length)
        return res.status(200).json({
        ok: false,
        status: 200,
        message: "No existen tutores para mostrar",
    });
      return res.status(200).json({
        ok: true,
        status: 200,
        message: 'Datos de los tutores obtenidos correctamente',
        tut
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        status: 500,
        message: 'Error al obtener los datos de los tutores',
        error,
      });
    }
  }

  //Controlador para obtener datos de un tutor por su ID
async function getTutorById(req = request, res = response) {
    try {
        const {id} = req.params
      const [tut] = await promisePool.query(
        "SELECT * FROM tutores WHERE id = ?", id
      );
      if (!tut.length)
        return res.status(200).json({
        ok: false,
        status: 200,
        message: "No existe el tutor",
    });
      return res.status(200).json({
        ok: true,
        status: 200,
        message: 'Datos del tutor obtenidos correctamente',
        tut
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        status: 500,
        message: 'Error al obtener los datos del tutor',
        error,
      });
    }
  }

  //Controlador para crear un tutor
  async function createTutor(req = request, res = response) {
    try {
      const { name, email, phone, id_alumn } = req.body;
      const idGenerate = generateID();
      if (!name || !id_alumn || !email)
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "Todos los datos son requeridos"
          },
        });
        //verificamos que el tutor no esté ya registrado
        const [exist] = await promisePool.query(
          "SELECT id FROM alumnos WHERE email = ?",
          [name.trim()]
        );
        
        if (exist.length)
          return res.status(400).json({
            info: {
              ok: true,
              status: 400,
              message: "El tutor ya existe"
            },
          });
          
      //creamos el tutor
      await promisePool.query("INSERT INTO tutores SET ?", [
        {
          id: idGenerate,
          name: name.trim(), 
          email: email.trim(), 
          phone: phone.trim(), 
          id_alumn: id_alumn.trim(), 
        },
      ]);
        return res
          .status(200)
          .json({
            info: {
              ok: true,
              stattus: 200,
              message: "Tutor creado Correctamente"
            },
            data: {
                id: idGenerate,
                name: name.trim(),
                email: email.trim(), 
                phone: phone.trim(), 
                id_alumn: id_alumn.trim(), 
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

  //Controlador para editar datos o detalles de un tutor por ID
  async function updateTutor(req = request, res = response) {
    const { id } = req.params;
    try {
      // Verificamos que el tutor exista
      const [up] = await promisePool.query(
        "SELECT id FROM tutores WHERE id = ?",
        [id]
      );
      if (!up.length)
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "El tutor no existe",
          },
        });
      await promisePool.query("UPDATE tutores SET ? WHERE id = ?", [
        { ...req.body },
        id,
      ]);
      return res.status(200).json({
        info: {
          ok: true,
          status: 200,
          message: "Tutor Actualizado Correctamente",
          id: id,
          ...req.body,
        },
      });
    } catch (error) {
      return res.status(500).json({
        info: {
          ok: false,
          status: 500,
          message: "Error al actualizar el tutor",
          error,
        },
      });
    }
  }

  //Controlador para borrar detalles o datos de un tutor por ID
  async function deleteTutor(req = request, res = response) {
    const { id } = req.params;
    try {
      // Verificamos que el alumno exista
      const [del] = await promisePool.query(
        "SELECT id FROM tutores WHERE id = ?",
        [id]
      );
      if (!del.length)
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "El tutor no existe",
          },
        });
        await promisePool.query("DELETE FROM tutores WHERE id = ?", [id]);
      return res.status(200).json({
        info: {
          ok: true,
          status: 200,
          message: "Tutor Eliminado Correctamente",
        },
      });
    } catch (error) {
      return res.status(500).json({
        info: {
          ok: false,
          status: 500,
          message: "Error al Eliminar el tutor",
          error,
        },
      });
    }
  }

  //Controlador para borrar detalles o datos de una  por ID
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
    getTutores,
    getTutorById,
    createTutor,
    updateTutor,
    deleteTutor,
    deleteDet,
  }