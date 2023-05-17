const express = require('express');
var bodyParser = require('body-parser');

const router = express.Router();
const DBFunctions = require('../DBInterface');




router.post('/', bodyParser.json(), (req, res) => {
    //console.log(req.body);
    const { eventName, dates, calenderType, startTime, endTime } = req.body;
    console.log(dates);
    //to do data

    
    const newEvent = {
        eventName, 
        calenderType, 
        startTime, 
        endTime
    };
    
    DaysArray = [
        1,2,3,4
    ]

    DBFunctions.createEvent(newEvent,
        (err, EventId) => {
            if (err != null) {
                return;
            }
            DBFunctions.addDays(DaysArray, EventId)
        }
    )
    
    res.status(201).json(newEvent);
  });

  module.exports = router;