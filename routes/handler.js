
let Jsonwt = require('jsonwebtoken')
let config = require('../config/config');
let User = require('../models/userSchema');
class HandlerGenerator {
    async login (req, res) {
      let email = req.body.email;
      let password = req.body.password;
      // For the given username fetch user from DB
      await User.findOne({'email':email},(err,user)=>{
          console.log(user.email);
          if (err) {
            res.json({
                success: false,
                message: 'Database Error'
            });
          }
          if (!user){
            res.json({
                success: false,
                message: 'Incorrect username or password'
            });
          }
          if (user.validPass(password,user.password)){

            let token = Jsonwt.sign({username: email},
              config.secret,
              {expiresIn:'24h'}
              );
            res.json({
              success: true,
              message: 'Authentication successful!',
              token:token
            })
          } else {
            res.json({
              success: false,
              message: 'Incorrect username or password'
            });
          }
            
      })
    }
    //request access index page
    index (req, res) {
      res.json({
        success: true,
        message: 'Index page'
      });
    }
    //further functions implementations
    // userProfile (req,res) {
      
    // }
    

}
module.exports = HandlerGenerator;