const express = require('express');
const connectDb = require('./config/dbConnection');
const errorHandler = require('./middleware/errorhandler');

const dotenv = require("dotenv").config();
const app = express();
connectDb();
//var app = server.createServer()
var port = process.env.port || 3000;

app.get('/url',(req, res)=>{
    res.status(200).send('We are here LP');
    
});


app.use(express.json());
app.use("/api/contacts", require("./routes/contactsRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);
app.listen(port, ()=>{console.log(`Server running on this port ${port}`)});