import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  letterButton: {
    borderRadius: "50px",
  },
  letter: {
    fontFamily: "Montserrat",
    fontWeight: "500",
    fontSize: "1.25em",
    color: theme.palette.common.white,
  },
  letterButtonHidden: {
    borderRadius: "50px",
    visibility: "hidden",
  },
}));

export default function LetterButton(props) {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [hidden, setHidden] = useState(false);

  const findLetterInWordtoCompare = (letter, word) => {
    var tmpFlags = [];
    var mistake = true;
    Object.assign(tmpFlags, props.lettersFoundFlags);
    word.forEach((element, index) => {
      if (element === letter) {
        mistake = false;
        tmpFlags[index] = true;
      }
    });
    return { tmpFlags, mistake };
  };

  const handleClick = () => {
    setHidden(true);
    const { tmpFlags, mistake } = findLetterInWordtoCompare(
      props.letter,
      props.wordToCompare
    );
    props.setLettersFoundFlags(tmpFlags);
    if (mistake) props.addMistake();
  };

  useEffect(() => {
    setHidden(false);
  }, [props.newGame]);

  return (
    <Button
      variant="contained"
      className={hidden ? classes.letterButtonHidden : classes.letterButton}
      color="secondary"
      onClick={() => handleClick()}
    >
      <Typography align="center" className={classes.letter}>
        {props.letter}
      </Typography>
    </Button>
  );
}
