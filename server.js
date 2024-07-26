const express = require("express");
const app = express();
const mongo = require('mongoose');
const morgan = require("morgan");
const bodyParser =require("body-parser")
const dotenv = require('dotenv');
dotenv.config();

mongo.connect(process.env.MONGO_URI).then(()=>console.log("Db connected :::::::::: mongodb"));

// mongo.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    // .then(() => console.log('MongoDB connected'))
    // .catch(err => console.log(err));

mongo.connection.on("error",err=>{
    console.log("DB connection error:"+err.message)
})

const routes = require('./routers/routers');

app.use(morgan("dev"));
app.use(bodyParser.json());

app.use('/', routes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log('nodejs api is listening at the port:' + PORT);
});