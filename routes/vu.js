/*********************************************************

      MERN-AUTH FILE.

**********************************************************/
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Load User model
// const User = require("../../models/User");
const Vu = require("../models/Vu");

// @route GET api/analytics
// @desc GET data from mLab neovu Database
// @access Public
router.get("/analytics", (req, res) => {
  // Data display: GET data from DB, save to State.
  
  // Vu.find({ 'num_Vu_Opened': { $ne: [] } })
  //   .exec(function (error, vuData) {
    //     var results = vuData.map((curr) => {
  //       var num_Vu_opened = curr.num_Vu_opened;
  //       var vu_Duration = curr.vu_Duration;
  //       var button_taps = curr.button_taps;
  //       return {
    //         num_Vu_opened: num_Vu_opened,
    //         vu_Duration: vu_Duration,
    //         button_taps: button_taps
    //       };
    //     });
    //     console.log('+++++++++++++++++++++++++++++++');
    
    //     console.log(results);
    //     res.json(results);
    //   });
  console.log(vuData.button_taps);

    vu.find({}).toArray((err, data) => {
      console.log('+++++++++++++++++++++++++++++++');
      if (err) { 
        console.log(err);
        res.error(err);
      } else {
        res.json(data);
      }
    });

});

module.exports = router;