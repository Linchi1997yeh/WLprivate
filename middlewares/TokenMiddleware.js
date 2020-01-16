const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/userSchema');

// parse token to user, skip if no token
module.exports = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (!token) {
    next()
    return
  }

  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  // decode token with secret 
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err){ // skip error
      next()
      return
    }

    req.decoded = decoded; // save token into req.decoded
    console.log(decoded);
    // save user to req.user
    User.findOne({
      'email': decoded.email
    }, (err, user) => {
      if (err) {
        console.log(error)
        res.json({
          success: false,
          message: 'Database Error',
          error: err
        });
        return
      }

      req.user = (user) ? user._doc : user
      next()
    })
  })
};
