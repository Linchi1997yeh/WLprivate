var req = require('./MongObj');
var db = new req("shareApp");
const User = require('../userSchema');
var newUser = new User;
var user1 = {
    username: "餅軍",
    email: "cookie@gmail.com",
    password: newUser.generateHash("123") ,
    houseName: "半伴西門",
    position:""
};
var user2 = {
    username: "Alfred Loh",
    email: "alfred@gmail.com",
    password: newUser.generateHash("123"),
    houseName: "半伴敦南",
    position:""
};
var user3 = {
    username: "蘇裕勝",
    email: "winner@gmail.com",
    password: newUser.generateHash("123"),
    houseName: "半伴敦南",
    position:"manager"
};
var user4 = {
    username: "賴鈺臻",
    email: "twilight@gmail.com",
    password: newUser.generateHash("123"),
    houseName: "半伴西門",
    position:""
};
var user5 = {
    username: "Linchi Yeh",
    email: "linchi@gmail.com",
    password: newUser.generateHash("123"),
    houseName: "半伴大同",
    position:""
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
    houseName: "半伴",
    position:"staff"
};
var user8 = {
    username: "奕毛",
    email: "ta@gmail.com",
    password: newUser.generateHash("123"),
    houseName: "半伴成大",
    position:""
};
function user(){
    db.return_dbname();
    db.showURL();
    db.insert_many("users",user1, user2, user3, user4, user5, user6, user7, user8 );
}

module.exports.user = user;