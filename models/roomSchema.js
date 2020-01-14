const mongoose = require('mongoose');

var roomSchema = mongoose.Schema({
        username: {
            type: String,
            required: false
        },
        houseID: {
            type: String,
            required: false
        },
        roomID: {
            type: String,
            required: false
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