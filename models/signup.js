const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: "Field is required"
    },
    // lastname:{
    //     type: String,
    //     required: "Field is required"
    // },
    contact:{
        type: Number,
        required: "Field is required"
    },
    // address1:{
    //     type: String,
    //     required: "Field is required"
    // },
    // address2:{
    //     type: String,
    //     required: "Field is required"
    // },
    email:{
        type: String,
        required: "Field is required"
    },
    password:{
        type: String,
        required: "Field is required"
    },
    token:{
        type: Number,
        required: 'Field is required'
    }
});
module.exports = mongoose.model('signup', userSchema, 'signup');