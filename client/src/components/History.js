import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import theme from "./ui/Theme.js";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    minHeight: "90%",
    padding: "20px",
    maxWidth: "1000px",
  },
  title: {
    color: theme.palette.common.black,
    marginTop: "20px",
    marginBottom: "20px",
  },
  recordContainer: {
    minHeight: "55px",
    border: `${theme.palette.common.green} 1px solid`,
    borderRadius: "8px",
    paddingRight: "20px",
    paddingLeft: "20px",
    backgroundColor: theme.palette.common.black,
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
  },
  wordLabel: {
    fontFamily: "Montserrat",
    fontSize: "1.25em",
    fontWeight: 500,
    color: theme.palette.common.green,
    minWidth: "40%",
    maxWidth: "50%",
  },
  scoreLabel: {
    fontFamily: "Montserrat",
    fontWeight: 600,
    color: theme.palette.common.white,
  },
  score: {
    color: theme.palette.common.green,
    marginLeft: "5px",
  },
  mistakesLabel: {
    fontFamily: "Montserrat",
    fontWeight: 600,
    color: theme.palette.common.white,
  },
  mistakes: {
    color: "red",
    marginLeft: "5px",
  },
  loadingText: {
    ...theme.typography.tab,
    marginLeft: "20px",
  },
  totalScore: {
    color: theme.palette.common.black,
    marginTop: "20px",
    marginBottom: "20px",
  },
}));

export default function History(props) {
  const classes = useStyles();

  const gameRecords = props.games.map((record) => (
    <Grid
      item
      sm={6}
      xs={12}
      className={classes.recordBox}
      key={`${record.word}${record.score}`}
    >
      <Grid
        container
        justify="space-between"
        alignItems="center"
        className={classes.recordContainer}
      >
        <Typography align="left" className={classes.wordLabel}>
          {record.word}
        </Typography>
        <Typography align="center" className={classes.scoreLabel}>
          Score: <span className={classes.score}>{record.score}</span>
        </Typography>
        <Typography align="center" className={classes.mistakesLabel}>
          Misses: <span className={classes.mistakes}>{record.mistakes}</span>
        </Typography>
      </Grid>
    </Grid>
  ));

  return (
    <Grid container justify="center" className={classes.body}>
      <Grid container item x={12} className={classes.mainContainer}>
        <Grid item xs={6}>
          <Typography variant="h2" className={classes.title}>
            History
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h2" className={classes.totalScore}>
            Total Score: {props.totalScore}
          </Typography>
        </Grid>
        <Grid container spacing={2}>
          {props.games.length ? (
            gameRecords
          ) : (
            <Typography align="center" className={classes.loadingText}>
              No saved games yet...
            </Typography>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
