/*********************************************************

      MERN-AUTH FILE.

**********************************************************/
const express = require("express");
const router = express.Router();
const Vu = require("../models/Vu").Vu;

// @route GET api/analytics
// @desc GET data from mLab neovu Database
// @access Public
router.get("/analytics", (req, res) => {
  console.log('/ROUTES/VU.JS line 14===============');
  // Data display: GET data from DB, save to State.
  // This route will display the results for all schools w/ which DID NOT REPORT immunizations, there are 117.
  Vu.find({})
    .exec(function (error, vuData) {
      console.log('# of vuData: ', vuData.length, '\n typeof vuData: ', typeof vuData);
      console.log('GETDATA---------> \n', vuData); // returns an array of objects to the CLI
      res.json(vuData);
    });
});

module.exports = router;