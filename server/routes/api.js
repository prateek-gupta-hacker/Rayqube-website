const express = require('express');
const router = express.Router();
const allBlogs = require("../../src/app/models/blog-model");
const teamMembers = require("../../src/app/models/team-model");
const work = require("../../src/app/models/work-model");
const contactus = require("../../src/app/models/contact-us");
const signUp = require("../../src/app/models/signup-model");
const dailyTask = require("../../src/app/models/daily-task");
var multer = require('multer');
var passwordHash = require('password-hash');

router.get('/', function(req, res){
    res.send("api works");
});
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/blogs', { useNewUrlParser: true }, (err, blogs) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});
require("../../src/app/models/blog-model");
// mongoose.connect('mongodb://localhost:27017/blogs.teamMembers', { useNewUrlParser: true }, (err) => {
//     if (!err) { console.log('MongoDB Connection Succeeded.') }
//     else { console.log('Error in DB connection : ' + err) }
// });
// require("../../src/app/models/blog-model/teamMembers");

var storage = multer.diskStorage({
    // destination
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().getDate() + "_" + new Date().getMinutes() + "_" + new Date().getSeconds() + file.originalname);
    }
});
var upload = multer({ storage: storage });
router.post("/upload", upload.single("avatar"), function (req, res) {
    console.log('files', req.file);
    res.send(req.file);
});


module.exports = router;
// mongoose.connect('mongodb://localhost:27017/blogs', { useNewUrlParser: true }, (err) => {
//     if (!err) { console.log('MongoDB Connection Succeeded.') }
//     else { console.log('Error in DB connection : ' + err) }
// });




router.get('/allblogs', function(req, res){
    console.log("get request");
    allBlogs.find({})
        .exec(function(err, allblogs){
            if(err){
                console.log('error blogs');
            }else{
                res.json(allblogs);
            }
        });
});
router.post('/allblogs', function(req,res){
    console.log("post request");
    var newBlog = new allBlogs();
    newBlog.title = req.body.title;
    newBlog.date = req.body.date;
    newBlog.blogContent = req.body.blogContent;
    newBlog.imagename = new Date().getDate() + "_" + new Date().getMinutes() + "_" + new Date().getSeconds() + req.body.imagename;
    console.log(newBlog);
    newBlog.save(function(err, insertedBlog){
        if(err){
            console.log("error saving blog");
        }else{
            res.json(insertedBlog);
            res.status(200);
        }
    })
});
router.post('/contactus', function(req, res){
    var message = new contactus();
    message.name = req.body.name;
    message.date = req.body.date;
    message.email = req.body.email;
    message.message = req.body.message;
    message.save(function(err, insertedMessage){
        if(err){
            console.log("error saving blog");
        }else{
            res.json(insertedMessage);
            res.status(200);
        }
    })
});

router.post('/signUp', function(req,res){
    console.log("post request");
    
    signUp.findOne({'email': req.body.email} , function(err, user){
        if(user === null){
            const signup = new signUp();
            signup.name = req.body.name;
            signup.email = req.body.email;
            signup.password = passwordHash.generate(req.body.password);
            signup.joiningdate = req.body.joiningdate;
            signup.employeeId = req.body.employeeId;
            signup.designation = req.body.designation;
            signup.save(function(err, insertedUser){
                if(err){
                    console.log("error saving user");
                    
                }else{
                    res.json(insertedUser);
                    res.status(200);
                }
            });
        } else{
            return res.status(200).send({ 
                message : "User already exists"
            });
        }
    });
});
router.post('/login', function(req,res){
    
    signUp.findOne({ 'email' : req.body.email }, function(err, user) {
        console.log('ISMATCH IS: ' + user)
        if (user === null) { 
            return res.status(200).send({ 
                STATUS : "failure",
                message : "User not found."
            }); 
        }  else { 
            if (passwordHash.verify(req.body.password, user.password)) { 
                return res.status(200).send({ 
                    STATUS : "success",
                    message : "User Logged In", 
                }) 
            } 
            else { 
                return res.status(400).send({ 
                    STATUS : "failure",
                    message : "Wrong Password"
                }); 
            } 
        }
    });
    
});
    // } else if(req.body.login){
    //     db.collection('userDetail').findOne({ email : req.body.email }, function(err, user) {
    //         console.log('ISMATCH IS: ' + user)
    //         if (user === null) { 
    //             return res.status(400).send({ 
    //                 message : "User not found."
    //             }); 
    //         }  else { 
    //             if (passwordHash.verify(req.body.password, user.password)) { 
    //                 return res.status(201).send({ 
    //                     message : "User Logged In", 
    //                 }) 
    //             } 
    //             else { 
    //                 return res.status(400).send({ 
    //                     message : "Wrong Password"
    //                 }); 
    //             } 
    //         } 
    //       })
    // }
    
    
    
   
    
// });

router.get('/allblogs/:id', function(req,res){
    console.log("post request");
    allBlogs.findById(req.params.id, function(err, blog){
        console.log(blog);
        if(err){
            res.send("error while finding video");
        }else{
            res.json(blog);
        }
    })
});


router.post('/allblogs/:id', function(req,res){
    console.log("post request");
    allBlogs.findById(req.params.id, function(err, blog){
        if(err){
            res.send("error while findong video");
        }else{
            res.json(blog);
        }
    })
});

router.put('/allblogs/:id', function(req,res){
    console.log("update blog");
    allBlogs.findByIdAndUpdate(req.params.id,
        {
            $set: {title: req.body.title, date: req.body.date, blogContent: req.body.blogContent, imagename: req.body.imagename}
        },
        {new: true},
        function(err, updatedBlog){
            if(err){
                res.send("error while updating video");
            }else{
                res.json(updatedBlog);
            }
        }
        );
});

router.delete('/allblogs/:id', function(req,res){
    console.log("delete blog");
    allBlogs.findByIdAndDelete(req.params.id, function(err, deletedVideo){
        if(err){
            res.send("error while deleting video");
        }else{
            res.json(deletedVideo);
        }
    })
})


// For Team


router.get('/teamMembers', function(req, res){
    // res.send("allblogs");
    console.log("get request");
    teamMembers.find({})
        .exec(function(err, teamMembers){
            if(err){
                console.log('error blogs');
            }else{
                res.json(teamMembers);
            }
        });
});
router.get('/teamMembers/:id', function(req,res){
    console.log("post request");
    teamMembers.findById(req.params.id, function(err, teamMember){
        console.log(teamMember);
        if(err){
            res.send("error while finding video");
        }else{
            res.json(teamMember);
        }
    })
});
router.post('/teamMembers', function(req,res){
    console.log("post request");
    var teamMember = new teamMembers();
    teamMember.memberName = req.body.memberName;
    teamMember.designation = req.body.designation;
    teamMember.imagename = new Date().getDate() + "_" + new Date().getMinutes() + "_" + new Date().getSeconds() + req.body.imagename;
    teamMember.save(function(err, insertedTeamMember){
        if(err){
            console.log("error saving work");
        }else{
            res.json(insertedTeamMember);
            res.status(200);
        }
    })
});

router.post('/teamMembers/:id', function(req,res){
    console.log("post request");
    teamMembers.findById(req.params.id, function(err, members){
        if(err){
            res.send("error");
        }else{
            res.json(members);
        }
    })
});

router.put('/teamMembers/:id', function(req,res){
    console.log("update work");
    allBlogs.findByIdAndUpdate(req.params.id,
        {
            $set: {memberName: req.body.memberName, designation: req.body.designation }
        },
        {new: true},
        function(err, updatedMember){
            if(err){
                res.send("error while updating work");
            }else{
                res.json(updatedMember);
            }
        }
        );
});

router.delete('/teamMembers/:id', function(req,res){
    console.log("delete member");
    allBlogs.findByIdAndDelete(req.params.id, function(err, deletedMember){
        if(err){
            res.send("error while deleting Work");
        }else{
            res.json(deletedMember);
        }
    })
})



// For Work


router.get('/work', function(req, res){
    // res.send("allblogs");
    console.log("get request");
    work.find({})
        .exec(function(err, work){
            if(err){
                console.log('error work');
            }else{
                res.json(work);
            }
        });
});

router.get('/work/:id', function(req,res){
    console.log("post request");
    work.findById(req.params.id, function(err, work){
        console.log(work);
        if(err){
            res.send("error while finding video");
        }else{
            res.json(work);
        }
    })
});
router.post('/work', function(req,res){
    console.log("post request");
    var newWork = new work();
    newWork.workplace = req.body.workplace;
    newWork.name_of_event = req.body.name_of_event;
    newWork.date_of_event = req.body.date_of_event;
    newWork.description = req.body.description;
    newWork.imagename = new Date().getDate() + "_" + new Date().getMinutes() + "_" + new Date().getSeconds() + req.body.imagename;
    newWork.videoLink = req.body.videoLink;
    newWork.save(function(err, insertedWork){
        if(err){
            console.log("error saving work");
        }else{
            res.json(insertedWork);
            res.status(200);
        }
    })
});

router.post('/work/:id', function(req,res){
    console.log("post request");
    work.findById(req.params.id, function(err, work){
        if(err){
            res.send("error");
        }else{
            res.json(work);
        }
    })
});

router.put('/work/:id', function(req,res){
    console.log("update work");
    work.findByIdAndUpdate(req.params.id,
        {
            $set: {workplace: req.body.workplace, name_of_event: req.body.name_of_event, 
                date_of_event: req.body.date_of_event, description: req.body.description }
        },
        {new: true},
        function(err, updatedWork){
            if(err){
                res.send("error while updating work");
            }else{
                res.json(updatedWork);
            }
        }
        );
});

router.delete('/work/:id', function(req,res){
    console.log("delete work");
    work.findByIdAndDelete(req.params.id, function(err, deletedWork){
        if(err){
            res.send("error while deleting Work");
        }else{
            res.json(deletedWork);
        }
    });
});

