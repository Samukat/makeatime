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
        DBFunctions.addDays
    )
    
  
    res.status(201).json(newEvent);
  });

  module.exports = router;