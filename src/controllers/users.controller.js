const { request, response } = require("express");
const promisePool = require("../database/connect.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateID = require("../utils/generateID.js");

async function getUsers(req = request, res = response) {
    try {
      const [users] = await promisePool.query(
        "SELECT id, name, lastname, email FROM users"
      );
      if (!users.length)
        return res.status(200).json({
        ok: false,
        status: 200,
        message: "No existen usuarios para mostrar",
    });
      return res.status(200).json({
        ok: true,
        status: 200,
        message: 'Usuarios obtenidos correctamente',
        users
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        status: 500,
        message: 'Error al obtener los usuarios',
        error,
      });
    }
  }

  async function getUserById(req = request, res = response) {
    try {
        const { id } = req.params;
      const [usr] = await promisePool.query(
        "SELECT id, name, lastname, email FROM users WHERE id = ?",
        id
      );
      if (!usr.length)
        return res.status(200).json({
        ok: false,
        status: 200,
        message: "No existe el usuario",
    });
      return res.status(200).json({
        ok: true,
        status: 200,
        message: 'Usuario obtenido correctamente',
        usr
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        status: 500,
        message: 'Error al obtener el usuario',
        error,
      });
    }
  }
  
  async function createUser(req = request, res = response) {
    try {
      let { name, lastname, password, email  } = req.body;
      const idGenerate = generateID();
      if (!name || !lastname || !password ||!email)
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "Todos los datos son requeridos"
          },
        });
      // verificamos que el usuario no exista
      const [user] = await promisePool.query(
        "SELECT id FROM users WHERE email = ?",
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
      await promisePool.query("INSERT INTO users SET ?", [
        {
          id: idGenerate,
          name: name.trim(),
          lastname: lastname.trim(),
          email: email.trim(),
          password: password.trim(),
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
              message: "Usuario creado Correctamente"
            },
            data: {
              id: idGenerate,
              name: name.trim(),
              lastname: lastname.trim(),
              email: email.trim(),
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

  async function updateUser(req = request, res = response) {
    const { id } = req.params;
    try {
      // Verificamos que el usuario exista
      const [user] = await promisePool.query(
        "SELECT id FROM users WHERE id = ?",
        [id]
      );
      if (!user.length)
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "El usuario no existe",
          },
        });
      await promisePool.query("UPDATE users SET ? WHERE id = ?", [
        { ...req.body },
        id,
      ]);
      return res.status(200).json({
        info: {
          ok: true,
          status: 200,
          message: "Usuario Actualizado Correctamente",
        },
      });
    } catch (error) {
      return res.status(500).json({
        info: {
          ok: false,
          status: 500,
          message: "Error al actualizar el usuario",
          error,
        },
      });
    }
  }

  async function deleteUser(req = request, res = response) {
    const { id } = req.params;
    try {
      // Verificamos que el usuario exista
      const [user] = await promisePool.query(
        "SELECT id FROM users WHERE id = ?",
        [id]
      );
      if (!user.length)
        return res.status(400).json({
          info: {
            ok: false,
            status: 400,
            message: "El usuario no existe",
          },
        });
      await promisePool.query("DELETE FROM users WHERE id = ?", [id]);
      await promisePool.query("DELETE FROM invitations WHERE id_user = ?", id)
      
      return res.status(200).json({
        info: {
          ok: true,
          status: 200,
          message: "Usuario Eliminado Correctamente",
        },
      });
    } catch (error) {
      return res.status(500).json({
        info: {
          ok: false,
          status: 500,
          message: "Error al Eliminar el Usuario",
          error,
        },
      });
    }
  }

  async function login(req = request, res = response) {
    try {
        const { email, password } = req.body;
        // Verificamos que ingresen datos
        if (!email || !password)
            return res.status(400).json({
                info: {
                    ok: false,
                    status: 400,
                    message: "email y password son requeridos",
                },
            });
        // Verificamos si el usuario existe
        const [user] = await promisePool.query(
            "SELECT id, password, name, lastname, email FROM users WHERE email = ?",
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

  async function isLogin(req = request, res = response) {
    const token = req.headers["authorization"];
    const verify = await jwt.verify(token, process.env.SECRET_KEY);
    try {
      const [user] = await promisePool.query(
        "SELECT id, name, lastname, email FROM users WHERE id = ?",
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
          lastname: user[0].lastname,
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

  module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    login, 
    logout,
    isLogin
  }