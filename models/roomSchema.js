const mongoose = require('mongoose');

var roomSchema = mongoose.Schema({
        username: {
            type: String,
            required: true
        },
        houseID: {
            type: String,
            required: true
        },
        roomID: {
            type: String,
            required: true
        },
        startDate: {
            type: Date,
            required: false
        },
        endDate: {
            type: Date,
            required: false
        }
});
module.exports = mongoose.model('room',roomSchema);