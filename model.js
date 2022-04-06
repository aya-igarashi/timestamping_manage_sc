const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const mongouri = 'mongodb+srv://'+process.env.USER+':'+process.env.PASS+'@'+process.env.MONGOHOST;
var db = MongoClient.connect(mongouri, function(err, res) {
   if(err){
        console.log('Error connected: ' + mongouri + ' - ' + err);
    }else{
        console.log('Success connected: ' + mongouri);
    }
});

var UserSchema = new mongodb.Schema({
    email    : String,
    password  : String
},{collection: 'users'});

exports.User = db.model('timestamping_system_DB', UserSchema);