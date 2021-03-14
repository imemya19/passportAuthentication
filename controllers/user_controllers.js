const User = require('../models/user');

module.exports.userhomepage = function(req, res) {
    return res.render('userhomepage');

};

module.exports.signin = function(req, res) {

    if (req.isAuthenticated()) {
        return res.redirect('/users/userprofile');
    }
    return res.render('signin');

};

module.exports.signup = function(req, res) {

    if (req.isAuthenticated()) {
        return res.redirect('/users/userprofile');
    }
    return res.render('signup');

};

module.exports.destroySession = function(req, res) {
    return res.render('/users');
};

module.exports.profilepage = function(req, res) {
    return res.render('userprofile');

};

//POST routes controllers
module.exports.createUser = function(req, res) {
    //save this user to the database
    console.log(req.body);
    if (req.body.password != req.body.confirmPassword) {
        console.log('Confirm password didnt match the original password ');
        return res.redirect('back');
    }

    //does user with this id already exist
    User.findOne({ email: req.body.email }, function(err, user) {
        if (err) {
            console.log('error in finding if this user already exists in database');
            return res.redirect('back');
        }

        if (user) {
            console.log('User with this email already exists, so try to sign in instead');
            return res.redirect('back');
        }

        if (!user) {
            User.create(req.body, function(err, user) {
                if (err) {
                    console.log('error in creating the user');
                    return res.redirect('back');

                }
                console.log(user);
                return res.redirect('/users/signin');

            });
        }
    });
};

module.exports.createSession = function(req, res) {
    return res.redirect('/users/userprofile');
};