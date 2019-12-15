const mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
    type: {
        type: String,
        default: 'event'//evet or notification
    },
    place: {
        type: String,
        required: true
    },
    photo: {//url
        type: String,
        required: false
    },
    houseToShow: {
        type: Object,//[ 'house1', 'house2', ...]
        required: true
    },
    title:{
        type:String,
        required:true
    },
    date: {
        type: Date,
        required: Date.now
    },
    description: {
        type: String,
        required: true
    },
    host: {//email
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('event',eventSchema);