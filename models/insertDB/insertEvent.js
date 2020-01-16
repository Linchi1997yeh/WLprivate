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
    host: 'linchi@gmail.com',
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
    host: 'winner@gmail.com',
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
    host: 'alfred@gmail.com',
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
    host: 'manager@gmail.com',
    phoneNumber: 0912049267
}
var obj5 = {
    type: 'notification',
    place: '台北市大安區敦化南路一段',
    photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdWnLe1C947eq-jwayQG5ORyVIatnIQ52LRi1BMpCbbsZm1HA&s',
    houseToShow: ['半伴敦南'],
    title:'恭喜有源小管家',
    date: new Date(2019, 10, 18),
    description: '恭喜有源獲得AI競賽世界第一',
    host: 'manager@gmail.com',
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
    host: 'staff@gmail.com',
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
    host: 'manager@gmail.com',
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
    host: 'staff@gmail.com',
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
    host: 'cookie@gmail.com',
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
    host: 'manager@gmail.com',
    phoneNumber: 091234567
}
var obj11 = {
    type: 'event',
    place: '台北市大安區敦化南路一段',
    photo: 'https://techcrunch.com/wp-content/uploads/2019/11/GettyImages-1183267196.jpg?w=730&crop=1',
    houseToShow: ['半伴西門','半伴敦南','半伴北車'],
    title:'Fifa Night',
    date: new Date(2019, 12, 15),
    description: '輸的請大家喝飲料',
    host: 'alfred@gmail.com',
    phoneNumber: 091234567
}
var obj12 = {
    type: 'event',
    place: '國立成功大學 C-Hub',
    photo: 'http://news.secr.ncku.edu.tw/var/file/37/1037/pictures/80/m/mczh-tw400x400_large64636_639891366892.jpg',
    houseToShow: ['半伴西門','半伴敦南','半伴北車'],
    title:'CodingX發表會',
    date: new Date(2020, 1, 17),
    description: 'WeLiving會介紹半伴管理系統 快去捧場',
    host: 'ta@gmail.com',
    phoneNumber: 091234567
}
var obj13 = {
    type: 'event',
    place: '台北市大安區敦化南路一段',
    photo: 'https://iheartintelligence.com/wp-content/uploads/2019/06/law-philippines-students-plant-trees-graduating.jpg',
    houseToShow: ['半伴西門','半伴敦南','半伴北車'],
    title:'種樹救地球',
    date: new Date(2019, 12, 31),
    description: '年底將希望種下去',
    host: 'linchi@gmail.com',
    phoneNumber: 091234567
}
var obj14 = {
    type: 'event',
    place: '台北市凱達格蘭大道',
    photo: 'https://cdn.vox-cdn.com/thumbor/QPIC5z_Ho5YCRLIr_cARdf8n5eY=/0x0:5016x3344/1200x800/filters:focal(1841x548:2643x1350)/cdn.vox-cdn.com/uploads/chorus_image/image/65261936/GettyImages_1167860285.0.jpg',
    houseToShow: ['半伴西門','半伴敦南','半伴北車'],
    title:'Friday For Future',
    date: new Date(2020, 1, 10),
    description: 'Come join Greta for the climate strike',
    host: 'staff@gmail.com',
    phoneNumber: 091234567
}
var obj15 = {
    type: 'event',
    place: '台北市大同區太原路79巷',
    photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4pUNMfCjGo1BD74sMZ3YkQgnTeRVelRJhJjjIOtfEiX2pPcCo&s',
    houseToShow: ['半伴西門','半伴敦南','半伴北車'],
    title:'年底大掃除',
    date: new Date(2020, 1, 7),
    description: '大家都來掃掃掃',
    host: 'twilight@gmail.com',
    phoneNumber: 091234567
}


function event(){
    db.return_dbname();
    db.showURL();
    db.insert_many("events", obj1, obj2, obj3, obj4, obj5, obj6, obj7,obj8 , obj9, obj10, obj11, obj12, obj13, obj14, obj15)
}

module.exports.event = event;