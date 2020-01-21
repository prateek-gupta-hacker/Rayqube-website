const mongoose = require('mongoose');

var workSchema = new mongoose.Schema({
    workplace: {
        type: String,
        required: 'This field is required.'
    },
    name_of_event: {
        type: String
    },
    date_of_event: {
        type: String
    },
    description: {
        type: String
    },
    imagename: {
        type: String
    },
    videoLink: {
        type: String
    },
});

module.exports = mongoose.model('work', workSchema, 'listofwork');