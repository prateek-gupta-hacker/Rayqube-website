const mongoose = require("mongoose");

var offersSchema = new mongoose.Schema({
    productCode: {
        type: Number
    },
    imageName:{
        type: String
    },
    offeredPrice:{
        type: Number
    },
    brandName: {
        type: String
    },
    productName: {
        type: String
    }
})

module.exports = mongoose.model('offers', offersSchema, 'offers');