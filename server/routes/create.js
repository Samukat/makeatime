const express = require('express');
var bodyParser = require('body-parser');

const router = express.Router();
const DBFunctions = require('../DBInterface');




router.post('/', bodyParser.json(), (req, res) => {
    console.log(req.body)
    const { eventName, dates, calendarType, startTime, endTime } = req.body;

    //data validation
    if (eventName.length == 0 || eventName == null || eventName.length > 100) {
        res.status(400).json({ err: "Event name is invalid." });
        return;
    }
    if (calendarType != 0 && calendarType != 1) {
        res.status(400).json({ err: "calendarType is invalid." });
        return
    }
    if (dates == null || dates.length == 0) {
        res.status(400).json({ err: "Dates are invalid." });
        return;
    } else if (calendarType == 1 && dates.some((day) => { day > 7 || day < 0 })) {
        res.status(400).json({ err: "Dates are invalid." });
        return;
    }
    if (startTime == null || endTime == null) {
        res.status(400).json({ err: "Times are invalid." });
        return;
    } else if (endTime <= startTime) {

        res.status(400).json({ err: "Times are invalid." });
        return;
    }


    let timeCreated = new Date();
    let ID;

    const newEvent = {
        eventName,
        calendarType,
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
            DBFunctions.addDays(dates, calendarType, EventId, (err2, result) => {
                if (err2) {
                    DBFunctions.deleteEventById(EventId, (err3, result) => { err ? console.log(err3) : null });
                    res.status(400)
                    return;
                }

                console.log("New event created");

                //DBFunctions.addTimes
                res.status(201).json({ "id": EventId });

            });
        }
    );


    return;
});

module.exports = router;