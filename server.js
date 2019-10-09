/*********************************************************

      MERN-AUTH FILE.

**********************************************************/

require('dotenv').config();
const express = require("express");
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  createError = require('http-errors'),
  http = require('https'),
  logger = require('morgan'),
  passport = require("passport"),
  path = require('path');

  // DATABASE REQUIRES
  // const MongoClient = require('mongodb').MongoClient;
const User = require('./models/User').User;
const Vu = require('./models/Vu').Vu;
const mLabDB = require("./config/keys").mongoURI;
const MONGOLAB_URI = process.env.MONGOLAB_URI; // <--Is NOT Working when passed into Mongoose!

// Get Routes
const vu_Router = require("./routes/vu");
const router = require("./routes/api/users");

const app = express();

const port = process.env.PORT || 5000;

console.log('MONGOLAB_URI>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', MONGOLAB_URI);

// morgan provides http request terminal logging output
app.use(logger('dev'));

// Bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//	This line tells Express(Node.js) to use the provided CSS, Image files. Serve static files from the React app, `express.static` is in charge of sending static files requests to the client.
app.use(express.static(path.join(__dirname, 'client/build')));

// Routes
app.use("/", vu_Router);
// app.use("/", router);

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

/***********************************************************************/
// being a CORS issued.I needed to put the bottom code in my server.js.
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
/*******************
   * NOT WORKING FOR POST DATA to mLab!
   * THE DEFAULT COLLECTION IS GETTING NAMED "vus". 
   * NOT SURE HOW OR WHERE THIS HAPPENS.
   */
// var newVu = new Vu({
//   "name": 'UFO VU!!!',
//   "num_Vu_Opened": 3,
//   "vu_Duration": "what",
//   "button_taps": 666
// })
// newVu.save( (err) => {
//   if (err) return err;
//   console.log('====================', newVu);
//   return newVu;
// });

// // Works for getting data from mLab to CLI.
// Vu.find(function (err, data) {
//   if (err) return err;
//   console.log('==DATA from mLab vus collection {server.js: line 74}==\n', data);
//   return data;
// });
/***********************************************************************/


// Function is a catch all for routes that get missed.
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/public/index.html'), (err) => {
    if (err) { res.status(500).send(err); }
  });
});

// DB Config
/********************************************************************
ATTEMPT TO USE ATLAS, NOT WORKING:
const uri = "mongodb+srv://Palmer:#mXzn61!KYei9W@xlg-qmuoh.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.mLabDB("test").collection("devices");
  // perform actions on the collection object
  client.close(); 
});
/******************************************************************** */

const options = {
  autoIndex: false, // Don't build indexes
  reconnectTries: 100, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  useNewUrlParser: true
};
// Connect to MongoDB
mongoose.connect(mLabDB || 'mongodb://localhost:27017/', options)
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

/* Error Handling *************************************************************/
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Catches requests that fall through w/out triggering any route handlers, send 404 if no other route matched
app.use((req, res, next) => {
  let error = new Error('Something went wrong.  API Route Not Found.');
  error.status = 404;
  next(error);
});

// global error handler { "error": {} }
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({
    err: err,
    status: err.status,
    message: err.message
  });
});

app.listen(port, () => console.log('\x1b[45m%s\x1b[0m', `Server up and running on port ${port} !`));