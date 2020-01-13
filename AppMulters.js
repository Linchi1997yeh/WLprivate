const multer = require('multer')
const fs = require('fs')

const IMG_DIR = `./img`
const PROFILE_IMG_DIR = `${IMG_DIR}/profile/`
const HOUSE_IMG_DIR = `${IMG_DIR}/house/`
const ROOM_IMG_DIR = `${IMG_DIR}/room/`
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

module.exports = class AppMulters {
  static profileMulter() {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, PROFILE_IMG_DIR);
      },
      filename: (req, file, cb) => {
        const name = file.originalname
        const ext = name.substring(name.lastIndexOf('.'), name.length)
        cb(null, `profile-${Date.now()}${ext}`);
      }
    })
    return multer({
      storage: storage
    })
  }

  static houseMulter() {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, HOUSE_IMG_DIR);
      },
      filename: (req, file, cb) => {
        const ext = name.substring(name.lastIndexOf('.'), name.length)
        cb(null, `house-${Date.now()}${ext}`);
      }
    })
    return multer({
      storage: storage
    })
  }

  static roomMulter() {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, ROOM_IMG_DIR);
      },
      filename: (req, file, cb) => {
        const ext = name.substring(name.lastIndexOf('.'), name.length)
        cb(null, `room-${Date.now()}${ext}`);
      }
    })
    return multer({
      storage: storage
    })
  }
}
