const express = require('express');

const router = express.Router();


router.get("", (req, res) => {
    res.send("This is the test page");
});

router.get("/id/:id", (req, res) => {
    res.status(200).json({ current_ID: req.params.id });
});

module.exports = router;
