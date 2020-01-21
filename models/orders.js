
const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    orderNumber:{
        type: Number,
    },
    expectedDeliveryDate:{
        type: String
    },
    selectedAddress:{
        type: String
    },
    currentSituation:{
        type: String
    },
    orderStatus:{
        type: String
    }
})

module.exports = mongoose.model('orders', orderSchema, 'orders');