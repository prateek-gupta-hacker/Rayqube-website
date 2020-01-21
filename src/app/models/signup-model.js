const mongoose = require('mongoose');

var teamMembers = new mongoose.Schema({
    name: {
        type: String,
        required: 'This field is required.'
    },
    email: {
        type: String,
        required: 'This field is required.'
    },
    password: {
        type: String,
        required: 'This field is required.'
    },
    joiningdate: {
        type: String,
        required: 'This field is required.'
    },
    employeeId: {
        type: String,
        required: 'This field is required.'
    },
    designation: {
        type: String,
        required: 'This field is required.'
    }
});

module.exports = mongoose.model('userDetail', teamMembers, 'userDetail');