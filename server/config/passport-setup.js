// Config file to setup passport, used for google auth

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const {ListUsers} = require('../models/user'); 

// Serialize user to pass it on to a cookie for the browser
passport.serializeUser((user,done) => {
    done(null, user.id);
});

passport.deserializeUser((id,done) => {
    ListUsers.getSerializedUser(id).then( user => {
        done(null, user);
    });
});

// After user is logged in, passport sends us the user in the req param //

passport.use(
    new GoogleStrategy({
        // options for the google strategy
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        // passport callback function
        console.log('passport callback function fired');
        //console.log(profile);

        // Identify user using the google id returned from google API
        let loggedUser = {
            username : profile.displayName,
            googleId : profile.id
        }

        //Check if user already exists in the db, if not existent create a new one
        ListUsers.getGoogleAuthUser(loggedUser).then( currentUser => { // Current user is sent by the return in user model
            done(null, currentUser);
        })
        .catch( err => {
            console.log(err);
        });
    })
);
