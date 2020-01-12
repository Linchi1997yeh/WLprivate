var req = require('./MongObj');
var db = new req("shareApp");
const User = require('../userSchema');
var newUser = new User;
var user1 = {
    username: "餅軍",
    email: "test1@gmail.com",
    password: newUser.generateHash("123") ,
    houseName: "半伴西門"
};
var user2 = {
    username: "test2",
    email: "test2@gmail.com",
    password: newUser.generateHash("234"),
    houseName: "半伴敦南"
};
var user3 = {
    username: "test3",
    email: "test3@gmail.com",
    password: newUser.generateHash("345"),
    houseName: "半伴北車"
};
var user4 = {
    username: "test4",
    email: "test4@gmail.com",
    password: newUser.generateHash("456"),
    houseName: "半伴西門"
};
var user5 = {
    username: "test5",
    email: "test5@gmail",
    password: newUser.generateHash("567"),
    houseName: "半伴北車"
};
var user6 = {
    username: "小管家-有緣",
    email: "manager@gmail.com",
    password: newUser.generateHash("123"),
    houseName: "半伴北車",
    position:"manager"
};
var user7 = {
    username: "staff-melo",
    email: "staff@gmail.com",
    password: newUser.generateHash("123"),
    houseName: "半伴北車",
    position:"staff"
};
function user(){
    db.return_dbname();
    db.showURL();
    db.insert_many("users",user1, user2, user3, user4, user5, user6, user7 );
}

module.exports.user = user;