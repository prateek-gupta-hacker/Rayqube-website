const mongoose = require('mongoose');

var teamMembers = new mongoose.Schema({
    memberName: {
        type: String,
        required: 'This field is required.'
    },
    designation: {
        type: String,
        required: 'This field is required.'
    },
    imagename: {
        type: String
    },
});

module.exports = mongoose.model('teamMembers', teamMembers, 'teamMembers');