let Jsonwt = require('jsonwebtoken')
let config = require('../config/config');
let User = require('../models/userSchema');
class HandlerGenerator {
    //Register  
    async register(req,res){
      let email = req.body.email;
      let password = req.body.password;
      let password2 = req.body.password2;
      let username = req.body.username;
      let houseName = req.body.houseName;
      if(!houseName){
        houseName = 'No House yet'
      }
      if (password!==password2){
        res.json({
          success:false,
          message:'Password does not match'
        });
      }
      await User.findOne({'email':email},(err,user)=>{
        if (err){
          res.json({
            success: false,
            message: 'Database Error',
            error: err
          });
        }
        if (user){
          res.json({
            success: false,
            message: 'email already exist'
          });
        }
        else{
          var newUser = new User();
          newUser.email = email;
          newUser.password = newUser.generateHash(password);
          newUser.username = username;
          newUser.houseName = houseName;
          newUser.save(err=>{
              if(err) {
                res.json({
                  success: false,
                  message: 'Database Error',
                  error: err
                });
              }
              res.json({
                success: true,
                message: 'Register Success'
              });
          });
        }
      })
    }
    //Login
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

            let token = Jsonwt.sign({email: email},
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