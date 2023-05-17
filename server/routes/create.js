const express = require('express');
var bodyParser = require('body-parser');

const router = express.Router();
const DBFunctions = require('../DBInterface');




router.post('/', bodyParser.json(), (req, res) => {
    //console.log(req.body);
    const { eventName, dates, calenderType, startTime, endTime } = req.body;
    console.log(dates);
    //to do data

    let timeCreated = new Date();

    
    const newEvent = {
        eventName, 
        calenderType, 
        startTime, 
        endTime,
        timeCreated
    };
    

    DBFunctions.createEvent(newEvent,
        (err, EventId) => {
            if (err) {
                return;
            }
            DBFunctions.addDays(dates, calenderType, EventId, (err, res) => {
                //DBFunctions.addTimes
                console.log(res)
            })
        }
    )
    
    res.status(201).json(newEvent);
  });

  module.exports = router;