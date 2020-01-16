const mongoose = require('mongoose');

var problemSchema = mongoose.Schema({
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        cathegory: {
          type: String,
          required: true
      },
        room: {
            type: String,
            required: true
        },
        house: {
          type: String,
          required: true
        },
        date: {
            type: Date,
            required: true,
            default: Date.now
        },
        detail: {
            type: String,
            required: true
        },
        solved:{
          type: Boolean,
          require: true,
          default: false
        },
});
module.exports = mongoose.model('problem',problemSchema);