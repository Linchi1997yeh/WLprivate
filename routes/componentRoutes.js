const dbsearch = require('./DBsearch');
module.exports= (app)=>{
    const Handler = require('../handlers/componentHandlers');
    let handlers =new Handler();
    let middleware = require('../middleware');

    var Event = require('../models/eventSchema');
    var Contract =  require('../models/contractSchema');
    var House = require('../models/houseSchema');
    var Room = require('../models/roomSchema');
    // get all the events
    app.get('/data/events',async (req,res,next)=>{
        const docs = await dbsearch.reqGetAll('event');
        console.log('request all events')
        // console.log(docs);
        res.send(docs);
    })
    // get all users
    app.get('/data/users',async (req,res,next)=>{
        const docs = await dbsearch.reqGetAll('user');
        console.log('request all users')
        // console.log(docs);
        res.send(docs);
    })
    // get all contracts
    app.get('/data/contracts',async (req,res,next)=>{
        const docs = await dbsearch.reqGetAll('contract');
        console.log('request all contracts')
        // console.log(docs);
        res.send(docs);
    })
    // get all houses
    app.get('/data/houses',async (req,res,next)=>{
        const docs = await dbsearch.reqGetAll('house');
        console.log('request all houses')
        // console.log(docs);
        res.send(docs);
    })
     // get all rooms
     app.get('/data/rooms',async(req,res,next)=>{
        const docs = await dbsearch.reqGetAll('room');
        console.log('hello')
        // console.log(docs);
        res.send(docs);
    })
    app.post('/data/queryContract', async (req,res,next)=>{
        console.log(req.body.email);
        await Contract.findOne({'email': req.body.email},(err,user)=>{
            if(!user){
                console.log('user has not signed a contract yet');
                var package = {
                    email:req.body.email,
                    error:'user has not signed a contract yet'
                }
                res.send(package);
            }else{
                console.log(user);
                res.send(user);
            }
            
        })
    })
    // add events
    app.post('/event/add',handlers.addEvent);
    app.delete('/event/delete',handlers.delEvent)
    //add room
    app.post('/room/add',handlers.addRoom);
    //add delete room
    // delete events
    // app.post('/event/delete',handlers.delEvent);
}