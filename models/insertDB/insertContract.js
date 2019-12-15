var req = require('./MongObj');
var db = new req("shareApp");

var contract1 = {
    email: "test1@gmail.com",
    roomId: "", //to be filled
    roomName: "男生四人房A",
    startDate: new Date(2018, 2, 1),
    endDate: new Date(2019, 3, 31),
    duration: 14
};
var contract2 = {
    email: "test2@gmail.com",
    roomId: "", //to be filled
    roomName: "女生雙人房A",
    startDate: new Date(2018, 11, 31),
    endDate: new Date(2019, 11, 31),
    duration: 12
};
var contract3 = {
    email: "test3@gmail.com",
    roomId: "", //to be filled
    roomName: "男生四人房A",
    startDate: new Date(2019, 1, 31),
    endDate: new Date(2019, 3, 31),
    duration: 2
};


function contract(){
    db.return_dbname();
    db.showURL();
    db.insert_many("contracts",contract1, contract2, contract3 );
}

module.exports.contract = contract;