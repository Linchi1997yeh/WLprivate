//user scheme
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        position: {
            type: String,
            default: ""
        },
        houseName:{
            type:String,
            required: true
        }
});

userSchema.methods.generateHash = password =>{
        return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
    }
userSchema.methods.validPass = (pass,encryptpass) =>{
        console.log('inside validPass');
        return bcrypt.compareSync(pass,encryptpass);
} 

module.exports = mongoose.model('User',userSchema);