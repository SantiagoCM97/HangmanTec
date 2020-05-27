import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { GoogleLogin } from "react-google-login";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    background:
      "linear-gradient(180deg, rgba(0,150,136,1) 1%, rgba(17,25,33,1) 100%)",
    width: "100vw",
    height: "100vh",
  },
  loginBox: {
    backgroundColor: theme.palette.common.white,
    width: "400px",
    height: "300px",
    borderRadius: "20px",
    boxShadow: theme.shadows[5],
    padding: "20px",
  },
  logo: {
    ...theme.typography.h2,
    fontStyle: "italic",
  },
  buttonArea: {
    marginTop: "30px",
  },
}));

export default function Login(props) {
  const classes = useStyles();

  function handleLoginFailure(response) {
    alert("Failed to log in");
  }

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.mainContainer}
    >
      <Grid item className={classes.loginBox}>
        <Grid container justify="center">
          <Grid item xs={12}>
            <Typography align="center" className={classes.logo}>
              Ahorca
              <br />
              Tec
            </Typography>
          </Grid>
          <Grid container item justify="center" className={classes.buttonArea}>
            <GoogleLogin
              clientId={props.clientID}
              buttonText="Continue with Google"
              onSuccess={props.login}
              onFailure={handleLoginFailure}
              cookiePolicy={"single_host_origin"}
              responseType="code,token"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
