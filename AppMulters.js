const multer = require('multer')
const fs = require('fs')

const IMG_DIR = `./img`
const PROFILE_IMG_DIR = `${IMG_DIR}/profile/`
const HOUSE_IMG_DIR = `${IMG_DIR}/house/`
const ROOM_IMG_DIR = `${IMG_DIR}/room/`
const EVENT_IMG_DIR = `${IMG_DIR}/event/`
const createFolder = function(folder) {
  try {
    fs.accessSync(folder);
  } catch (e) {
    fs.mkdirSync(folder);
  }
};

createFolder(IMG_DIR)
createFolder(PROFILE_IMG_DIR)
createFolder(HOUSE_IMG_DIR)
createFolder(ROOM_IMG_DIR)
createFolder(EVENT_IMG_DIR)

module.exports = class AppMulters {
  static getStorageSetting(dir, field) {
    return multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, dir);
      },
      filename: (req, file, cb) => {
        const name = file.originalname
        const ext = name.substring(name.lastIndexOf('.'), name.length)
        cb(null, `${field}-${Date.now()}${ext}`);
      }
    })
  }

  static profileMulter() {
    return multer({
      storage: AppMulters.getStorageSetting(PROFILE_IMG_DIR, 'profile')
    })
  }

  static houseMulter() {
    return multer({
      storage: AppMulters.getStorageSetting(HOUSE_IMG_DIR, 'house')
    })
  }

  static roomMulter() {
    return multer({
      storage: AppMulters.getStorageSetting(ROOM_IMG_DIR, 'room')
    })
  }

  static eventMulter() {
    return multer({
      storage: AppMulters.getStorageSetting(EVENT_IMG_DIR, 'event')
    })
  }
}
