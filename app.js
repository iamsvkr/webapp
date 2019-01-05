var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var admin = require("firebase-admin");
var hbs = require('hbs');
var serviceAccount = require("./sk.json");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'hbs');


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://rsi-project-656a3.firebaseio.com"
});

app.get('/',(req,res)=>{
  res.render('myfront.hbs');
  //res.sendFile(__dirname+'/l1.html');
});

var user, mobile, pass;

app.post('/',(req,res)=>{
  user = req.body.user;
  //console.log(user);
  var uid = admin.database().ref('UserSignIn/'+user);
  uid.on('value', function(snapshot) {
    if(snapshot.val()===null){
      res.send('error');
      //console.log("error");
    }else{
      res.render('myregister.hbs');
      //res.sendFile(__dirname+'/l2.html');
      // console.log(snapshot.val());
    }
  });
});

app.post('/login',(req,res)=>{
  mobile = req.body.mobile;
  pass = req.body.pass;
  // console.log(mobile);
  // console.log(pass);
  var uid = admin.database().ref('UserSignIn/'+user);
  uid.on('value',function(snapshot){
    if(snapshot.val().mobno===mobile && snapshot.val().pass===pass){
      res.send('success');
    }else{
      res.send('error');
    }
  });
});

app.listen(3000);
