// Auth routes, define routing operations and url's
const express = require('express');
const router = express.Router();
const passport = require('passport');

// auth login - just for view tests
router.get('/login', (req,res) => {
    res.render('login', {user: req.user});
});

//auth logout
router.get('/logout', (req,res) => {
    //handle with passport
    req.logout();
    res.redirect('/');
});

// auth with google
router.get('/google', passport.authenticate('google', {
    scope:['profile']
}));

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req,res) => {
    res.send(req.user);
});

module.exports = router;