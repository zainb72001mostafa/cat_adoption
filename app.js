const express = require("express");
const mongoose=require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser');
const catRoutes = require('./routes/cats');
require('dotenv').config();

const app = express();

//parse requests
app.use(bodyParser.json());

//routes
app.use(catRoutes);
app.use(cors());

//serv images folder
app.use(express.static('uploads'));

//connect to mongodb
var DB_URL=process.env.DB_URL;
mongoose.connect(DB_URL).then(result =>{
    app.listen(3307);
    console.log("connected to database succesfully !!");
}).catch(err => console.log(err));
