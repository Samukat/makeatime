const express = require('express');
const PORT = 3000;
const app = express();



//routes 
const testRoutes = require("./routes/test");
const testData = require("./routes/testing_data");



app.set('trust proxy', true); //for ip stuff 

//routes 
app.use('/test', testRoutes);
app.use('/data', testData);



//middlewear
function logger(req, res, next) {
    console.log(`[${Date.now()}] ${req.method} ${req.ip}`)
    next();
}

app.use(logger);


// //things
// app.get("/test", (req, res) => {
//     res.status(200).json({ ok: true })
// });








app.listen(PORT, () => console.log(`Server now listening on port ${PORT}`));