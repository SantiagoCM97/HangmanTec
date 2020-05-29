// User's routes, define routing operations and url's

const express = require("express");
const router = express.Router();
const { ListUsers } = require("../models/user");

// Auth middleware
const authCheck = (req, res, next) => {
  if (!req.user) {
    // if user is not logged in
    res.redirect("/auth/login");
  } else {
    // if user logged in, keep going
    next();
  }
};

// Make a post request to create a new user
// To call use route: /user/create
router.post("/signin", (req, res, next) => {
  console.log(req);
  let user = {
    googleId: req.body.googleId,
    username: req.body.givenName,
    totalScore: 0,
    games: [],
  };
  return ListUsers.getGoogleAuthUser(user)
    .then((user) => {
      res.status(201).json({
        message: "Successfully authenticated user",
        status: 201,
        user: user,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: 500,
        message: "Something went wrong with the DB. Try again later.",
      });
    });
});

// Make a post request to add a new game to the user
// To call use route: /user/(userId)/newGame/
router.post("/:userId/newGame", (req, res, next) => {
  let userId = req.params.userId;
  let requiredFields = ["word", "score", "mistakes"];

  for (let i = 0; i < requiredFields.length; i++) {
    let currentField = requiredFields[i];

    if (!(currentField in req.body)) {
      res.status(406).json({
        message: `Missing field ${currentField} in body.`,
        status: 406,
      });
      return next();
    }
  }

  let newGame = {
    word: req.body.word,
    score: req.body.score,
    mistakes: req.body.mistakes,
  };

  return ListUsers.addGame(userId, newGame)
    .then((user) => {
      return res.status(201).json({
        message: "Successfully added the game to the user",
        status: 201,
        user: user,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: `Internal server error. ${err}`,
        status: 500,
      });
    });
});

module.exports = router;
