let Jsonwt = require("jsonwebtoken");
let config = require("../config/config");
let User = require("../models/userSchema");
let Event = require("../models/eventSchema");
let Contract = require("../models/contractSchema");
let Problem = require("../models/problemReportSchema");
const { filterEntity, response } = require('../utils')
const fs = require("fs");

const userExcludeKeys = ['__v', 'password', 'date']

class HandlerGenerator {
  //Register
  async register(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    let password2 = req.body.password2;
    let username = req.body.username;
    let houseName = req.body.houseName;
    if (!houseName) {
      houseName = "No House yet";
    }
    if (password !== password2) {
      res.status(401)
      res.json({
        success: false,
        message: "Password does not match"
      });
    }
    await User.findOne({
        email: email
      },
      (err, user) => {
        if (err) {
          res.status(500)
          res.json({
            success: false,
            message: "Database Error",
            error: err
          });
        }
        if (user) {
          res.json({
            success: false,
            message: "email already exist"
          });
        } else {
          var newUser = new User();
          console.log(req.files)
          if (req.files.length > 0) {
            newUser.photo = req.files[0].path
          }
          newUser.email = email;
          newUser.password = newUser.generateHash(password);
          newUser.username = username;
          newUser.houseName = houseName;
          newUser.save(err => {
            if (err) {
              res.json({
                success: false,
                message: "Database Error",
                error: err
              });
            }
            res.json({
              success: true,
              message: "Register Success"
            });
          });
        }
      }
    );
  }
  //Login
  async login(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    // For the given username fetch user from DB
    await User.findOne({
        email: email
      },
      (err, user) => {
        if (err) {
          res.status(500)
          res.json({
            success: false,
            message: "Database Error"
          });
          return
        }
        if (!user) {
          response(res, false, "Incorrect username or password", 401)
          return
        }
        if (user.validPass(password, user.password)) {
          let position = user.position;
          let token = Jsonwt.sign({
              email: email
            },
            config.secret, {
              expiresIn: "24h"
            }
          );
          res.setHeader("auth-Token", token);
          res.json({
            success: true,
            message: "Authentication successful!",
            token: token,
            position: position
          });
          return
        } else {
          response(res, false, "Incorrect username or password", 401)
          return
        }
      }
    );
  }

  //request access index page
  index(req, res) {
    res.json({
      success: true,
      message: "Index page"
    });
  }
  //further functions implementations
  // userProfile (req,res) {

  // }

  getUserProfile(req, res) {
    res.json(filterEntity(req.user, userExcludeKeys));
  }

  async updateUserProfile(req, res) {
    const body = req.body;
    const user = req.user
    const newUser = Object.assign(new User(), req.user, req.body)

    if (body.password) {
      newUser.password = newUser.generateHash(body.password)
    }
    if (req.files.length != 0) {
      if (user.photo != null) {
        fs.unlink(user.photo, (err) => {
          console.log(err)
        });
      }
      newUser.photo = req.files[0].path
    }
    console.log(newUser)

    await User.replaceOne({
      _id: user._id
    }, newUser).then( async (result) => {
      console.log(result)
      if(body.email) {
        await Event.updateMany({email: user.email}, {email: body.email})
        await Contract.updateMany({email: user.email}, {email: body.email})
        await Problem.updateMany({email: user.email}, {email: body.email})
      }
      let token = Jsonwt.sign({
        email: newUser.email
      },
        config.secret, {
          expiresIn: "24h"
        }
      );
      res.json({
        success: true,
        message: "Update user profile successful",
        token: token,
      })
    }).catch(error => {
      console.log(error)
      response(res, false, "Database Error", 500, error)
    });
  }

  getUsers(req, res) {
    const query = req.query
    console.log(query)
    User.find(query)
      .then(data => {
        console.log(data)
        res.json(filterEntity(data, userExcludeKeys))
      })
      .catch(err => response(res, false, 'Database Error', 500, err))
  }
}

module.exports = HandlerGenerator;

function createToken(key, value, date) {
  let expiration = new Date(date).toUTCString();
  let cookie =
    encodeURI(key) + "=" + encodeURI(value) + ";expires=" + expiration + ";";
  console.log(cookie);
  document.cookie = cookie;
}
