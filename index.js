const express = require('express');
const port = 3000;
const app = express();
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const sassMiddleware = require('node-sass-middleware');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
app.use(express.urlencoded());



//keep this before assets static middleware
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css',
}));


app.use(express.static('./assets'));
app.use(expressLayouts);

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'BasicUserSession',
    secret: 'thisistocreatehashedinfo',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 100 * 600 * 100,
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/postsandcommentsandauth',
        mongooseConnection: db,
        autoRemove: 'disabled',
    }, function(err) {
        if (err) {
            console.log(err || 'connect-mongodb setup ok');

        }
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);


app.use('/', require('./routes'));


app.listen(port, function(err) {
    if (err) {
        console.log(err);
        return;
    }

    console.log('SERVER IS UP AND RUNNING ON PORT', port);
});