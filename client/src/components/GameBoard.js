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
  const [newGame, setNewGame] = useState(1);
  const [wordToCompare, setWordToCompare] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [lettersFoundFlags, setLettersFoundFlags] = useState([]);

  useEffect(() => {
    const fetchWord = async () => {
      const result = await axios(
        "https://random-word-api.herokuapp.com/word?number=1"
      );
      setWordToCompare(Array.from(result.data[0].toUpperCase()));
      setLettersFoundFlags(new Array(result.data[0].length).fill(false));
    };

    fetchWord();
    setCurrentScore(0);
    setNewGame(props.newGame);
    //RESTART ANIMATION
  }, [props.newGame]);

  useEffect(() => {
    console.log(lettersFoundFlags);
  }, [lettersFoundFlags]);

  const slots = (
    <Grid
      container
      justify="center"
      spacing={3}
      className={classes.lettersContainer}
    >
      {wordToCompare.map((letter, index) => (
        <Grid item>
          <LetterSlot
            letter={letter}
            found={lettersFoundFlags[index]}
            key={`${letter}${index}`}
          />
        </Grid>
      ))}
    </Grid>
  );

  const buttons = (
    <Grid
      container
      justify="center"
      spacing={2}
      className={classes.lettersContainer}
    >
      {alphabet.map((letter, index) => (
        <Grid item>
          <LetterButton
            letter={letter}
            newGame={newGame}
            wordToCompare={wordToCompare}
            lettersFoundFlags={lettersFoundFlags}
            setLettersFoundFlags={setLettersFoundFlags}
            key={`${letter}${index}`}
          />
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Grid container direction="row" className={classes.mainContainer}>
      <Grid item xs={6}>
        <Grid
          container
          direction="column"
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
            {slots}
          </Grid>
          <Grid item xs={12} className={classes.lettersItem}>
            {buttons}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
