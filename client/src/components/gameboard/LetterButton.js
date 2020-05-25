import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
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

  useEffect(() => {
    setHidden(false);
  }, [props.newGame]);

  return (
    <Button
      variant="contained"
      className={hidden ? classes.letterButtonHidden : classes.letterButton}
      color="secondary"
      onClick={() => {
        props.action(props.letter);
        setHidden(true);
      }}
    >
      <Typography align="center" className={classes.letter}>
        {props.letter}
      </Typography>
    </Button>
  );
}
