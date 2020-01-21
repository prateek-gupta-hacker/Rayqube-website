const mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'This field is required.'
    },
    date: {
        type: String
    },
    blogContent: {
        type: String
    },
    imagename: {
        type: String
    },
});

module.exports = mongoose.model('daily-task', blogSchema, 'dailytask');
