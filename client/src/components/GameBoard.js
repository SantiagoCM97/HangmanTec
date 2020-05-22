import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import hangman from "../assets/hangman.png";
import LetterSlot from "./gameboard/LetterSlot";
import LetterButton from "./gameboard/LetterButton";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    minHeight: "90%",
    padding: "20px",
  },
  hangman: {
    width: "350px",
  },
  scoreLabelItem: {
    marginTop: "4em",
  },
  gameContainer: {
    height: "100%",
    paddingRight: "25px",
  },
  lettersItem: {
    marginTop: "20px",
  },
}));

export default function GameBoard(props) {
  const classes = useStyles();
  const alphabet = Array.from("abcdefghijklmnopqrstuvwxyz".toUpperCase());
  const [gameWord, setGameWord] = useState("");
  const [newGame, setNewGame] = useState(1);
  const [currentScore, setCurrentScore] = useState(0);

  useEffect(() => {
    const fetchWord = async () => {
      const result = await axios(
        "https://random-word-api.herokuapp.com/word?number=1"
      );
      console.log(result.data[0]);
      setGameWord(result.data[0]);
    };
    const rerenderButtons = () => {
      setNewGame(newGame + 1);
    };

    fetchWord();
    rerenderButtons();
    setCurrentScore(0);
    console.log(props.newGame);
    setNewGame(props.newGame);
    console.log(newGame);
    //RESTART ANIMATION
  }, [props.newGame]);

  const slots = (currentWord) => {
    const word = Array.from(currentWord.toUpperCase());
    return word.map((letter, index) => (
      <Grid item>
        <LetterSlot letter={letter} key={`${letter}${index}`} />
      </Grid>
    ));
  };

  const buttons = (newGame) => {
    return alphabet.map((letter, index) => (
      <Grid item>
        <LetterButton
          letter={letter}
          newGame={newGame}
          key={`${letter}${index}`}
        />
      </Grid>
    ));
  };

  return (
    <Grid container direction="row" className={classes.mainContainer}>
      <Grid item xs={6}>
        <Grid
          container
          direction="column"
          xs={12}
          justify="center"
          alignItems="center"
          className={classes.scoreContainer}
        >
          <Grid item xs={12} className={classes.scoreAnimationItem}>
            <img
              className={classes.hangman}
              alt="hangmanAnimation"
              src={hangman}
            />
          </Grid>
          <Grid item xs={12} className={classes.scoreLabelItem}>
            <Typography align="center" variant="h2">
              Score: {currentScore}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-end"
          className={classes.gameContainer}
        >
          <Grid item xs={12} className={classes.lettersItem}>
            <Grid
              container
              justify="center"
              spacing={3}
              className={classes.lettersContainer}
            >
              {gameWord ? slots(gameWord) : "Loading..."}
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.lettersItem}>
            <Grid
              container
              justify="center"
              spacing={2}
              className={classes.lettersContainer}
            >
              {newGame ? buttons(newGame) : null}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
