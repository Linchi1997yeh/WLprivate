module.exports = (app)=>{
    const Handler = require('./handler');
    let handlers =new Handler();
    let middleware = require('../middleware');
    // let jwt = require('jsonwebtoken');
    // let config = require('../config/config');
    // let middleware = require('../middleware');
    // let User = require('../models/userSchema');

    // register
    app.post('/user/register',handlers.register);
    // user login  
    app.post('/user/login', handlers.login);
    app.get('/index',middleware.checkToken,handlers.index);

}