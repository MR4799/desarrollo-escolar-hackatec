const { request, response } = require("express");
const promisePool = require("../database/connect.js");
const generateID = require("../utils/generateID.js");

//Controlador para obtener datos de todas las calificaciones de un alumno
async function getCalifAlumno(req = request, res = response) {
    try {
        const {id}= req.params
      const [alumn] = await promisePool.query(
        "SELECT * FROM alumnos WHERE id = ?", id
      );
      const [calif] = await promisePool.query(
        "SELECT * FROM calificaciones WHERE id_alumn = ?", id
      );
      if (!alumn.length)
        return res.status(200).json({
        ok: false,
        status: 200,
        message: "No existe el alumno",
    });
    if (!calif.length)
        return res.status(200).json({
        ok: false,
        status: 200,
        message: "No existen calificaciones para mostrar",
    });
      return res.status(200).json({
        ok: true,
        status: 200,
        message: 'Calificaciones del alumno obtenidas correctamente',
        calif
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        status: 500,
        message: 'Error al obtener las calificaciones del alumno',
        error,
      });
    }
  }

  //Controlador para obtener calificaciones de los alumnos de un grupo
// async function getCalifByGrupo(req = request, res = response) {
//     try {
//         const {id} = req.params
//       const [group] = await promisePool.query(
//         "SELECT id FROM grupos WHERE id = ?", id
//       );
//       const [calif] = await promisePool.query(
//         "SELECT * FROM calificaciones WHERE id = ?", id
//       );
//       if (!group.length)
//         return res.status(200).json({
//         ok: false,
//         status: 200,
//         message: "No existe el grupo",
//     });
//     if (!calif.length)
//         return res.status(200).json({
//         ok: false,
//         status: 200,
//         message: "No existen calificaciones para mostrar",
//     });
//       return res.status(200).json({
//         ok: true,
//         status: 200,
//         message: 'Calificaciones de los alumnos obtenidas correctamente',
//         calif
//       });
//     } catch (error) {
//       return res.status(500).json({
//         ok: false,
//         status: 500,
//         message: 'Error al obtener las calificaciones de los alumnos',
//         error,
//       });
//     }
//   }

    //Controlador para obtener calificaciones de un alumno de una asignatura
// async function getCalifAlumnoByAsig(req = request, res = response) {
//     try {
//         const {id} = req.params
//       const [asig] = await promisePool.query(
//         "SELECT id FROM asignaturas WHERE id = ?", id
//       );
//       const [calif] = await promisePool.query(
//         "SELECT * FROM calificaciones WHERE id_subject = ?", id
//       );
//       if (!asig.length)
//         return res.status(200).json({
//         ok: false,
//         status: 200,
//         message: "No existe la asignatura",
//     });
//     if (!calif.length)
//         return res.status(200).json({
//         ok: false,
//         status: 200,
//         message: "No existen calificaciones para mostrar",
//     });
//       return res.status(200).json({
//         ok: true,
//         status: 200,
//         message: 'Calificaciones de los alumnos obtenidas correctamente',
//         calif
//       });
//     } catch (error) {
//       return res.status(500).json({
//         ok: false,
//         status: 500,
//         message: 'Error al obtener las calificaciones de los alumnos',
//         error,
//       });
//     }
//   }

  //Controlador para crear una calificación
  async function createCalif(req = request, res = response) {
    try {
      const { id_subject, id_alumn, calif_1, calif_2, calif_3 } = req.body;
      const idGenerate = generateID();
      if (!id_subject || !id_alumn )
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "Todos los datos son requeridos"
          },
        });
        //verificamos que el alumno exista
        const [existal] = await promisePool.query(
          "SELECT id FROM alumnos WHERE id = ?",
          [id_alumn.trim()]
        );
        //verificamos que la asignatura exista
        const [existas] = await promisePool.query(
            "SELECT id FROM asignaturas WHERE id = ?",
            [id_subject.trim()]
          );
        if (!existal.length)
          return res.status(400).json({
            info: {
              ok: true,
              status: 400,
              message: "El alumno no existe"
            },
          });
          
        if (!existas.length)
        return res.status(400).json({
          info: {
            ok: true,
            status: 400,
            message: "La asignatura no existe"
          },
        });

      //creamos la calificación
      await promisePool.query("INSERT INTO calificaciones SET ?", [
        {
          id: idGenerate,
          ...req.body, 
        },
      ]);
        return res
          .status(200)
          .json({
            info: {
              ok: true,
              stattus: 200,
              message: "Calificación registrada Correctamente"
            },
            data: {
                id: idGenerate,
                ...req.body,
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

  //Controlador para editar o actualizar calificaciones
  async function updateCalif(req = request, res = response) {
    const { id } = req.params;
    try {
      // Verificamos que el registro exista
      const [up] = await promisePool.query(
        "SELECT id FROM calificaciones WHERE id = ?",
        [id]
      );
      if (!up.length)
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "El registro de calificaciones no existe",
          },
        });
      await promisePool.query("UPDATE calificaciones SET ? WHERE id = ?", [
        { ...req.body },
        id,
      ]);
      return res.status(200).json({
        info: {
          ok: true,
          status: 200,
          message: "Calificaciones Actualizadas Correctamente",
          id: id,
          ...req.body,
        },
      });
    } catch (error) {
      return res.status(500).json({
        info: {
          ok: false,
          status: 500,
          message: "Error al actualizar las calificaciones",
          error,
        },
      });
    }
  }

  //Controlador para borrar un registro de calificaciones 
  async function deleteCalif(req = request, res = response) {
    const { id } = req.params;
    try {
      // Verificamos que el alumno exista
      const [del] = await promisePool.query(
        "SELECT id FROM alumnos WHERE id = ?",
        [id]
      );
      if (!del.length)
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "El alumno no existe",
          },
        });
        await promisePool.query("DELETE FROM alumnos WHERE id = ?", [id]);
      return res.status(200).json({
        info: {
          ok: true,
          status: 200,
          message: "Alumno Eliminado Correctamente",
        },
      });
    } catch (error) {
      return res.status(500).json({
        info: {
          ok: false,
          status: 500,
          message: "Error al Eliminar el alumno",
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
    getCalifAlumno,
    // getCalifByGrupo,
    // getCalifAlumnoByAsig,
    createCalif,
    updateCalif,
    deleteCalif,
    deleteDet,
  }