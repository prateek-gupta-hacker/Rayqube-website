var express = require('express');
var _router = express.Router();
var multer = require('multer');


var storage = multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,'upload/');
    },
    filename:function(req,res,cb){
        cb(null, Date.now() + res.originalName);
    }
});
var upload1 = multer({storage: storage});
// var upload = multer({storage:store}).single('file');


_router.post('/upload', upload1.single('avatar'), function(req,res,next){
    console.log(req.file);
    const file = req.file;
    console.log(file);
    res.status(200);
    res.send(file);
});



// _router.post('/upload', function(req,res,next){
//     upload(req,res,function(err){
//         if(err){
//             return res.status(501).json({error:err});
//         }

//         res.json({originalname:req.file.originalname, uploadname: req.file.filename});
//     });
// });

module.exports = _router;