// User modeling, define schema and define operations in database
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Children Schema (Game)
let gameSchema = mongoose.Schema({
    word : {
        type: String,
        required: true
    },
    score : {
        type: Number,
        required: true
    },
})

// Parent Schema (User)
let userSchema = mongoose.Schema({
    googleId : {
        type: String,
        required: true
    },
    username : {
        type: String,
        required: true
    },
    total_scores : {
        type: Number,
        default: 0
    },
    games : {
        type: [gameSchema],
    },
})



let Users = mongoose.model('User', userSchema);

// Database operations
const ListUsers = {
    post : function(newUser){
        return Users.create(newUser)
        .then( user => {
            console.log('new created user: ', newUser);
            return user;
        })
        .catch( err => {
            console.log(err);
        })
    },
    // Delete a user
    delete : function(userId){
        return Users.findOneAndDelete({"_id" : userId}, {projection: {"_id" : 1, "username" : 1}})
            .then(user => {
                return user;
            })
            .catch(err => {
                throw new Error(err);
            });
    },
    // Add a game to the user
    addGame : async function(userId, newGame){
        return await Users.findOneAndUpdate({"_id" : userId}, {$push: newGame }, {new: true}).lean(true)
            .then(user => {
                return user;
            })
            .catch(err => {
                throw new Error(err);
            });
    },
    getGoogleAuthUser : function(user){
        return Users.findOne({googleId: user.googleId})
        .then( currentUser => {
            if(currentUser){
                // already have the user
                console.log('user is: ', currentUser);
                return currentUser;
            } else {
                // if not create user in our db
                return this.post(user);
            }
        })
        .catch( err => {
            console.log(err);
        })
    },
    getSerializedUser : function(userId){
        return Users.findById(userId)
        .then( user => {
            return user;
        })
        .catch( err => {
            console.log(err);
        })
    }
    // Get all user games   
}

module.exports = {ListUsers};