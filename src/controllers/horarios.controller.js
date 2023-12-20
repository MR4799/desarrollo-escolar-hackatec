const { request, response } = require("express");
const promisePool = require("../database/connect.js");
const generateID = require("../utils/generateID.js");

//Controlador para obtener datos de todos los horarios
async function getHorario(req = request, res = response) {
    try {
      const [hor] = await promisePool.query(
        "SELECT horarios.*, profesores.name AS profesor, grupos.name AS grupo, asignaturas.name AS asignatura FROM horarios INNER JOIN profesores ON horarios.id_prof = profesores.id JOIN grupos ON grupos.id = horarios.id_group JOIN asignaturas ON asignaturas.id = horarios.id_subject"
      );
      if (!hor.length)
        return res.status(200).json({
        ok: false,
        status: 200,
        message: "No existen horarios para mostrar",
    });
      return res.status(200).json({
        ok: true,
        status: 200,
        message: 'horarios obtenidos correctamente',
        hor
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        status: 500,
        message: 'Error al obtener los horarios',
        error,
      });
    }
  }

  //Controlador para obtener datos de un horario por su ID
async function getHorarioById(req = request, res = response) {
    try {
        const {id} = req.params
      const [hor] = await promisePool.query(
        "SELECT horarios.*, profesores.name AS profesor, grupos.name AS grupo, asignaturas.name AS asignatura FROM horarios INNER JOIN profesores ON horarios.id_prof = profesores.id JOIN grupos ON grupos.id = horarios.id_group JOIN asignaturas ON asignaturas.id = horarios.id_subject WHERE horarios.id = ?", id
      );
      if (!hor.length)
        return res.status(200).json({
        ok: false,
        status: 200,
        message: "No existe el horario",
    });
      return res.status(200).json({
        ok: true,
        status: 200,
        message: 'horario obtenido correctamente',
        comm
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        status: 500,
        message: 'Error al obtener el horario',
        error,
      });
    }
  }

  //Controlador para crear un horario
  async function createHorario(req = request, res = response) {
    try {
      const { id_group, id_prof, id_subject, start_time, finish_time } = req.body;
      const idGenerate = generateID();
      if (!id_subject || !id_group || !id_prof)
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "Todos los datos son requeridos"
          },
        });
        
      //creamos el horario
      await promisePool.query("INSERT INTO horarios SET ?", [
        {
          id: idGenerate,
          id_group: id_group.trim(),
          id_prof: id_prof.trim(), 
          id_subject: id_subject.trim(), 
          start_time: start_time.trim(), 
          finish_time_time: finish_time_time.trim(), 
        },
      ]);
        return res
          .status(200)
          .json({
            info: {
              ok: true,
              stattus: 200,
              message: "horario creado Correctamente"
            },
            data: {
                id: idGenerate,
                id_group: id_group.trim(),
                id_prof: id_prof.trim(), 
                id_subject: id_subject.trim(), 
                start_time: start_time.trim(), 
                finish_time_time: finish_time_time.trim(), 
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

  //Controlador para editar datos o detalles de un horario por ID
  async function updateHorario(req = request, res = response) {
    const { id } = req.params;
    try {
      // Verificamos que la asignatura exista
      const [up] = await promisePool.query(
        "SELECT id FROM horarios WHERE id = ?",
        [id]
      );
      if (!up.length)
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "El horario no existe",
          },
        });
      await promisePool.query("UPDATE horarios SET ? WHERE id = ?", [
        { ...req.body },
        id,
      ]);
      return res.status(200).json({
        info: {
          ok: true,
          status: 200,
          message: "horario Actualizado Correctamente",
          id: id,
          ...req.body,
        },
      });
    } catch (error) {
      return res.status(500).json({
        info: {
          ok: false,
          status: 500,
          message: "Error al actualizar el horario",
          error,
        },
      });
    }
  }

  //Controlador para borrar detalles o datos de un horario por ID
  async function deleteHorario(req = request, res = response) {
    const { id } = req.params;
    try {
      // Verificamos que el horario exista
      const [del] = await promisePool.query(
        "SELECT id FROM horarios WHERE id = ?",
        [id]
      );
      if (!del.length)
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "El horario no existe",
          },
        });
        await promisePool.query("DELETE FROM horarios WHERE id = ?", [id]);
      return res.status(200).json({
        info: {
          ok: true,
          status: 200,
          message: "horario Eliminado Correctamente",
        },
      });
    } catch (error) {
      return res.status(500).json({
        info: {
          ok: false,
          status: 500,
          message: "Error al Eliminar el horario",
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
    getHorario,
    getHorarioById,
    createHorario,
    updateHorario,
    deleteHorario,
    deleteDet,
  }