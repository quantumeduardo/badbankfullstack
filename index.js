const express = require('express');
const app = express();
const cors  = require('cors');
const dal = require('./dal.js');
app.use(express.static('public'))
app.use(cors());

async function verifyToken(req,res, next){
    const token = req.headers.authorization;

if (token) {
   admin.auth().verifyToken(token)
    .then(decodedToken => {
        console.log("Decoded Token: ", decodedToken);
        return next();
    }).catch(err => {
        return res.status(401).send('Unauthorized');
    }) 
}
    else {
        return res.status(401).send('No Token found');
    } 
}



// create user

app.get('/account/create/:name/:email/:password/:amount', function(req,res){
    dal.create(req.params.name,req.params.email, req.params.password, req.params.amount).
    then((user)=>{
        console.log(user);
        res.send(user);
    });
    });

//Update balance when a deposit or withdraw is made    
app.get('/account/update/:email/:amount', (req, res)=>{
    const params = req.params;
    dal.update(params.email, parseInt(params.amount))
    .then (user =>{
        console.log(user);
        res.send(user);
    });
});


// get all accounts
app.get('/account/all', function(req,res){
    dal.all().
    then((user)=>{
     console.log(user);
     res.send(user);
    });
 });


 //get email 
app.get('/account/findOne/:email',  (req,res)=>{
        dal.findOne(req.params.email)
         .then(user => {
             console.log(user);
             res.send(user)
         });
         })

const PORT = process.env.PORT || 3000;
    app.listen(PORT);
    console.log(PORT);

