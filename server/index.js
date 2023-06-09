const express = require('express');
const PORT = 4000;
const app = express();
app.use(express.json());


const cors = require("cors");
const corsOptions ={
   origin:'*',    //maybe change...? depends how open we want this.. (note, hosting ip is automaticcaly allowed --> no need to leave open or configure if client and server on same ip)
   method: "GET, POST", //to do: PUT? https://stackoverflow.com/questions/630453/what-is-the-difference-between-post-and-put-in-http
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200 //really only for legacy browser
}
app.use(cors(corsOptions)) // Use this after the variable declaration

app.set('trust proxy', true); //for ip stuff (id)

//routes 
const testRoutes = require("./routes/test");
const view = require("./routes/view");
const create = require("./routes/create");

//routes 
app.use('/test', testRoutes);
app.use('/view', view);
app.use('/create', create);

//db
// /const DBFunctions = require('./DBInterface');

//middlewear
function logger(req, res, next) {
    console.log(`[${Date.now()}] ${req.method} ${req.ip}`)
    next();
}

app.use(logger);

app.listen(PORT, () => console.log(`Server now listening on port ${PORT}`));