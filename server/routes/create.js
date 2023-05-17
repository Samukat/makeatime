const express = require('express');
var bodyParser = require('body-parser');

const router = express.Router();
const DBFunctions = require('../DBInterface');




router.post('/', bodyParser.json(), (req, res) => {
    const { eventName, dates, calenderType, startTime, endTime } = req.body;
    

    //data validation
    if (eventName.length == 0 || eventName == null || eventName.length > 100) {
        res.status(400).json({err: "Event name is invalid."});
        return;
    }
    if (calenderType != 0 && calenderType != 1) {
        res.status(400).json({err: "calenderType is invalid."});
        return
    }
    if (dates == null || dates.length == 0) {
        res.status(400).json({err: "Dates are invalid."});
        return;
    } else if (calenderType == 1 && dates.some((day) => {day > 7 || day < 0})) {
        res.status(400).json({err: "Dates are invalid."});
        return;
    } 
    if (startTime == null || endTime == null) {
        res.status(400).json({err: "Times are invalid."});
        return;
    } else if (endTime <= startTime) {
        res.status(400).json({err: "Times are invalid."});
        return;
    }

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
                res.status(400)
                return;
            }
            DBFunctions.addDays(dates, calenderType, EventId, (err, res) => {
                if (err) {
                    DBFunctions.deleteEventById(EventId, (err, res)=>{err?console.log(err):null});
                    res.status(400)
                    return;
                }

                
                //DBFunctions.addTimes
                //console.log(res)
            })
        }
    )
    
    
    res.status(201).json(newEvent);
  });

  module.exports = router;