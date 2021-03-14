const express = require('express');
const router = express.Router();
const passport = require('passport');
const UserController = require('../controllers/user_controllers');

//get routes
router.get('/', UserController.userhomepage);
router.get('/signin', UserController.signin);
router.get('/signup', UserController.signup);
router.get('/signout', UserController.destroySession);
router.get('/userprofile', passport.checkAuthentication, UserController.profilepage);

//post routes
router.post('/create-user', UserController.createUser);
console.log('above create ses route');
router.post('/create-session', passport.authenticate('local', {
    failureRedirect: '/users/signup',
    failureFlash: 'this is the flash message...true',
}, ), UserController.createSession);

//****Debugged the failureREdirect using this */

// router.post('/create-session', function(req, res, next) {
//     console.log(req.url);
//     passport.authenticate('local', function(err, user, info) {
//         console.log("authenticate");
//         console.log(req.body);
//         console.log(user);
//         console.log(info);
//     })(req, res, next);
// });

module.exports = router;