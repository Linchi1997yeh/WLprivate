const AppMulters = require('../utils/AppMulters')
var connectdb = require('../models/insertDB/MongObj');
var db = new connectdb("shareApp");
const Event = require('../models/eventSchema')
const {
    response
} = require('../utils')

// profileMulter = AppMulters.profileMulter()
houseMulter = AppMulters.houseMulter()
roomMulter = AppMulters.roomMulter()
eventMulter = AppMulters.eventMulter()

module.exports = (app) => {
    /* move to userOauth.js
    app.post('/user/profile', profileMulter.array('photo'), (req, res) => {
        // TODO
    })
    */

    app.post('/data/houses/', houseMulter.array('photo'), (req, res) => {
        const house = req.body
        if (req.files.lenght > 0) {
            house.photo = req.files[0].path
        }
        db.insert_one("houses", house)
        console.log(house)
        res.json({
            house
        })
    })

    app.post('/data/rooms/', roomMulter.array('photo'), (req, res) => {
        const room = req.body
        if (req.files.lenght > 0) {
            room.photo = req.files[0].path
        }
        db.insert_one("rooms", room)
        console.log(room)
        res.json({
            room
        })
    })

    app.post('/data/events/', eventMulter.array('photo'), (req, res) => {
        const event = Object.assign(new Event(), req.body, {
            host: req.user.email
        })
        if (req.files.lenght > 0) {
            event.photo = req.files[0].path
        }
        event.save()
            .then(() => {
                console.log(event)
                res.json({
                    event
                })
            })
            .catch((error) => {
                console.log(error)
                response(res, false, "Database Error", 500, error)
            })
    })
}
