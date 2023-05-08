const express = require('express');
const testRoutes = require("./routes/test");


const PORT = 3000;

const app = express();

app.set('trust proxy', true);

//routes 
app.use('/test', testRoutes);



//middlewear
function logger(req, res, next) {
    console.log(`[${Date.now()}] ${req.method} ${req.ip}`)
    next();
}

app.use(logger);


//things
app.get("/test", (req, res) => {
    res.status(200).json({ ok: true })
});








app.listen(PORT, () => console.log(`Server now listening on port ${PORT}`));