const Event = require('../models/eventSchema');
const Contract = require('../models/contractSchema');
const House = require('../models/houseSchema');
const Room = require('../models/roomSchema');
const User = require('../models/userSchema');
const {
    uniqueArray,
    mapArrayToObjects,
} = require('../utils')

const EventRelationMap = {
    host: {
        type: User,
        field: 'email',
        name: 'user',
    },
}

const ContractRelationMap = {
    email: {
        type: User,
        field: 'email',
        name: 'user',
    },
    roomName: {
        type: Room,
        field: 'roomName',
        name: 'room',
    },
}

const HouseRelationMap = {}

const RoomRelationMap = {
    houseName: {
        type: House,
        field: 'HouseName',
        name: 'house',
    },
}

const UserRelationMap = {
    houseName: {
        type: House,
        field: 'HouseName',
        name: 'house',
    },
}

async function reqGetAll(type, conditions, relations) {
    console.log({
        conditions,
        relations
    })
    let obj;
    let map
    console.log(type);
    if (type == 'event') {
        obj = Event;

    } else if (type == 'contract') {
        obj = Contract;
        map = ContractRelationMap
    } else if (type == 'house') {
        obj = House;
        map = HouseRelationMap
    } else if (type == 'room') {
        obj = Room;
        map = RoomRelationMap;
    } else if (type == 'user') {
        obj = User;
        map = UserRelationMap;
    }
    return await obj.find(conditions)
        .then(obj => loadRelations(obj, relations, map))
}

async function loadRelations(entities, relations, relationMap) {
    if (!relations) return entities
    entities = entities.map(e => e._doc || e)

    for (const r of relations) {
        if (!relationMap[r]) continue

        const {
            type,
            field,
            name
        } = relationMap[r]
        const findCondition = uniqueArray(entities, r)
        const relationObjs = await type.find({
            [field]: findCondition
        }).then(result => result.map(e => e._doc || e))
        mapArrayToObjects(relationObjs, field, entities, r, name);
        console.log(entities)

        /*
        await type.findOne({
            [field]: entity[r]
        })
            .then(obj => {
                entity[name] = obj
                console.log(entity[name])
            })
            .catch(err => console.log(err))
            */
    }
    return entities
}

module.exports.reqGetAll = reqGetAll;
