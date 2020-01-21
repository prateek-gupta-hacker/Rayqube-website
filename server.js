const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


const api = require('./server/routes/api');
const fileUpload = require('./server/routes/file');

const port = 1338;

app = express();
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
    next();
  });
app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.use('/file', fileUpload);
app.use('/api', api);
app.use('/uploads', express.static('uploads'));
//CORS Middleware

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, 'dist/Rayqube-Dashboard/index.html'));
});

app.listen(port, function(){
    console.log("server is running on" + port);
});


// var mongoDB = 'mongodb://127.0.0.1/my_database';
// mongoose.connect(mongoDB, { useNewUrlParser: true });

// var db = mongoose.connection;

// var Schema = mongoose.Schema;

// var blog = new Schema({
//     Title: String,
//     date: Date,
//     blog:String
//   });

//   var newBlog = mongoose.model('blog', blog );
// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/blogs', { useNewUrlParser: true }, (err) => {
//     if (!err) { console.log('MongoDB Connection Succeeded.') }
//     else { console.log('Error in DB connection : ' + err) }
// });
// require('./src/app/models/blog-model.js');