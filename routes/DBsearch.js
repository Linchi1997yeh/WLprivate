var Event = require('../models/eventSchema');
var Contract =  require('../models/contractSchema');
var House = require('../models/houseSchema');
var Room = require('../models/roomSchema');
var User = require('../models/userSchema');

async function reqGetAll(type){
    var obj;
    var result;
    console.log(type);
    if (type=='event'){
        console.log('inside event');
        // console.log(Event);
        obj = Event;
        console.log(obj);
    }else if (type=='contract'){
        obj = Contract
    }else if (type=='house'){
        obj = House;
    }else if (type=='room'){
        obj = Room;
    }else if (type=='user'){
        obj = User;
    }
    await obj.find({}, async(err,docs)=>{
        if (err) throw err;
        console.log(docs);
        result = docs;
        // console.log(typeof docs);
        
    })
    return result;
}

module.exports.reqGetAll = reqGetAll;