let Jsonwt = require('jsonwebtoken')
let config = require('../config/config');
let User = require('../models/userSchema');
let Room = require('../models/roomSchema');
let Event = require('../models/eventSchema')
class HandlerGenerator {
    async addEvent(req,res){
      console.log('Event-ADD');
      console.log(req.body);
      let eventName = req.body.eventName;
      let email = req.body.email;
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
          console.log("email error")
          res.json({
            success: false,
            message: 'Database Error',
            error: err
          });
        }
        if (!user){
          console.log("user not exist")
          res.json({
            success: false,
            message: 'user not registered'
          });
        }
         else {
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
              console.log("Event error");
              console.log(err);
              res.json({
                success: false,
                message: 'Event not added',
                error: err
              })
            } else {
              console.log("Event successfully added")
              res.json({
                success: true,
                message: 'Event successfully added'
              })
            }
          })
        }
      })
    }
    // delete Event
    async delEvent(req,res){
      let title = req.body.title;
      console.log('delEvent request');
      console.log(req.body);
      await Event.deleteOne({'title':title},(err,obj)=>{
        if(err) {
          console.log(err);
          res.json({
            success: false,
            message: 'Event not deleted',
            error: err
          })
        }
        else{
          console.log('Event deleted');
          console.log(obj);
          res.json({
            success: true,
            message: 'Event deleted',
          })
        }
      })
    }
    //add room
    async addRoom(req,res){
      console.log(req.body);
      let data = req.body;
      console.log("New Data : *****")
      console.log(data);
      // set default phone number
      if (!data.eventPhone){
        data.eventPhone = 912345678;
      }
      await Event.findOne({'houseName':data.houseName, 'roomName':data.roomName},(err, room)=>{
        if (err){
          console.log(err)
          res.json({
            success: false,
            message: 'Database Error',
            error: err
          });
        }
        if (!room){
          res.json({
            success: false,
            message: 'User not registered'
          });
        } else {
          var newRoom = new Room();
          Object.keys(data).map((key,index)=>{
            newRoom[key] = data[key];
          })
          console.log("New Room : *****")
          console.log(newRoom.houseName);
          // newEvent.type = 'event';
          // newEvent.place = eventAddress,
          // newEvent.houseToShow = ['半伴西門','半伴敦南','半伴北車'];
          // newEvent.title = eventName;
          // newEvent.date = eventDate;
          // newEvent.description = eventDescription;
          // newEvent.photo = eventImage;
          // newEvent.host = user.username;
          // newEvent.phoneNumber = eventPhone;
          newRoom.save(err=>{
            if(err){
              console.log("Room not added")
              console.log(err);
              res.json({
                success: false,
                message: 'Room not added',
                error: err
              })
            } else {
              console.log("Room successfully added")
              res.json({
                success: true,
                message: 'Room successfully added'
              })

            }
          })
        }
      })
    }
}
module.exports = HandlerGenerator;