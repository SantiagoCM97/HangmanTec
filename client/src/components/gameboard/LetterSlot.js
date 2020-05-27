import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Underline from "../../assets/underLine.png";

const useStyles = makeStyles((theme) => ({
  main: {},
  letter: {
    ...theme.typography.h2,
    fontStyle: "italic",
  },
  foundLetter: {
    ...theme.typography.h2,
    fontStyle: "italic",
    visibility: "hidden",
  },
  underlineItem: {
    marginTop: "-10px",
  },
  lineImg: {
    width: "3rem",
  },
}));

export default function LetterSlot(props) {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      justify="center"
      spacing={0}
      className={classes.main}
    >
      <Grid item>
        <Typography
          variant="h2"
          align="center"
          className={props.found ? classes.letter : classes.foundLetter}
        >
          {props.letter}
        </Typography>
      </Grid>
      <Grid item className={classes.underlineItem}>
        <img
          className={classes.lineImg}
          alt="letter Underline"
          src={Underline}
        />
      </Grid>
    </Grid>
  );
}
