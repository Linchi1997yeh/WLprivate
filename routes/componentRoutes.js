const dbsearch = require('./DBsearch');
const authMiddleware = require("../middlewares/AuthMiddleware");

module.exports = (app) => {
    const Handler = require('../handlers/componentHandlers');
    let handlers = new Handler();
    let middleware = require('../middleware');

    var Event = require('../models/eventSchema');
    var Contract = require('../models/contractSchema');
    var House = require('../models/houseSchema');
    var Room = require('../models/roomSchema');

    // get all the events
    app.get('/data/events', async (req, res, next) => {
        const {
            relations,
            ...conditions
        } = req.query
        let docs = await dbsearch.reqGetAll('event', conditions, relations);
        console.log('request all events')
        if(!conditions.date) {
            const now = new Date()
            docs = docs.filter(event => event.date >= now)
        }
        // console.log(docs);
        res.json(docs);
    })

    // get all users
    app.get('/data/users', async (req, res, next) => {
        const {
            relations,
            ...conditions
        } = req.query
        const docs = await dbsearch.reqGetAll('user', conditions, relations);
        console.log('request all users')
        // console.log(docs);
        res.json(docs);
    })

    // get all contracts
    app.get('/data/contracts', async (req, res, next) => {
        const {
            relations,
            ...conditions
        } = req.query
        const docs = await dbsearch.reqGetAll('contract', conditions, relations);
        console.log('request all contracts')
        // console.log(docs);
        res.json(docs);
    })

    // get all houses
    app.get('/data/houses', async (req, res, next) => {
        const {
            relations,
            ...conditions
        } = req.query
        const docs = await dbsearch.reqGetAll('house', conditions, relations);
        console.log('request all houses')
        // console.log(docs);
        res.json(docs);
    })

    // get all rooms
    app.get('/data/rooms', async (req, res, next) => {
        const {
            relations,
            ...conditions
        } = req.query
        const docs = await dbsearch.reqGetAll('room', conditions, relations);
        console.log('hello')
        // console.log(docs);
        res.send(docs);
    })

    // get all proble
    app.get('/data/proble', async (req, res, next) => {
        const {
            relations,
            ...conditions
        } = req.query
        const docs = await dbsearch.reqGetAll('proble', conditions, relations);
        console.log('get all proble')
        // console.log(docs);
        res.send(docs);
    })

    app.post('/data/queryContract', async (req, res, next) => {
        console.log(req.body.email);
        await Contract.findOne({
            'email': req.body.email
        }, (err, user) => {
            if (!user) {
                console.log('user has not signed a contract yet');
                var package = {
                    email: req.body.email,
                    error: 'user has not signed a contract yet'
                }
                res.send(package);
            } else {
                console.log(user);
                res.send(user);
            }

        })
    })
    // add events
    app.post('/event/add', authMiddleware(), handlers.addEvent);
    app.delete('/event/delete', handlers.delEvent)
    //add room
    app.post('/room/add', handlers.addRoom);
    app.delete('/room/delete', handlers.delRoom);
    app.post('/proble/add', authMiddleware(),handlers.addProblem);
    //add delete room
    // delete events
    // app.post('/event/delete',handlers.delEvent);
}
