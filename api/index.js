"user strict";

let mongoose = require("mongoose");
let app = require("./app");
let port = process.env.PORT || 3977;

mongoose.connect("mongodb://localhost:27017/curso_mean2", (err, res) => {
  if (err) {
    throw err;
  } else {
    console.log("Conexion exitosa");

    app.listen(port, function () {
      console.log(`Servidor API escuchando en el puerto: ${port}`);
    });
  }
});
