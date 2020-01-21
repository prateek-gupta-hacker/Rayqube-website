const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const signUp = require('../../models/signup');
const addProduct = require('../../models/addproduct');
const Cart = require('../../models/cart');
const orders = require('../../models/orders');
const offers = require('../../models/offers');

const pHash = require("password-hash");


var email;
var url = "http://localhost:3000/api/reset/";
var token;
const server = require("../../server");
var newToken = 123456987;

mongoose.connect('mongodb://localhost:27017/shoppingportal', { useNewUrlParser: true }, (err, shoppingportal) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

router.get('/', function(req, res){
    res.send("api works");
});


module.exports = router;

// Login Signup API's------------------------------ Starts here


router.post('/signup', (req, res) => {                                                                  // Signup API------------------------------ Starts Here

    signUp.findOne({'email': req.body.email}, (err, user) => {
        console.log(user);
        if(user === null){
            var signup = new signUp();
            // signup.firstname = req.body.firstname;
            signup.name = req.body.name;
            signup.contact = req.body.contact;
            // signup.address1 = req.body.addrngess1;
            // signup.address2 = req.body.address2;
            signup.email = req.body.email;
            signup.password = req.body.password;
            signup.password = pHash.generate(req.body.password);
            
            signup.token = 123456789;
            console.log(signup);
            signup.save((err,signupData) => {
                if(err){
                    throw err;
                }else{
                    res.json(signupData);
                    res.status(200);
                }
            });
        }else{
            res.status(500).send({
                message: "User already exist",
                status: 500
            });
        }
    })
});                                                                                                      // Signup API------------------------------ Ends Here

router.post('/login', (req, res) => {                                                                    // Login API------------------------------ Starts Here
    signUp.findOne({'email':req.body.email}, (err, user) => {
        if(user === null){
            res.status(400).send({
                message: 'User does not exist',
                status: 400
            })
        }else if(pHash.verify(req.body.password, user.password)){
            res.status(200).send({
                message: "success",
                status: 200
            })
        }else{
            res.status(400).send({
                message: "password is incorrect",
                status: 400
            })
        }
    })
});                                                                                                     // Login API------------------------------ Ends Here

router.post('/forgot', (req, res) => {                                                                  // Forgot Password API------------------------------ Starts Here
    signUp.findOne({'email': req.body.email}, (err, user) => {
        if(user===null){
            res.status(400).send({
                message: 'User does not exist',
                status: 400
            })
        }else{
            email = req.body.email;
            token = user.token;
            server.sendEmail(email, url, token);
            res.status(200).send({
                message: "success",
                status: 200
            })
        }
    })
});                                                                                                     // Forgot Password API------------------------------ Ends Here

router.get('/reset/:email/:token', (req,res) => {                                                       // Password Reset API------------------------------ Starts Here
    
    signUp.findOne({'email': req.params.email}, (err, user) => {
        // console.log( user.token.toString);
        // console.log( req.params.token);
        if(user.token == req.params.token){
            signUp.findOneAndUpdate(req.params.email, {$set:{"token": newToken}}, {new: true}, (error, updatedData) => {
                console.log(updatedData);
                res.status(200).send({
                    message: 'success',
                    status: 200
                })
            });
            
        }else{
            res.status(400).send({
                message: 'failure',
                status: 400
            })
        }
    })
})                                                                                                      // Password Reset API------------------------------ Ends Here

// Login Signup API's------------------------------ Ends Here

// Product API's------------------------------ Starts Here

router.post('/addproduct', (req, res) => {                                                              // Add Product API------------------------------ Starts Here
    var addproduct = new addProduct();
    addproduct.productName = req.body.productName;
    addproduct.price = req.body.price;
    addproduct.photoName = req.body.photoName;
    addproduct.description = req.body.description;
    addproduct.specification = req.body.specification;
    addproduct.availability = req.body.availability;
    addproduct.sizes = req.body.sizes;
    addproduct.brandid = req.body.brandid;
    addproduct.brandName = req.body.brandName;
    addproduct.productCode = req.body.productCode;
    addproduct.categoryName = req.body.categoryName;
    addproduct.categoryCode = req.body.categoryCode;
    addproduct.keywords = req.body.keywords;
  
    addproduct.save((err,productData) => {
        if(err){
            throw err;
        }else{
            res.json(productData);
            res.status(200);
        }
    })
});                                                                                                 // Add Product API------------------------------ Ends Here

router.get('/product', (req, res) => {                                                              // Get All Product API------------------------------ Starts Here
    console.log("get request");
    addProduct.find({}).exec((err, allProducts) => {
        if(err){
            console.log(err);
        }else{
            res.json(allProducts);
            res.status(200);
        }
    })
});                                                                                                // Get All Product API------------------------------ Ends Here

// Product API's------------------------------ Ends Here

// Cart API's------------------------------ Starts Here

router.post('/addtocart', (req,res) => {                                                            // AddToCart API------------------------------ Starts Here
    console.log("post request");
    Cart.findOne({"productCode": req.body.productCode}, (err, cartData) => {
        if(cartData === null){
            var cart = new Cart();
            cart.emailId = req.body.emailId;
            cart.productName = req.body.productName;
            cart.quantity = req.body.quantity;
            cart.price = req.body.price;
            cart.productCode = req.body.productCode;
            cart.brandName = req.body.brandName;
            cart.size = req.body.size;
            cart.save((err, cartData) => {
                if(err){
                    console.log(err);
                }else{
                    res.json(cartData);
                    res.status(200);
                }
            })  
        }else{
            if(req.body.productCode === cartData.productCode){
                Cart.findOneAndUpdate({"productCode": req.body.productCode}, {$set:{"quantity": req.body.quantity}}, {new: true}, (err, changedData) => {
                    if(err){
                        console.log(err);
                    }else{
                        res.json(changedData);
                        res.status(200);
                    }
                    
                })
            }
        }
    })
});                                                                                                         // AddToCart API------------------------------ Ends Here
router.post('/showcart', (req,res) => {                                                                     // Get Cart API------------------------------ Starts Here
    Cart.find({"email": req.body.email}, (err, cartData) => {
        if(err){
            console.log(err);
        }else{
            res.status(200).json(cartData);
        }
    })
});                                                                                                         // Get Cart API------------------------------ Ends Here

// Cart API's------------------------------ Ends Here
// Orders API's------------------------------ Ends Here

router.get('/orders', (req, res) => {                                                                       // Get All Orders API------------------------------ Starts Here
    orders.find({}).exec((err, allOrders) =>{
        if(err){
            console.log(err);
        }else{
            res.status(200).json(allOrders);
        }
    })
})                                                                                                          // Get All Orders API------------------------------ Ends Here



router.post('/order', (req, res) => {                                                                       // Get one Orders API as per order number------------------------------ Starts Here
    orders.find({'orderNumber': req.body.orderNumber}, (err, data) => {
        if(err){
            console.log(err);
        }else{
            res.status(200).json(data);
        }
    })
})                                                                                                          // Get one Orders API as per order number------------------------------ Ends Here



router.post('/order', (req, res) => {                                                                       // Get one Orders API as per contact number------------------------------ Starts Here
    orders.find({'contactNumber': req.body.contactNumber}, (err, data) => {
        if(err){
            console.log(err);
        }else{
            res.status(200).json(data);
        }
    })
})                                                                                                          // Get one Orders API as per contact number------------------------------ Ends Here

router.post('/order', (req, res) => {                                                                       // Get one Orders API as per email------------------------------ Starts Here
    orders.find({'email': req.body.email}, (err, data) => {
        if(err){
            console.log(err);
        }else{
            res.status(200).json(data);
        }
    })
})                                                                                                          // Get one Orders API as per email------------------------------ Ends Here



// router.post('/order-placement', (req, res) => {

// })

// Orders API's------------------------------ Ends Here
// Offers API's------------------------------ Ends Here

router.get('/offers', (req, res) => {                                                                       // Get All Offers API------------------------------ Starts Here
    offers.find({}).exec((err, allOffers) => {
        if(err){
            console.log(err);
        }else{
            res.status(200).json(allOffers);
        }
    })
})                                                                                                          // Get All Offers API------------------------------ Ends Here
// Offers API's------------------------------ Ends Here