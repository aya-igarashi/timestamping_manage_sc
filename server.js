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

//directuserページへ遷移
app.get("/input", (request, response) => {
  response.sendFile(__dirname + "/views/directuser.html");
});

//user_infoページへ遷移
app.get("/input2", (request, response) => {
  response.sendFile(__dirname + "/views/user_info.html");
});

//indexページへ遷移
app.get("/input3", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

//ユーザーの保存
app.post('/save', function(req, res){
  let received = '';
  req.setEncoding('utf8');
  req.on('data', function(chunk) {
    received += chunk;
  });
  req.on('end', function() {
  const user_np = JSON.parse(received); // 保存対象
  MongoClient.connect(mongouri, function(error, client) {
    const db = client.db(process.env.DB); // 対象 DB
    const colUsers = db.collection('users'); // 対象コレクション
    colUsers.insertOne(user_np, function(err, result) {
      res.sendStatus(200); // HTTP ステータスコード返却
       client.close(); // DB を閉じる
     });
   });
  });
});


//勤怠時刻の編集
app.post('/find', function(req, res){
    let received = '';
  req.setEncoding('utf8');
  req.on('data', function(chunk) {
    received += chunk;
  });
   req.on('end', function() {
    const search_day = JSON.parse(received);
    MongoClient.connect(mongouri, function(error, client) {
    const db = client.db(process.env.DB); // 対象 DB
    const colTimes = db.collection('timemanagement'); // 対象コレクション
    console.log(search_day)  
    const condition = {ymd:search_day};
          
      colTimes.find(condition).toArray(function(err, times) {
        console.log(times);
        res.json(times);
        client.close();
      });
    });
  });
});

app.post('/remove', function(req, res){
  let received = '';
  req.setEncoding('utf8');
  req.on('data', function(chunk) {
    received += chunk;
  });
  req.on('end', function() {
    const del_times = JSON.parse(received); // 保存対象

    const oid = new mongodb.ObjectID(del_times.id);

    const condition = {_id: {$eq: oid}};
    console.log(condition);
    MongoClient.connect(mongouri, function(error, client) {
      const db = client.db(process.env.DB); // 対象 DB
      const colTimes = db.collection('timemanagement'); // 対象コレクション

      colTimes.deleteMany(condition, function(err, result) {
        res.sendStatus(200); // HTTP ステータスコード返却
        client.close(); // DB を閉じる
        console.log(result);
       });
     });
  });
});