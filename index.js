const express = require('express');
const app = express();
const port = 1000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongodb-session')(session);
const cookieParser = require('cookie-parser');
const passportGoogle = require('./config/passport-google-oath2-strategy');


app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    // properties needs to set
    // name of cookie
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    // whenever encryption happen their is a key to encode and decode, to encode we are using this key
    secret: 'blahsomething',
    // if identity not est we do not want to sqave extra things in cookie
    saveUninitialized: false,
    // we dont want to rewrite data in session cookie 
    resave: false,
    cookie: {
        // we need to give age to the cookie for how long it should be their, 
        // after this time the cookie/session expires
        // first is in mili seconds
        maxAge: (1000 * 60 * 100)
    },
    // for setting up mogno store
    store: new MongoStore({
        // setup mongoose conn
        uri: 'mongodb://localhost/quora_development',
        collection:'mySessions',
        // do i want to remove automatically, disabled
        autoRemove: 'disabled'
    },
    // if connection not establish
    function(err) {
        console.log(err || 'connect-mongodb setup ok');
    }
    )
}));

// we need to tell app use passport
app.use(passport.initialize());
// passport also helps in mantaining session
app.use(passport.session());
app.use(passport.setAuthenticatedUser);



// use express router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
