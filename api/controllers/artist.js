"ese strict";
let path = require("path");
let fs = require("fs");
let mongoosePaginate = require("mongoose-pagination");

let Artist = require("../models/artist");
const { send } = require("process");

function getArtist(req, res) {
  let artistId = req.params.id;
  Artist.findById(artistId, (err, artist) => {
    if (err) {
      res.status(500).send({ message: "Error en la peticion" });
    } else {
      if (!artist) {
        res.status(404).send({ message: "El artista no existe" });
      } else {
        res.status(200).send({ artist });
      }
    }
  });
}

function getArtists(req, res) {
  if (req.params.page) {
    var page = req.params.page;
  } else {
    var page = 1;
  }

  var page = req.params.page;
  let itemsPerPage = 2;

  Artist.find()
    .sort("name")
    .paginate(page, itemsPerPage, function (err, artists, total) {
      if (err) {
        res.status(500).send({ message: "Error en la peticion" });
      } else {
        if (!artists) {
          res.status(404).send({ message: "No existen artistas" });
        } else {
          return res.status(200).send({
            pages: total,
            artist: artists,
          });
        }
      }
    });
}

function saveArtist(req, res) {
  let artist = new Artist();

  let params = req.body;
  artist.name = params.name;
  artist.description = params.description;
  artist.image = params.image;

  artist.save((err, artistStored) => {
    if (err) {
      res.status(500).send({ message: "Error al guardar el artista" });
    } else {
      if (!artistStored) {
        res.status(404).send({ message: "El artista ha sido guardado" });
      } else {
        res.status(200).send({ artist: artistStored });
      }
    }
  });
}

function updateArtist(req, res) {
  let artistId = req.params.id;
  let update = req.body;

  Artist.findByIdAndUpdate(artistId, update, (err, artistUpdated) => {
    if (err) {
      res.status(500).send({ message: "Error al guardar el artista" });
    } else {
      if (!artistUpdated) {
        res.status(404).send({ message: "El artista no ha sido actializado" });
      } else {
        res.status(200).send({ artist: artistUpdated });
      }
    }
  });
}

function deleteArtist(req, res) {
  let artistId = req.params.id;

  Artist.findByIdAndRemove(artistId, (err, artistRemoved) => {
    if (err) {
      res.status(500).send({ message: "Error al guardar el artista" });
    } else {
      if (!artistRemoved) {
        res.status(404).send({ message: "El artista no ha sido eliminado" });
      } else {
        //console.log(artistRemoved);
        res.status(404).send({ artistRemoved });
      }
    }
  });
}

module.exports = {
  getArtist,
  saveArtist,
  getArtists,
  updateArtist,
  deleteArtist,
};
