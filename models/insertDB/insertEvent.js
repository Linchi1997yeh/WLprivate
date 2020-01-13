var req = require('./MongObj');
var db = new req("shareApp");

const all = ["半伴西門","半伴敦南","半伴北車","半伴市府","半伴後山埤","半伴東門","半伴民生"];

var obj1 = {
    type: 'event',
    place: '台北市大安區敦化南路一段',
    photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWt0mgTD8sdhR5EsPqkhyklqGH83MtNXOuqqazm52-hRrWed_k3w&s',
    houseToShow: ['半伴西門','半伴敦南','半伴北車'],
    title:'Thanks Giving',
    date: new Date(2019, 10, 15),
    description: 'Dinner Party',
    host: 'host1@gmail.com',
    phoneNumber: 091234567
}
var obj2 = {
    type: 'event',
    place: '台北市大同區太原路79巷',
    photo: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/christmas-quotes-1565117893.jpg?crop=0.671xw:1.00xh;0.204xw,0&resize=640:*',
    houseToShow: ['半伴西門','半伴敦南','半伴北車'],
    title:'Christmas Party',
    date: new Date(2019, 11, 23),
    description: 'Secret Santa',
    host: 'host2@gmail.com',
    phoneNumber: 091102967
}
var obj3 = {
    type: 'event',
    place: '台北市大安區敦化南路一段',
    photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjOv4ABkr5I4FKxRCpsX2ZkNCor36Ct_5mAYJtm6GIsbsADIgvHQ&s',
    houseToShow: all,
    title:'New Year',
    date: new Date(2019, 11, 30),
    description: 'New Year Celebration',
    host: 'host3@gmail.com',
    phoneNumber: 095837567
}
var obj4 = {
    type: 'event',
    place: '台北市松山區民生東路四段97巷',
    photo: 'https://chowpublicmarket.com/wp-content/uploads/2018/06/AdobeStock_83661912-1080x675.jpeg',
    houseToShow: all,
    title:'Cooking Night',
    date: new Date(2019, 10, 08),
    description: 'Learn to Cook with professionals',
    host: 'host4@gmail.com',
    phoneNumber: 0912049267
}
var obj5 = {
    type: 'notification',
    place: '台北市大安區敦化南路一段',
    photo: 'https://cdn5.vectorstock.com/i/1000x1000/82/89/computer-trophy-logo-icon-design-vector-22948289.jpg',
    houseToShow: ['半伴敦南'],
    title:'恭喜',
    date: new Date(2019, 10, 18),
    description: '有緣世界第一',
    host: 'host5@gmail.com',
    phoneNumber: 091947567
}
var obj6 = {
    type: 'notification',
    place: '台北市大同區太原路79巷',
    photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfN6JKHbB_5wnKPePcqp8W3v0ZvESGRVLf7eVfDeNAmgaCLQhrPw&s',
    houseToShow: ['半伴北車'],
    title:'租金未繳',
    date: new Date(2019, 10, 18),
    description: '胡炳軍',
    host: 'host6@gmail.com',
    phoneNumber: 0918654567
}
var obj7 = {
    type: 'notification',
    place: '半伴西門',
    photo: 'https://previews.123rf.com/images/andreypopov/andreypopov1510/andreypopov151000071/45703699-happy-male-janitor-with-cleaning-equipments-mopping-floor.jpg',
    houseToShow: ['半伴西門'],
    title:'清洗廁所',
    date: new Date(2019, 11, 18),
    description: '負責人：Alfred Lo',
    host: 'host7@gmail.com',
    phoneNumber: 091232667
}
var obj8 = {
    type: 'event',
    place: '台北市大安區敦化南路一段',
    photo: 'https://image.cache.storm.mg/styles/smg-800x533-fp/s3/media/image/2018/02/12/20180212-051624_U3792_M380875_7898.jpg?itok=kY-LvDAt',
    houseToShow: ['半伴西門','半伴敦南','半伴北車'],
    title:'年夜飯',
    date: new Date(2020, 1, 24),
    description: '沒回家的一起吃吧',
    host: 'host1@gmail.com',
    phoneNumber: 091234567
}
var obj9 = {
    type: 'event',
    place: '半伴民生',
    photo: 'https://m.bldaily.com/wp-content/uploads/2017/12/untitled-1-293-590x333.jpg',
    houseToShow: ['半伴西門','半伴敦南','半伴北車'],
    title:'冬至湯圓會',
    date: new Date(2019, 12, 21),
    description: '冬至吃湯圓 肥肥好過年',
    host: 'host1@gmail.com',
    phoneNumber: 091234567
}
var obj10 = {
    type: 'event',
    place: '台北市大安區敦化南路一段',
    photo: 'https://www.thespruce.com/thmb/fjqQ4xiiH-qifsgYq2mGl1PIl8s=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Mansweepingrestaurant-GettyImages-841234272-efe99f4465384a6c808f22c2e431b2c6.jpg',
    houseToShow: ['半伴西門','半伴敦南','半伴北車'],
    title:'掃客廳',
    date: new Date(2019, 10, 15),
    description: '負責人：Cookie Hu',
    host: 'host1@gmail.com',
    phoneNumber: 091234567
}



function event(){
    db.return_dbname();
    db.showURL();
    db.insert_many("events", obj1, obj2, obj3, obj4, obj5, obj6, obj7,obj8 , obj9, obj10)
}

module.exports.event = event;