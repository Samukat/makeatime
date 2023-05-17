const express = require('express');
var bodyParser = require('body-parser');

const router = express.Router();
const DBFunctions = require('../DBInterface');
const e = require('express');


router.get("/:id", (req, res) => {
    DBFunctions.getEventById(req.params.id, (err, result) => {
        if (err) {
            res.status(400).json(err);
            return;
        }

        console.log()

        //THIS WAS REALLY LAZY AND NEEDS TO BE REWRITTEN
        try {
            let data = JSON.parse(JSON.stringify(result[0]));
            
            //convert all lists to lists..
            for (const [key, value] of Object.entries(data)) {
                try { //kinda stupid ngl
                    data[key] = (JSON.parse(value));
                } catch (error) {
                    //do nothing
                }
                
            }

            res.status(200).json(data);
            return;
        } catch {
            res.status(400).json("unable to fetch");
            return;
        }
        res.status(400).json("unable to fetch");
        return;
    })
    res.status(200);
    return;
});

module.exports = router;