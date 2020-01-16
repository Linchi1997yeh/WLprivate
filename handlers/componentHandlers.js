let Jsonwt = require('jsonwebtoken')
let config = require('../config/config');
let User = require('../models/userSchema');
let Room = require('../models/roomSchema');
let Event = require('../models/eventSchema');
let Problem = require('../models/problemReportSchema');
class HandlerGenerator {
    async addEvent(req,res){
      console.log('addEvent request');
      // console.log(req.body);
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
      // console.log(req.body);
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
      let data = req.body;
      console.log('addRoom request');
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
    //delete room
    async delRoom(req,res){
      let houseName = req.body.houseName;
      let roomName = req.body.roomName;
      console.log('delRoom request');
      console.log(req.body);
      await Room.deleteOne({'houseName':houseName,'roomName':roomName},(err,obj)=>{
        if(err) {
          console.log(err);
          res.json({
            success: false,
            message: 'Room not deleted',
            error: err
          })
        }
        else{
          console.log('Room deleted');
          console.log(obj);
          res.json({
            success: true,
            message: 'Room deleted',
          })
        }
      })
    }
    async addProblem(req,res){
      let data = req.body;
      // set default phone number
      if (!data.eventPhone){
        data.eventPhone = 912345678;
      }
      var newProblem = new Problem();
          Object.keys(data).map((key,index)=>{
            newProblem[key] = data[key];
          })
      newProblem.save(err=>{
          if(err){
            console.log("Problem not added")
            console.log(err);
            res.json({
              success: false,
              message: 'Problem not added',
              error: err
            })
          } else {
            console.log("Problem successfully added")
            res.json({
              success: true,
              message: 'Problem successfully added'
            })

          }
        })
    }
}
module.exports = HandlerGenerator;