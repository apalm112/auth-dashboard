/*********************************************************

      MERN-AUTH FILE.

**********************************************************/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
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
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

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
    data: [Number]
  }],
});

// module.exports = User = mongoose.model("users", UserSchema);
// module.exports = Vu = mongoose.model("users", VuSchema);

var User = mongoose.model('users', UserSchema);
var Vu = mongoose.model('vu', VuSchema);

module.exports.User = User;
module.exports.Vu = Vu;