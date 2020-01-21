const mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
    productName:{
        type: String,
        required: "Field is required"
    },
    price:{
        type: String,
        required: "Field is required"
    },
    photoName:{
        type: String,
        required: "Field is required"
    },
    description:{
        type: String,
        required: "Field is required"
    },
    specification:{
        type: String,
        required: "Field is required"
    },
    availability:{
        type: Boolean,
        required: "Field is required"
    },
    sizes:{
        type: Array,
        required: "Field is required"
    },
    brandid:{
        type: String,
        required: 'Field is required'
    },
    brandName:{
        type: String,
        required: "Field is required"
    },
    productCode:{
        type: String,
        required: "Field is required"
    },
    categoryName:{
        type: String,
        required: "Field is required"
    },
    categoryCode:{
        type: String,
        required: 'Field is required'
    },
    keywords:{
        type: Array,
        required: "Field is required"
    },
});
module.exports = mongoose.model('addproduct', productSchema, 'addproduct');