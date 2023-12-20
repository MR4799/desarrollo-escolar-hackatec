const { request, response } = require("express");
const promisePool = require("../database/connect.js");
const generateID = require("../utils/generateID.js");

//Controlador para obtener datos de todas las asignaturas
async function getAsignaturas(req = request, res = response) {
    try {
      const [asig] = await promisePool.query(
        "SELECT * FROM asignaturas"
      );
      if (!asig.length)
        return res.status(200).json({
        ok: false,
        status: 200,
        message: "No existen Asignaturas para mostrar",
    });
      return res.status(200).json({
        ok: true,
        status: 200,
        message: 'Datos de Asignaturas obtenidos correctamente',
        asig
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        status: 500,
        message: 'Error al obtener los datos de las asignaturas',
        error,
      });
    }
  }

  //Controlador para obtener datos de una asignatura por su ID
async function getAsignaturasById(req = request, res = response) {
    try {
        const {id} = req.params
      const [asig] = await promisePool.query(
        "SELECT * FROM asignaturas WHERE id = ?", id
      );
      if (!asig.length)
        return res.status(200).json({
        ok: false,
        status: 200,
        message: "No existe la Asignatura",
    });
      return res.status(200).json({
        ok: true,
        status: 200,
        message: 'Datos de la Asignatura obtenidos correctamente',
        asig
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        status: 500,
        message: 'Error al obtener los datos de la asignatura',
        error,
      });
    }
  }

  //Controlador para crear una asignatura
  async function createAsig(req = request, res = response) {
    try {
      const { name } = req.body;
      const idGenerate = generateID();
      if (!name)
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "El nombre de la asignatura es requerido"
          },
        });
        //verificamos que la asignatura no esté ya registrada
        const [exist] = await promisePool.query(
          "SELECT id FROM asignaturas WHERE name = ?",
          [name.trim()]
        );
        
        if (exist.length)
          return res.status(400).json({
            info: {
              ok: true,
              status: 400,
              message: "La asignatura ya existe"
            },
          });
          
      //creamos la asignatura
      await promisePool.query("INSERT INTO asignaturas SET ?", [
        {
          id: idGenerate,
          name: name.trim(),
        },
      ]);
        return res
          .status(200)
          .json({
            info: {
              ok: true,
              stattus: 200,
              message: "Asignatura creada Correctamente"
            },
            data: {
                id: idGenerate,
                name: name.trim(),
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

  //Controlador para editar datos o detalles de una asignatura por ID
  async function updateAsig(req = request, res = response) {
    const { id } = req.params;
    try {
      // Verificamos que la asignatura exista
      const [up] = await promisePool.query(
        "SELECT id FROM asignaturas WHERE id = ?",
        [id]
      );
      if (!up.length)
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "La asignatura no existe",
          },
        });
      await promisePool.query("UPDATE asignaturas SET ? WHERE id = ?", [
        { ...req.body },
        id,
      ]);
      return res.status(200).json({
        info: {
          ok: true,
          status: 200,
          message: "Asignatura Actualizada Correctamente",
          id: id,
          ...req.body,
        },
      });
    } catch (error) {
      return res.status(500).json({
        info: {
          ok: false,
          status: 500,
          message: "Error al actualizar la asignatura",
          error,
        },
      });
    }
  }

  //Controlador para borrar detalles o datos de una asignatura por ID
  async function deleteAsig(req = request, res = response) {
    const { id } = req.params;
    try {
      // Verificamos que la asignatura exista
      const [del] = await promisePool.query(
        "SELECT id FROM asignaturas WHERE id = ?",
        [id]
      );
      if (!del.length)
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "La asignatura no existe",
          },
        });
        await promisePool.query("DELETE FROM asignaturas WHERE id = ?", [id]);
      return res.status(200).json({
        info: {
          ok: true,
          status: 200,
          message: "Asignatura Eliminada Correctamente",
        },
      });
    } catch (error) {
      return res.status(500).json({
        info: {
          ok: false,
          status: 500,
          message: "Error al Eliminar la asignatura",
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
    getAsignaturas,
    getAsignaturasById,
    createAsig,
    updateAsig,
    deleteAsig,
    deleteDet,
  }