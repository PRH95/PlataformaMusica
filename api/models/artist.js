"use strict";

let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let ArtistSchema = Schema({
  name: String,
  description: String,
});

module.exports = mongoose.model("Artist", ArtistSchema);
