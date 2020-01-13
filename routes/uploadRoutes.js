const AppMulters = require('../AppMulters')
var connectdb = require('../models/insertDB/MongObj');
var db = new connectdb("shareApp");

profileMulter = AppMulters.profileMulter()
houseMulter = AppMulters.houseMulter()
roomMulter = AppMulters.roomMulter()

module.exports = (app) => {
    /*
    app.post('/user/profile', profileMulter.array('photo'), (req, res) => {
        // TODO
    })
    */

    app.post('/data/houses/', profileMulter.array('photo'), (req, res) => {
        const house = req.body
        house.photo = req.files[0].path
        db.insert_one("houses", house)
        res.json({
            house
        })
    })

    app.post('/data/rooms/', profileMulter.array('photo'), (req, res) => {
        const room = req.body
        room = req.files.map(file => file.path)
        db.insert_one("rooms", room)
        res.json({
            room
        })
    })

    app.post('/data/events/', profileMulter.array('photo'), (req, res) => {
        const event = req.event
        event.photo = req.event[0].path
        db.insert_one("events", event)
        res.json({
            room
        })
    })
}
