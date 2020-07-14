"use strict";

let User = require("../models/user");
let bcrypt = require("bcrypt-nodejs");
let jwt = require("../services/jwt");
const user = require("../models/user");

function pruebas(req, res) {
  res.status(200).send({
    message: "Probando una accion del controlador de usuarios",
  });
}

function saveUser(req, res) {
  let user = new User();

  let params = req.body;

  console.log(params);

  user.name = params.name;
  user.surname = params.surname;
  user.email = params.email;
  user.role = "ROLE_ADMIN";
  user.image = "null";

  if (params.password) {
    //encriptar contraseña
    bcrypt.hash(params.password, null, null, function (err, hash) {
      user.password = hash;
      if (user.name != null && user.surname != null && user.email != null) {
        //guardar el usuario
        user.save((err, userStored) => {
          if (err) {
            res.status(500).send({ message: "Error al guardar el usuario" });
          } else {
            if (!userStored) {
              res
                .status(404)
                .send({ message: "No se ha registrado el usuario" });
            } else {
              res.status(200).send({ user: userStored });
            }
          }
        });
      } else {
        res.status(200).send({ message: "Completa todos los campos" });
      }
    });
  } else {
    res.status(200).send({ message: "Introduce la contraseña" });
  }
}

function loginUser(req, res) {
  let params = req.body;

  let name = params.name;
  let password = params.password;

  User.findOne({ name: name }, (err, user) => {
    if (err) {
      res.status(500).send({ message: "Error en la peticion" });
    } else {
      if (!user) {
        res.status(404).send({ message: "El usuario no existe" });
      } else {
        //Comprobar la contraseña
        bcrypt.compare(password, user.password, function (err, check) {
          if (check) {
            //devolver los datos del usuario logeado
            if (params.gethash) {
              //devolver un token de jwt
              res.status(200).send({
                token: jwt.createToken(user),
              });
            } else {
              res.status(200).send({ user });
            }
          } else {
            res.status(404).send({ message: "La contraseña es incorrecta" });
          }
        });
      }
    }
  });
}

function updateUser(req, res) {
  let userId = req.params.id;
  let update = req.body;

  user.findByIdAndUpdate(userId, update, (err, userUpdated) => {
    if (err) {
      res.status(500).send({ message: "Error al actualizar el usuario" });
    } else {
      if (!userUpdated) {
        res.status(404).send({ user: userUpdated });
      } else {
        res.status(200).send({ message: "La contraseña es incorrecta" });
      }
    }
  });
}

module.exports = {
  pruebas,
  saveUser,
  loginUser,
  updateUser,
};
