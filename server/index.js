const express = require('express');
const PORT = 3001;
const app = express();


const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}


app.use(cors(corsOptions)) // Use this after the variable declaration
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