const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://jorgehernandez:Pipo098!@cluster0.ivre1e0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
let db = null;
//connects to mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client){
    console.log('connected to db server');
    db = client.db('myproject');
});

function create(name, email, password, balance){
    return new Promise((resolve, reject)=> {
        const collection = db.collection('users');
        const doc = {name, email, password, balance};
        collection.insertOne(doc, {w:1}, function(err,result){
            err ? reject(err) : resolve(doc);
        });
    });
}

function update(email, amount){
    return new Promise((resolve, reject)=>{
        const users = db
        .collection('users')
        .findOneAndUpdate(
            {email: email},
            {$inc: {balance: amount}},
            {returnOriginal: false},
            function(err, documents){
                err ? reject(err) : resolve(documents);
            }
        );
    });
}
//on 2/17/23 I changed the constant users from customers to users-
function all(){
    return new Promise((resolve,reject)=>{
        const users = db
        .collection('users')
        .find({})
        .toArray(function(err,docs){
            err ? reject(err) : resolve(docs);
        });
    })
}
function findOne(email){
    return new Promise((resolve, reject)=> {
        const users = db
        .collection('users')
        .findOne({email: email})
        .then((doc => resolve(doc)))
        .catch((err) => reject (err))
    })
}
module.exports = {create, all, update, findOne};