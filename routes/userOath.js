module.exports = app => {
  const Handler = require("../handlers/userHandlers");
  let handlers = new Handler();
  let middleware = require("../middleware");
  const profileMulter = require("../utils/AppMulters").profileMulter();
  const authMiddleware = require("../middlewares/AuthMiddleware");
  // let jwt = require('jsonwebtoken');
  // let config = require('../config/config');
  // let middleware = require('../middleware');
  // let User = require('../models/userSchema');

  // register
  app.post("/user/register", profileMulter.array('photo'), handlers.register);

  // user login
  app.post("/user/login", handlers.login);
  app.get("/index", middleware.checkToken, handlers.index);

  app.get("/user/profile", authMiddleware(), handlers.getUserProfile);
  app.get("/users", handlers.getUsers);
  app.patch("/user/profile", authMiddleware(), profileMulter.array('photo'), handlers.updateUserProfile);
};
