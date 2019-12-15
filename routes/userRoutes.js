//User route
module.exports = (app,passport)=>{
    var User = require('../models/userSchema');
    
    app.post('/member/register',(req,res,next)=>{
        // console.log('register');
        passport.authenticate('local-signup',(err,user,info)=>{
            // console.log('in passauth')
            if (err) return next(err);
            if (!user){
                // registration failed user already taken
                // console.log('user taken or invalid password');
                res.send('User already taken');
            }else{
                //registration complete
                res.send('register Success');
            }
        })(req, res, next);
    });
    //return all members in users schema
    app.get('/member/all',(req,res,next)=>{
        User.find({},(err,docs)=>{
            if (err) throw err;
            console.log('request all')
            res.send(docs);
        });
    });
    // single user profile data
    app.post('/member/profile',(req,res,next)=>{
        User.findOne({'email':req.body.email},(err,user)=>{
            if (err) throw err;
            if(!user) {
                console.log('No User Found');
            }
            console.log(user);
            res.send(user);
        })
    })
    
    app.get('/test',(req,res,next)=>{
        console.log(req.body.email);
        console.log(req.body.password);
        res.send("success")
    })

    app.post('/member/login',(req,res,next)=>{
        console.log('at login auth');
        passport.authenticate('local-login',(err,user,info)=>{
            console.log('in login-auth')
            if (err) return next(err);
            if (!user){
                // login failed
                var package = {
                    valid : false,
                    email:req.body.email,
                    password: req.body.password,
                    error:'email not found or invalid password'
                    // 'msg':'login-success',
                    // 'redirect': '/profile'
                }
                res.send(package);
                console.log('user not found or invalid password');
                // res.send('user not found or invalid password');
            }else{
                //login success
                console.log('login Success');
                var package = {
                    valid : true,
                    email:req.body.email,
                    password: req.body.password
                    // 'msg':'login-success',
                    // 'redirect': '/profile'
                }
                res.send(package);
            }
        })(req, res, next);
    })

    //for later redirect to when logged in check with middleware isLoggedIn
    app.get('/member/check',isLoggedIn,(req,res)=>{
        var package = {
            'valid': true,
            'msg':'login-success',
            'redirect': '/profile'
        };
        res.send(package);
    })
}
    function isLoggedIn(req,res,next){
        console.log('************afterthis')
        console.log(req.user);
        if(req.isAuthenticated()){
            console.log('logged in')
            return next();
        }else{
            var package = {
                // 'valid': true,
                'msg':'Please Login First',
                'redirect': '/login'
            }
            console.log('not logged')
            res.send(package);
        }
    }