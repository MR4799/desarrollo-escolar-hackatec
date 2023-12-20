const { request, response } = require("express");
const promisePool = require("../database/connect.js");
const generateID = require("../utils/generateID.js");

//Controlador para obtener datos de todos los grupos
async function getGrupos(req = request, res = response) {
    try {
      const [group] = await promisePool.query(
        "SELECT grupos.*, profesores.name AS tutor FROM grupos INNER JOIN profesores ON grupos.id_tutor = profesores.id"
      );
      if (!group.length)
        return res.status(200).json({
        ok: false,
        status: 200,
        message: "No existen grupos para mostrar",
    });
      return res.status(200).json({
        ok: true,
        status: 200,
        message: 'Datos de los grupos obtenidos correctamente',
        group
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        status: 500,
        message: 'Error al obtener los datos de los grupos',
        error,
      });
    }
  }

  //Controlador para obtener datos de un grupo por su ID
async function getGruposById(req = request, res = response) {
    try {
        const {id} = req.params
      const [group] = await promisePool.query(
        "SELECT grupos.*, profesores.name AS tutor FROM grupos INNER JOIN profesores ON grupos.id_tutor = profesores.id WHERE grupos.id = ?", id
      );
      if (!group.length)
        return res.status(200).json({
        ok: false,
        status: 200,
        message: "No existe la Asignatura",
    });
      return res.status(200).json({
        ok: true,
        status: 200,
        message: 'Datos del grupo obtenidos correctamente',
        group
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        status: 500,
        message: 'Error al obtener los datos del grupo',
        error,
      });
    }
  }

  //Controlador para crear un grupo
  async function createGrupo(req = request, res = response) {
    try {
      const { name, classroom, id_tutor } = req.body;
      const idGenerate = generateID();
      if (!name || !classroom || !id_tutor)
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "Todo los datos son requeridos"
          },
        });
        //verificamos que el grupo no esté ya registrado
        const [exist] = await promisePool.query(
          "SELECT id FROM grupos WHERE name = ?",
          [name.trim()]
        );
        const [tut] = await promisePool.query(
          "SELECT id FROM profesores WHERE id = ?",
          [id_tutor.trim()]
        );
        if (exist.length)
          return res.status(400).json({
            info: {
              ok: true,
              status: 400,
              message: "El grupo ya existe"
            },
          });
          if (!tut.length)
          return res.status(400).json({
            info: {
              ok: true,
              status: 400,
              message: "El profesor no existe"
            },
          });
          
      //creamos el grupo
      await promisePool.query("INSERT INTO grupos SET ?", [
        {
          id: idGenerate,
          name: name.trim(),
          classroom: classroom.trim(),
          id_tutor: id_tutor.trim(),
        },
      ]);
        return res
          .status(200)
          .json({
            info: {
              ok: true,
              stattus: 200,
              message: "Grupo creado Correctamente"
            },
            data: {
                id: idGenerate,
                name: name.trim(),
                classroom: classroom.trim(),
                id_tutor: id_tutor.trim(),
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

  //Controlador para editar datos o detalles de un grupo por ID
  async function updateGrupo(req = request, res = response) {
    const { id } = req.params;
    try {
      // Verificamos que el evento exista
      const [up] = await promisePool.query(
        "SELECT id FROM grupos WHERE id = ?",
        [id]
      );
      if (!up.length)
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "El grupo no existe",
          },
        });
      await promisePool.query("UPDATE grupos SET ? WHERE id = ?", [
        { ...req.body },
        id,
      ]);
      return res.status(200).json({
        info: {
          ok: true,
          status: 200,
          message: "Grupo Actualizado Correctamente",
          id: id,
          ...req.body,
        },
      });
    } catch (error) {
      return res.status(500).json({
        info: {
          ok: false,
          status: 500,
          message: "Error al actualizar el grupo",
          error,
        },
      });
    }
  }

  //Controlador para borrar detalles o datos de un grupo por ID
  async function deleteGrupo(req = request, res = response) {
    const { id } = req.params;
    try {
      // Verificamos que el grupo exista
      const [del] = await promisePool.query(
        "SELECT id FROM grupos WHERE id = ?",
        [id]
      );
      if (!del.length)
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "El grupo no existe",
          },
        });
        await promisePool.query("DELETE FROM grupos WHERE id = ?", [id]);
      return res.status(200).json({
        info: {
          ok: true,
          status: 200,
          message: "Grupo Eliminado Correctamente",
        },
      });
    } catch (error) {
      return res.status(500).json({
        info: {
          ok: false,
          status: 500,
          message: "Error al Eliminar el grupo",
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
    getGrupos,
    getGruposById,
    createGrupo,
    updateGrupo,
    deleteGrupo,
    deleteDet,
  }