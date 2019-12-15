var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/userSchema');

module.exports = passport =>{
    passport.serializeUser((user,done)=>{
        console.log('serialize');
        done(null, user.id);
    });

    passport.deserializeUser((id,done)=>{
        User.findById(id, (err,user)=>{
            console.log('deserialize');
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
        function(req,email,password,done){
            process.nextTick(
                ()=>{
                // console.log(email+'1');
                // console.log(password);
                User.findOne({'local.email': email}, (err, user)=>{
                    if(err) return done(err);
                    if (user){
                        return done(null, false);
                    }
                    else{
                        var newUser = new User();
                        newUser.email = email;
                        newUser.password = newUser.generateHash(password);
                        newUser.username = req.body.username;
                        newUser.save(err=>{
                            if(err) throw err;
                            return done(null, newUser);
                        });
                    }
                })
            //
            });
        }
    ));

    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    (req,email,password,done)=>{
        
        process.nextTick(()=>{
            console.log(email);
            console.log(password);
            User.findOne({'email':email},(err,user)=>{
                console.log(user);
                if(err) return done(err);
                if(!user){
                    console.log('passport-Email not found');
                    return done(null,false)
                }
                
                if(!user.validPass(password,user.password)){
                    console.log('passport-InvalidPass');
                    return donde(null, false)
                }
                return done(null,user);
                
            })
        })
    }
    ));
}