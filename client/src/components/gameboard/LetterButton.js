import React, { useState } from "react";
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
}));

export default function LetterButton(props) {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <Button
      variant="contained"
      className={classes.letterButton}
      color="secondary"
    >
      <Typography align="center" className={classes.letter}>
        {props.letter}
      </Typography>
    </Button>
  );
}
