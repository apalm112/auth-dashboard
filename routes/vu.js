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
  Vu.find({})
  .exec(function (error, vuData) {
    console.log('/ROUTES/VU.JS line 18 \n', '# of vuData: ', vuData.length, '\n typeof vuData: ', typeof vuData);
      console.log('GETDATA---------> \n', vuData); // returns an array of objects to the CLI
      res.json(vuData);
    });
});

module.exports = router;