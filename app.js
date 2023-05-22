const express = require("express");
const mongoose=require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser');
const catRoutes = require('./routes/cats');

const app = express();

//parse requests
app.use(bodyParser.json());

//routes
app.use(catRoutes);
app.use(cors());

//serv images folder
app.use(express.static('uploads'));

//connect to mongodb
mongoose.connect('mongodb+srv://zainb_23:cat_adoption_app@cluster0.r57l7.mongodb.net/').then(result =>{
    app.listen(3307);
    console.log("connected to database succesfully !!");
}).catch(err => console.log(err));
