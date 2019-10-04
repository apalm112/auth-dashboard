'use strict';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const VuSchema = new Schema({
  label: {
    type: String,
    required: true
  },
  percentage: [{
    type: Number,
    // required: true
    date: Number,
  }],
  vu_Duration: {
    type: String,
    // required: true
  },
  value: {
    type: Number,
    // required: true
  },
  datasets: [{
    // label: { type: String },
    // fill: { type: String },
    // borderWidth: { type: Number },
    // backgroundColor: { type: String },
    // borderColor: { type: String },
    data: [ Number ]
  }],
});

// module.exports = Vu = mongoose.model("users", VuSchema);

var Vu = mongoose.model('Vu', VuSchema);

module.exports.Vu = Vu;