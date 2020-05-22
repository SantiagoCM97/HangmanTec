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

  const handleClick = (e) => {
    e.preventDefault();
    setHidden(true);
    //TODO game Logic
  };

  const hiddenButton = {
    ...classes.letterButton,
    color: "red",
  };

  useEffect(() => {
    setHidden(false);
  }, [props.newGame]);

  const hiddenLetter = {};
  return (
    <Button
      variant="contained"
      className={hidden ? classes.letterButtonHidden : classes.letterButton}
      color="secondary"
      onClick={() => setHidden(true)}
    >
      <Typography align="center" className={classes.letter}>
        {props.letter}
      </Typography>
    </Button>
  );
}
