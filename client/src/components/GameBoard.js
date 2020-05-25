import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import hangman from "../assets/hangman.png";
import LetterSlot from "./gameboard/LetterSlot";
import LetterButton from "./gameboard/LetterButton";
import Modal from "@material-ui/core/Modal";
import axios from "axios";

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

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
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.common.white,
    border: "2px solid #000",
    borderRadius: "20px",
    boxShadow: theme.shadows[5],
    padding: "20px",
  },
  modalTitle: {
    color: theme.palette.common.black,
  },
  modalButton: {
    minWidth: "100px",
  },
}));

export default function GameBoard(props) {
  const classes = useStyles();
  const alphabet = Array.from("abcdefghijklmnopqrstuvwxyz".toUpperCase());
  const [wordToCompare, setWordToCompare] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [lettersFoundFlags, setLettersFoundFlags] = useState([]);
  const [mistakes, setMistakes] = useState(5);
  const [modalStyle] = useState(getModalStyle);
  const [gameOverModalOpen, setGameOverModalOpen] = useState(false);

  useEffect(() => {
    const fetchWord = async () => {
      const result = await axios(
        "https://random-word-api.herokuapp.com/word?number=1"
      );
      setWordToCompare(Array.from(result.data[0].toUpperCase()));
      setLettersFoundFlags(new Array(result.data[0].length).fill(false));
      console.log("word: ", result.data[0].toUpperCase());
    };

    fetchWord();
    setMistakes(5);

    //RESTART ANIMATION
  }, [props.newGame]);

  useEffect(() => {
    var rightAnswers = 0,
      score = 0;
    lettersFoundFlags.forEach((element, index) => {
      if (element === true) rightAnswers++;
    });
    score = Math.floor((rightAnswers / lettersFoundFlags.length) * 100);
    setCurrentScore(score);
  }, [lettersFoundFlags]);

  useEffect(() => {
    if (currentScore >= 100) setGameOverModalOpen(true);
  }, [currentScore]);

  function addMistake() {
    setMistakes(mistakes - 1);
    if (mistakes - 1 <= 0) setGameOverModalOpen(true);
  }

  function handleGameoverModalClose() {
    setGameOverModalOpen(false);
  }

  const handleLetterButtonClick = (letter) => {
    var tmpFlags = [];
    var mistake = true;
    Object.assign(tmpFlags, lettersFoundFlags);
    wordToCompare.forEach((element, index) => {
      if (element === letter) {
        mistake = false;
        tmpFlags[index] = true;
      }
    });
    setLettersFoundFlags(tmpFlags);
    if (mistake) addMistake();
  };

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
            action={handleLetterButtonClick}
            letter={letter}
            key={`${letter}${index}`}
            newGame={props.newGame}
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
          <Grid item xs={12} className={classes.mistakesLabelItem}>
            <Typography align="center" className={classes.mistakesLabel}>
              Mistakes: {mistakes}
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
      <Modal
        open={gameOverModalOpen}
        aria-labelledby="GameOverModal"
        disableBackdropClick={true}
      >
        <Grid
          container
          style={modalStyle}
          className={classes.paper}
          spacing={3}
        >
          <Grid item xs={12}>
            <Typography
              align="center"
              variant="h2"
              className={classes.modalTitle}
            >
              {currentScore >= 100 ? "You Win!" : "Game Over!"}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Grid container justify="flex-end">
              <Button
                variant="contained"
                color="secondary"
                className={classes.modalButton}
              >
                Save
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container justify="flex-start">
              <Button
                variant="contained"
                color="primary"
                className={classes.modalButton}
                onClick={() => {
                  props.setNewGame(props.newGame + 1);
                  handleGameoverModalClose();
                }}
              >
                New Game
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Modal>
    </Grid>
  );
}
