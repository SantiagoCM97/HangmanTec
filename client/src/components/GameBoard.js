import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import hangman from "../assets/hangman.png";
import LetterSlot from "./gameboard/LetterSlot";
import LetterButton from "./gameboard/LetterButton";

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

export default function GameBoard() {
  const classes = useStyles();
  const currentScore = 0;
  const alphabet = Array.from("abcdefghijklmnopqrstuvwxyz".toUpperCase());
  const [gameWord, setGameWord] = useState("house");
  const word = Array.from(gameWord.toUpperCase());
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
              {word.map((letter, index) => (
                <Grid item>
                  <LetterSlot letter={letter} key={`${letter}${index}`} />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.lettersItem}>
            <Grid
              container
              justify="center"
              spacing={2}
              className={classes.lettersContainer}
            >
              {alphabet.map((letter, index) => (
                <Grid item>
                  <LetterButton letter={letter} key={`${letter}${index}`} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
