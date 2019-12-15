const room = require('./insertRoom');
const house = require('./insertHouse');
const contract = require('./insertContract');
const event = require('./insertEvent');
const user = require('./insertUser');
// insert all data into MongoDB
room.room();
house.house();
contract.contract();
event.event();
user.user();