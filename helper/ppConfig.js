const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User')

// serilizeUser
//saving data to the session
//id is a unique identifier
passport.serializeUser(function(user, done){
    done(null, user.id)
})

// DeserilizeUser
// Reading the information from the database from the id
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    })
})

passport.use(new LocalStrategy(
    {
        usernameField: 'emailAddress',
        passwordField: 'password'
    },
    function(emailAddress, password, done) {
      User.findOne({ emailAddress: emailAddress }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));




module.exports = passport;