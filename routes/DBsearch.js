const Event = require('../models/eventSchema');
const Contract = require('../models/contractSchema');
const House = require('../models/houseSchema');
const Room = require('../models/roomSchema');
const User = require('../models/userSchema');
const {
    uniqueArray,
    mapArrayToObjects,
    userExcludeKeys,
    filterEntity,
} = require('../utils')

const EventRelationMap = {
    host: {
        type: User,
        field: 'email',
        name: 'user',
        filter: userExcludeKeys,
    },
}

const ContractRelationMap = {
    email: {
        type: User,
        field: 'email',
        name: 'user',
        filter: userExcludeKeys,
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
        type,
        conditions,
        relations
    })
    let obj;
    let map
    if (type == 'event') {
        obj = Event;
        map = EventRelationMap
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

    for (const key of Object.keys(conditions)) {
        if (Array.isArray(conditions[key])) {
            conditions[key] = {
                $in: conditions[key]
            }
        }
    }

    return await obj.find(conditions)
        .then(obj => loadRelations(obj, relations, map))
}

async function loadRelations(entities, relations, relationMap) {
    if (!relations || entities.length == 0) return entities
    entities = entities.map(e => e._doc || e)

    for (const r of relations) {
        if (!relationMap[r]) continue

        const {
            type,
            field,
            name,
            filter
        } = relationMap[r]
        const keywords = uniqueArray(entities, r)
        if (keywords.length == 0) continue

        const relationObjs = await type.find({
            [field]: {
                $in: keywords
            }
        }).then(result => filterEntity(result, filter || []))
        mapArrayToObjects(relationObjs, field, entities, r, name);
        // console.log(entities)
    }
    return entities
}

module.exports.reqGetAll = reqGetAll;
