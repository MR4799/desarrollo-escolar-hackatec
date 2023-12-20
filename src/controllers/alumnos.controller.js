const { request, response } = require("express");
const promisePool = require("../database/connect.js");
const generateID = require("../utils/generateID.js");

//Controlador para obtener datos de todos los alumnos
async function getAlumnos(req = request, res = response) {
    try {
      const [alumn] = await promisePool.query(
        "SELECT alumnos.*, grupos.name AS grupo, grupos.classroom AS aula FROM alumnos INNER JOIN grupos ON alumnos.id_group = grupos.id"
      );
      if (!alumn.length)
        return res.status(200).json({
        ok: false,
        status: 200,
        message: "No existen alumnos para mostrar",
    });
      return res.status(200).json({
        ok: true,
        status: 200,
        message: 'Datos de alumnos obtenidos correctamente',
        alumn
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        status: 500,
        message: 'Error al obtener los datos de los alumnos',
        error,
      });
    }
  }

  //Controlador para obtener datos de un alumno por su ID
async function getAlumnoById(req = request, res = response) {
    try {
        const {id} = req.params
      const [alumn] = await promisePool.query(
        "SELECT alumnos.*, grupos.name AS grupo, grupos.classroom AS aula FROM alumnos INNER JOIN grupos ON alumnos.id_group = grupos.id WHERE alumnos.id = ?", id
      );
      if (!alumn.length)
        return res.status(200).json({
        ok: false,
        status: 200,
        message: "No existe el alumno",
    });
      return res.status(200).json({
        ok: true,
        status: 200,
        message: 'Datos del alumno obtenidos correctamente',
        alumn
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        status: 500,
        message: 'Error al obtener los datos del alumno',
        error,
      });
    }
  }

  //Controlador para crear un alumno
  async function createAlumno(req = request, res = response) {
    try {
      const { name, age, gender, id_group, email, phone, matric } = req.body;
      const idGenerate = generateID();
      if (!name || !id_group || !matric || !email)
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "Todos los datos son requeridos"
          },
        });
        //verificamos que el alumno no esté ya registrado
        const [exist] = await promisePool.query(
          "SELECT id FROM alumnos WHERE name = ?",
          [name.trim()]
        );
        
        if (exist.length)
          return res.status(400).json({
            info: {
              ok: true,
              status: 400,
              message: "El alumno ya existe"
            },
          });
          
      //creamos el alumno
      await promisePool.query("INSERT INTO alumnos SET ?", [
        {
          id: idGenerate,
          name: name.trim(), 
          age: age.trim(), 
          gender: gender.trim(), 
          id_group: id_group.trim(), 
          email: email.trim(), 
          phone: phone.trim(), 
          matric: matric.trim(), 
        },
      ]);
        return res
          .status(200)
          .json({
            info: {
              ok: true,
              stattus: 200,
              message: "Alumno creado Correctamente"
            },
            data: {
                id: idGenerate,
                name: name.trim(),
                age: age.trim(), 
                gender: gender.trim(), 
                id_group: id_group.trim(), 
                email: email.trim(), 
                phone: phone.trim(), 
                matric: matric.trim(), 
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

  //Controlador para editar datos o detalles de un alumno por ID
  async function updateAlumno(req = request, res = response) {
    const { id } = req.params;
    try {
      // Verificamos que la asignatura exista
      const [up] = await promisePool.query(
        "SELECT id FROM alumnos WHERE id = ?",
        [id]
      );
      if (!up.length)
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "El alumno no existe",
          },
        });
      await promisePool.query("UPDATE alumnos SET ? WHERE id = ?", [
        { ...req.body },
        id,
      ]);
      return res.status(200).json({
        info: {
          ok: true,
          status: 200,
          message: "Alumno Actualizado Correctamente",
          id: id,
          ...req.body,
        },
      });
    } catch (error) {
      return res.status(500).json({
        info: {
          ok: false,
          status: 500,
          message: "Error al actualizar el alumno",
          error,
        },
      });
    }
  }

  //Controlador para borrar detalles o datos de un alumno por ID
  async function deleteAlumno(req = request, res = response) {
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
    getAlumnos,
    getAlumnoById,
    createAlumno,
    updateAlumno,
    deleteAlumno,
    deleteDet,
  }