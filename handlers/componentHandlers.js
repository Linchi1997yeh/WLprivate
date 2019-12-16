let Jsonwt = require('jsonwebtoken')
let config = require('../config/config');
let User = require('../models/userSchema');
let Room = require('../models/roomSchema');
let Event = require('../models/eventSchema')
class HandlerGenerator {
    async addEvent(req,res){
      let eventName = req.body.eventName;
      let email = req.decoded.email;
      let eventDate = req.body.eventDate;
      let eventAddress = req.body.eventAddress;
      let eventDescription = req.body.eventDescription;
      let eventImage = req.body.eventImage;
      let eventPhone = req.body.phone;
      console.log(email);
      // set default phone number
      if (!eventPhone){
        eventPhone = 912345678;
      }
      await User.findOne({'email':email},(err, user)=>{
        if (err){
          res.json({
            success: false,
            message: 'Database Error',
            error: err
          });
        }
        if (!user){
          res.json({
            success: false,
            message: 'User not registered'
          });
        } else {
          var newEvent = new Event();
          newEvent.type = 'event';
          newEvent.place = eventAddress,
          newEvent.houseToShow = ['半伴西門','半伴敦南','半伴北車'];
          newEvent.title = eventName;
          newEvent.date = eventDate;
          newEvent.description = eventDescription;
          newEvent.photo = eventImage;
          newEvent.host = user.username;
          newEvent.phoneNumber = eventPhone;
          newEvent.save(err=>{
            if(err){
              res.json({
                success: false,
                message: 'Event not added',
                error: err
              })
            } else {
              res.json({
                success: true,
                message: 'Event successfully added'
              })
            }
          })
        }
      })
    }
}
module.exports = HandlerGenerator;