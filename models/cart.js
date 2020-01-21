const mongoose = require("mongoose");

var cartSchema = new mongoose.Schema({
    emailId: {
        type: String,
        required: "Field is required"
    },
    productName: {
        type: String
    },
    quantity: {
        type: Number
    },
    price:{
        type: Number
    },
    productCode: {
        type: String
    },
    brandName: {
        type: String
    },
    size: {
        type: String
    }
    
})

module.exports = mongoose.model('cart', cartSchema, 'cart');