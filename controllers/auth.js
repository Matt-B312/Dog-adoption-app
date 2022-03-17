const User = require('../models/User')
const bcrypt = require('bcrypt');
const passport = require('passport');
const salt = 10;
const {validationResult} = require('express-validator');

//http get - signup to load the form

exports.auth_signup_get = (req, res) => {
    res.render('auth/signup')
}

//http post - signup to post the data
exports.auth_signup_post = (req, res) => {
    console.log(req.body);

    let user = new User(req.body);
    let hash = bcrypt.hashSync(req.body.password, salt);

    user.password = hash;

    user.save()
    .then(() => {
        res.redirect('/auth/signin');
    })
    .catch((err) => {
        
        if(err.code == 11000){
            req.flash('error', 'Email already exists');
            res.redirect('/auth/signin');
        }else{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                // res.status(400).json({errors: errors.array});
                req.flash('validationErrors', errors.errors);
            }
            res.redirect('/auth/signup');
            // console.log(err);
            // res.send(err);
            
        }
        // console.log(err);
        // res.send('error!!!')
    })

};


//http get - to load signin form

exports.auth_signin_get = (req, res) => {
    res.render('auth/signin');
}

//http post - to post the data

exports.auth_signin_post =
passport.authenticate('local', {
successRedirect: '/pets/index',
failureRedirect: '/auth/signin',
failureFlash: 'Invalid username or password',
successFlash: 'You logged in successfully'
})

//http get - to logout the user

exports.auth_logout_get = (req,res) => {
    // will clear session
    req.logout();
    req.flash('success', 'You are logged out');
    res.redirect('/auth/signin')
}

