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
  res.sendFile(__dirname+'/l3.html');
});

app.post('/',(req,res)=>{
  var user = req.body.user;
  var pass = req.body.pass;
  var newpass = req.body.newpass;
  var uid = admin.database().ref('UserSignIn/'+user);
  uid.on('value', function(snapshot) {
    if(snapshot.val()===null){
      res.send('error1');
    }
    else{
      if(snapshot.val().pass === pass){
        // var npk = admin.database().ref('UserSignIn/'+user).push().value;
        // var update = {};
        // update[admin.database().ref('UserSignIn/'+user+'/pass').valu] = newpass;
        // admin.database().ref('UserSignIn/'+user).update(update);

        // admin.database().ref('UserSignIn/'+user).set({
        //   mobno : "8698561146",
        //   pass : newpass,
        //   rsiID : user
        // });

        admin.database().ref('UserSignIn/'+user + '/pass').set(newpass);

        res.send('success');
      }
    }
  });
});


app.listen(3000);
