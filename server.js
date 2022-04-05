const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

//envファイルからmongoDB接続
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const mongouri = 'mongodb+srv://'+process.env.USER+':'+process.env.PASS+'@'+process.env.MONGOHOST;
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});


app.use(express.static("public"));
// listen for requests :)


// 最初のページを表示
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

//ページ遷移
app.get("/input", (request, response) => {
  response.sendFile(__dirname + "/views/directuser.html");
});

app.get("/input2", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});