const AppMulters = require('../AppMulters')
var connectdb = require('../models/insertDB/MongObj');
var db = new connectdb("shareApp");

profileMulter = AppMulters.profileMulter()
houseMulter = AppMulters.houseMulter()
roomMulter = AppMulters.roomMulter()
eventMulter = AppMulters.eventMulter()

module.exports = (app) => {
    /*
    app.post('/user/profile', profileMulter.array('photo'), (req, res) => {
        // TODO
    })
    */

    app.post('/data/houses/', houseMulter.array('photo'), (req, res) => {
        const house = req.body
        house.photo = req.files[0].path
        db.insert_one("houses", house)
        console.log(house)
        res.json({
            house
        })
    })

    app.post('/data/rooms/', roomMulter.array('photo'), (req, res) => {
        const room = req.body
        room.photo = req.files.map(file => file.path)
        db.insert_one("rooms", room)
        console.log(room)
        res.json({
            room
        })
    })

    app.post('/data/events/', eventMulter.array('photo'), (req, res) => {
        const event = req.event
        event.photo = req.event[0].path
        db.insert_one("events", event)
        console.log(event)
        res.json({
            event
        })
    })
}
