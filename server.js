//set the port 
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());


const port = process.env.PORT || 3000;

//import modules
const cookieParser=require('cookie-parser')
const morgan = require('morgan');
const session  = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');

// connect DB
const config = require('./config/config');
mongoose.connect(config.mongoUrl,{useNewUrlParser:true, useUnifiedTopology:true});
require('./config/passport')(passport);

//middlewares
/// cors
// app.use(cors({
//     origin: ['http://localhost:8080/','http://*/'],
//     credentials: true
// }));

///cors 

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false})); // body parser
app.use(session({ secret:'secretKey',
                resave: true,
                saveUninitialized:true}));
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(passport.session());


// routes
// require('./components/house/routes')(app);
require('./routes/userRoutes')(app, passport);// old route using passport.js
require('./routes/userOath')(app);// new route using JWT
require('./routes/componentRoutes')(app);
require('./routes/uploadRoutes')(app);

// listen port
app.listen(port,console.log("server running in port:"+ port));
