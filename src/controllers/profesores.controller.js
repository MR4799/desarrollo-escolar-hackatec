const { request, response } = require("express");
const promisePool = require("../database/connect.js");
const generateID = require("../utils/generateID.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Controlador para obtener datos de todos los profesores
async function getProfesores(req = request, res = response) {
    try {
      const [prof] = await promisePool.query(
        "SELECT * FROM profesores"
      );
      if (!prof.length)
        return res.status(200).json({
        ok: false,
        status: 200,
        message: "No existen profesores para mostrar",
    });
      return res.status(200).json({
        ok: true,
        status: 200,
        message: 'Datos de profesores obtenidos correctamente',
        prof
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        status: 500,
        message: 'Error al obtener los datos de los profesores',
        error,
      });
    }
  }

  //Controlador para obtener datos de un profesor por su ID
async function getProfesorById(req = request, res = response) {
    try {
        const {id} = req.params
      const [prof] = await promisePool.query(
        "SELECT * FROM profesores WHERE id = ?", id
      );
      if (!prof.length)
        return res.status(200).json({
        ok: false,
        status: 200,
        message: "No existe el profesor",
    });
      return res.status(200).json({
        ok: true,
        status: 200,
        message: 'Datos del profesor obtenidos correctamente',
        prof
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        status: 500,
        message: 'Error al obtener los datos del profesor',
        error,
      });
    }
  }

  //Controlador para crear un profesor
  async function createProfesor(req = request, res = response) {
    try {
      let { name, matric, password, email, phone  } = req.body;
      const idGenerate = generateID();
      if (!name || !matric || !password ||!email || !phone)
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "Todos los datos son requeridos"
          },
        });
      // verificamos que el profesor no exista
      const [user] = await promisePool.query(
        "SELECT id FROM profesores WHERE email = ?",
        [email.trim()]
      );
      if (user.length)
        return res.status(400).json({
          info: {
            ok: true,
            status: 400,
            message: "El correo ya está en uso"
          },
        });
      //Encriptamos la contraseña
      const salt= await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
      //creamos el usuario
      await promisePool.query("INSERT INTO profesores SET ?", [
        {
          id: idGenerate,
          name: name.trim(),
          matric: matric.trim(),
          email: email.trim(),
          password: password.trim(),
          phone: phone.trim(),
          ...req.body,
        },
      ]);
      // Creamos el token
      const token = await jwt.sign(
        {
          id: idGenerate,
        },
        process.env.SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRE }
      );
        return res
        .cookie("token", token)
          .status(200)
          .json({
            info: {
              ok: true,
              stattus: 200,
              message: "Profesor creado Correctamente"
            },
            data: {
              id: idGenerate,name: name.trim(),
              matric: matric.trim(),
              email: email.trim(),
              phone: phone.trim(),
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

  //Controlador para editar datos o detalles de un profesor por ID
  async function updateProfesor(req = request, res = response) {
    const { id } = req.params;
    try {
      // Verificamos que el profesor exista
      const [up] = await promisePool.query(
        "SELECT id FROM profesores WHERE id = ?",
        [id]
      );
      if (!up.length)
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "El profesor no existe",
          },
        });
      await promisePool.query("UPDATE profesores SET ? WHERE id = ?", [
        { ...req.body },
        id,
      ]);
      return res.status(200).json({
        info: {
          ok: true,
          status: 200,
          message: "Profesor Actualizado Correctamente",
          id: id,
          ...req.body,
        },
      });
    } catch (error) {
      return res.status(500).json({
        info: {
          ok: false,
          status: 500,
          message: "Error al actualizar la información del profesor",
          error,
        },
      });
    }
  }

  //Controlador para borrar detalles o datos de un profesor por ID
  async function deleteProfesor(req = request, res = response) {
    const { id } = req.params;
    try {
      // Verificamos que el profesor exista
      const [del] = await promisePool.query(
        "SELECT id FROM profesores WHERE id = ?",
        [id]
      );
      if (!del.length)
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "El profesor no existe",
          },
        });
        await promisePool.query("DELETE FROM profesores WHERE id = ?", [id]);
      return res.status(200).json({
        info: {
          ok: true,
          status: 200,
          message: "Profesor Eliminado Correctamente",
        },
      });
    } catch (error) {
      return res.status(500).json({
        info: {
          ok: false,
          status: 500,
          message: "Error al Eliminar el profesor",
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

  async function login(req = request, res = response) {
    try {
        const { email, password } = req.body;
        // Verificamos que ingresen los datos
        if (!email || !password)
            return res.status(400).json({
                info: {
                    ok: false,
                    status: 400,
                    message: " El correo y la contraseña son requeridos",
                },
            });
        // Verificamos si el usuario existe
        const [user] = await promisePool.query(
            "SELECT id, name, matric, email, phone FROM profesores WHERE email = ?",
            [email.trim()]
        );
        if (!user.length)
            return res.status(400).json({
                info: {
                    ok: false,
                    status: 400,
                    message: "El usuario no existe",
                },
                errors: { email: true, password: false },
            });
        // Comprobamos contraseñas
        const searchPass = await bcrypt.compare(password, user[0].password);
        if (!searchPass)
            return res.status(400).json({
                info: {
                    ok: false,
                    status: 400,
                    message: "Contraseña Incorrecta",
                },
                errors: { email: false, password: true },
            });
  
        // Creamos el token
        const token = await jwt.sign(
            {
                id: user[0].id,
            },
            process.env.SECRET_KEY,
            { expiresIn: process.env.JWT_EXPIRE }
        );
        // Enviamos el token
        return res
            .cookie("token", token)
            .status(200)
            .json({
                info: {
                    ok: true,
                    status: 200,
                    message: "Ingresado Correctamente",
                },
                data: {
                    token,
                    id: user[0].id,
                    name: user[0].name,
                    email: email[0].email,
                },
            });
    } catch (error) {
        return res.status(500).json({
            info: {
                ok: false,
                status: 500,
                message: "Error al Ingresar",
                error,
            },
            errors: { email: false, password: false, error: true },
        });
    }
  }

  async function isLogin(req = request, res = response) {
    const token = req.headers["authorization"];
    const verify = await jwt.verify(token, process.env.SECRET_KEY);
    try {
      const [user] = await promisePool.query(
        "SELECT id, name, matric, email, phone FROM profesores WHERE email = ?",
        [verify.id]
      );
      return res.status(200).json({
        info: {
          ok: true,
          status: 200,
          message: "Usuario autenticado",
        },
        data: {
          id: user[0].id,
          name: user[0].name,
          email: user[0].email,
        },
      });
    } catch (error) {
      return res.status(500).json({
        info: {
          ok: false,
          status: 500,
          message: "Error al ingresar",
          error,
        },
      });
    }
  }

  async function logout(req = request, res = response) {
    const token = req.headers["authorization"];
    jwt.sign(
        token,
        "",
        { expiresIn: 1, },
        (logout, err) => {
            if (logout) {
                res.clearCookie("token");
                res.status(200).send({ message: "Sesión cerrada" });
            } else {
                res.status(500).send({ error: err });
            }
        }
    );
  }

  module.exports = {
    getProfesores,
    getProfesorById,
    createProfesor,
    updateProfesor,
    deleteProfesor,
    deleteDet,
    login,
    isLogin,
    logout,
  }