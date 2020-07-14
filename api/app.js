"use strict";

let express = require("express");
let bodyParser = require("body-parser");

let app = express();

//cargar rutas
let user_routes = require("./routes/user");
let artist_routes = require("./routes/artist");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//configurar cabeceras http
app.use((req, res, next) => {
  res.header("Acces-Controll-Allow-Origin", "*");
  res.header(
    "Acces-Controll-Allow-Headers",
    "Authorization,X-API-KEY,Origin,X-Requested-With,Content-Type,accept,Access-Control-Allow-Request-Method"
  );
  res.header("Acces-Controll-Allow-Method", "GET,POST,OPTIONS,PUT,DELETE");
  res.header("Allow", "GET,POST,OPTIONS,PUT,DELETE");

  next();
});

//rutas base
app.use("/api", user_routes);
app.use("/api", artist_routes);

module.exports = app;
