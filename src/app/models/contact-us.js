const mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This field is required.'
    },
    date: {
        type: String
    },
    email: {
        type: String
    },
    message: {
        type: String
    },
});

module.exports = mongoose.model('contactus', blogSchema, 'contactus');
