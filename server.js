const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const api = require("./server/routes/api");
const nodemailer = require("nodemailer");

var app = express();

const port = 5000;

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
    next();
  });

app.use('/api', api);


app.listen(port, () => {
    console.log("We are live on server"+ port);
});



module.exports.sendEmail = function (email, url, token){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'anshuljn087@gmail.com',
            pass: 'Bharat@123'
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    
    var mailOptions = {
        from: 'anshuljn087@gmail.com',
        to: email,
        subject: 'password reset',
        text: url+email+'/'+token
    }
    
    transporter.sendMail(mailOptions, (err, info) => {
        if(err){
            console.log(err);
        }else{
            console.log(info.response);
        }
    });
}