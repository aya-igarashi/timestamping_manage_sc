const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));


const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const mongouri = 'mongodb+srv://'+process.env.USER+':'+process.env.PASS+'@'+process.env.MONGOHOST;

app.use(express.static("public"));



// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/src/pages/index.html");
});
