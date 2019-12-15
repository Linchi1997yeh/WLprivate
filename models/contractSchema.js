const mongoose = require('mongoose');


var contractSchema = mongoose.Schema({
        email: {
            type: String,
            required: true
        },
        roomName: {
            type: String,
            required: true
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        duration: {
            type: Number,
            required: true
        }
});
module.exports = mongoose.model('contract',contractSchema);