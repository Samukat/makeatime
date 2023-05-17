const express = require('express');
var bodyParser = require('body-parser')

const router = express.Router();

router.post('/', bodyParser.json(), (req, res) => {
    console.log(req.body);
    const { eventName, dates, calenderType, startTime, endTime } = req.body;
    const newEvent = {
        eventName, 
        dates, 
        calenderType, 
        startTime, 
        endTime
    };
  
    res.status(201).json(newEvent);
  });

  module.exports = router;