express = require('express');
const passport = require('passport');
const FacebookStrategy  = require('passport-facebook').Strategy;
const session  = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const config = require('./config.json');
app = express();

passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});
  
passport.use(new FacebookStrategy({
      clientID: config.FB_APP_ID,
      clientSecret:config.FB_APP_SECRET ,
      callbackURL: config.FB_CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(function () {
        console.log(accessToken, refreshToken, profile, done);
        return done(null, profile);
      });
    }
));

app.use(cookieParser()); //Parse cookie
app.use(bodyParser.json())
app.use(session({ secret: 'keyboard cat', key: 'sid'}));  //Save user login
app.use(passport.initialize());
app.use(passport.session());
require('./api')

const port = 3000
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})