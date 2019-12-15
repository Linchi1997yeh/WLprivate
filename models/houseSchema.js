const mongoose = require('mongoose');

var houseSchema = mongoose.Schema({
    Address: {
        type: String,
        required: true
    },
    NumRooms: {
        type: Number,
        required: true
    },
    photo: {
        type: String,
        required: false
    },
    HouseName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('house',houseSchema);