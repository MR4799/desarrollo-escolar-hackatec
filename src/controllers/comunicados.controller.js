const { request, response } = require("express");
const promisePool = require("../database/connect.js");
const generateID = require("../utils/generateID.js");

//Controlador para obtener datos de todos los comunicados
async function getComm(req = request, res = response) {
    try {
      const [comm] = await promisePool.query(
        "SELECT * FROM comunicados"
      );
      if (!comm.length)
        return res.status(200).json({
        ok: false,
        status: 200,
        message: "No existen comunicados para mostrar",
    });
      return res.status(200).json({
        ok: true,
        status: 200,
        message: 'Comunicados obtenidos correctamente',
        comm
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        status: 500,
        message: 'Error al obtener los comunicados',
        error,
      });
    }
  }

  //Controlador para obtener datos de un comunicado por su ID
async function getCommById(req = request, res = response) {
    try {
        const {id} = req.params
      const [comm] = await promisePool.query(
        "SELECT * FROM comunicados WHERE id = ?", id
      );
      if (!comm.length)
        return res.status(200).json({
        ok: false,
        status: 200,
        message: "No existe el comunicado",
    });
      return res.status(200).json({
        ok: true,
        status: 200,
        message: 'Comunicado obtenido correctamente',
        comm
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        status: 500,
        message: 'Error al obtener el comunicado',
        error,
      });
    }
  }

  //Controlador para crear un comunicado
  async function createComm(req = request, res = response) {
    try {
      const { text, id_group, id_prof } = req.body;
      const idGenerate = generateID();
      if (!text || !id_group || !id_prof)
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "Todos los datos son requeridos"
          },
        });
        
      //creamos el alumno
      await promisePool.query("INSERT INTO comunicados SET ?", [
        {
          id: idGenerate,
          text: text.trim(),
          id_group: id_group.trim(),
          id_prof: id_prof.trim(), 
        },
      ]);
        return res
          .status(200)
          .json({
            info: {
              ok: true,
              stattus: 200,
              message: "Comunicado creado Correctamente"
            },
            data: {
                id: idGenerate,
                id_group: id_group.trim(),
                id_prof: id_prof.trim(), 
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

  //Controlador para editar datos o detalles de un comunicado por ID
  async function updateComm(req = request, res = response) {
    const { id } = req.params;
    try {
      // Verificamos que la asignatura exista
      const [up] = await promisePool.query(
        "SELECT id FROM comunicados WHERE id = ?",
        [id]
      );
      if (!up.length)
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "El comunicado no existe",
          },
        });
      await promisePool.query("UPDATE comunicados SET ? WHERE id = ?", [
        { ...req.body },
        id,
      ]);
      return res.status(200).json({
        info: {
          ok: true,
          status: 200,
          message: "Comunicado Actualizado Correctamente",
          id: id,
          ...req.body,
        },
      });
    } catch (error) {
      return res.status(500).json({
        info: {
          ok: false,
          status: 500,
          message: "Error al actualizar el comunicado",
          error,
        },
      });
    }
  }

  //Controlador para borrar detalles o datos de un comunicado por ID
  async function deleteComm(req = request, res = response) {
    const { id } = req.params;
    try {
      // Verificamos que el comunicado exista
      const [del] = await promisePool.query(
        "SELECT id FROM comunicados WHERE id = ?",
        [id]
      );
      if (!del.length)
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "El comunicado no existe",
          },
        });
        await promisePool.query("DELETE FROM comunicados WHERE id = ?", [id]);
      return res.status(200).json({
        info: {
          ok: true,
          status: 200,
          message: "Comunicado Eliminado Correctamente",
        },
      });
    } catch (error) {
      return res.status(500).json({
        info: {
          ok: false,
          status: 500,
          message: "Error al Eliminar el comunicado",
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
    getComm,
    getCommById,
    createComm,
    updateComm,
    deleteComm,
    deleteDet,
  }