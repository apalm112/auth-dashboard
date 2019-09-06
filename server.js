/*********************************************************

      MERN-AUTH FILE.

**********************************************************/

const express = require("express");
require('dotenv').config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const MongoClient = require('mongodb').MongoClient;
const passport = require("passport");

const MONGOLAB_URI = process.env.MONGOLAB_URI;

const users = require("./routes/api/users");

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
/********************************************************************
ATTEMPT TO USE ATLAS, NOT WORKING:
const uri = "mongodb+srv://Palmer:#mXzn61!KYei9W@xlg-qmuoh.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close(); 
});
/******************************************************************** */
const db = require("./config/keys").mongoURI;

const options = {
  autoIndex: false, // Don't build indexes
  reconnectTries: 100, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
};
// Connect to MongoDB
mongoose
  .connect(
    db || 'mongodb://localhost:27017/', options
    // { autoIndex: false, useNewUrlParser: true }
  )
  .then(() => console.log("\x1b[42m%s\x1b[0m", "MongoDB successfully connected"))
  .catch(err => console.log('\x1b[41m % s\x1b[0m', err));

// Create a variable to hold the database connection object.
const database = mongoose.connection;

database.on('error', (error) => {
  // set terminal stdout color red for error message
  console.log('\n       \x1b[41m%s\x1b[0m', '-----------------Error Connecting to Database. Connection Failed------------------------');	// eslint-disable-line no-console
  console.error('\x1b[31m%s\x1b[0m', (error.message.slice(0, 81) + ']')); // eslint-disable-line no-console
});

database.once('open', () => {
  console.log('\n                \x1b[42m%s\x1b[0m', '-----------------Database Connection Successfully Opened------------------------');	// eslint-disable-line no-console
});

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('\x1b[45m%s\x1b[0m', `Server up and running on port ${port} !`));
