'use strict';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const VuSchema = new Schema({
  num_Vu_Opened: {
    type: Number,
    // required: true
  },
  vu_Duration: {
    type: String,
    // required: true
  },
  button_taps: {
    type: Number,
    // required: true
  },
  // name: {
  //   type: String,
  //   required: true
  // },
  // age: {
  //   type: Number,
  //   // required: true
  // },
  // gender: {
  //   type: String,
  //   // required: true
  // },
  // email: {
  //   type: String,
  //   required: true
  // },
  // password: {
  //   type: String,
  //   required: true
  // },
  // date: {
  //   type: Date,
  //   default: Date.now
  // }
});

// module.exports = Vu = mongoose.model("users", VuSchema);

var Vu = mongoose.model('Vu', VuSchema);

module.exports.Vu = Vu;