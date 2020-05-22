// User's routes, define routing operations and url's

const express = require('express');
const router = express.Router();
const {ListUsers} = require('../models/user');

// Make a post request to create a new user
// To call use route: /user/create
router.post('/create',(req, res, next) => {
	let requiredFields = ['username', 'password', 'email'];

	for(let i = 0; i < requiredFields.length; i++){
		let currentField = requiredFields[i];

		if (!(currentField in req.body)){
			res.status(406).json({
				message: `Missing field ${currentField} in body.`,
				status: 406
			});
			return next();
		}
	}

	let newUser = {
		username: req.body.username,
		password: req.body.password,
		email: req.body.email,
	}

	ListUsers.post(newUser)
		.then(user => {
			res.status(201).json({
				message: "Successfully added the user",
				status: 201,
				user: user
			});
		})
		.catch( err => {
			res.status(500).json({
				message: `Internal server error. ${err}`,
				status: 500
			});
			return next();
		});
});

// Make a post request to add a new game to the user
// To call use route: /user/(userId)/newGame/
router.post('/:userId/newGame',(req, res, next) => {
    let userId = req.params.userId;
	let requiredFields = ['word', 'score'];

	for(let i = 0; i < requiredFields.length; i++){
		let currentField = requiredFields[i];

		if (!(currentField in req.body)){
			res.status(406).json({
				message: `Missing field ${currentField} in body.`,
				status: 406
			});
			return next();
		}
	}

	let newGame = {
		word: req.body.word,
		score: req.body.score
	}

	ListUsers.addGame(userId, newGame)
		.then(user => {
			res.status(201).json({
				message: "Successfully added the game to the user",
				status: 201,
				user: user
			});
		})
		.catch( err => {
			res.status(500).json({
				message: `Internal server error. ${err}`,
				status: 500
			});
			return next();
		});
});

module.exports = router;
