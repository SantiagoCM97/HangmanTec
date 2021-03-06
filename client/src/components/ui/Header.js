import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/styles";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
  },
  logo: {
    height: "8em",
    [theme.breakpoints.down("md")]: {
      height: "7em",
    },
    [theme.breakpoints.down("xs")]: {
      height: "5.5em",
    },
  },
  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px",
  },
  button: {
    ...theme.typography.newGame,
    borderRadius: "50px",
    marginLeft: "50px",
    marginRight: "25px",
    height: "45px",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  logoContainer: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  appbar: {
    zIndex: theme.zIndex.modal + 1,
  },
  hidden: {
    visibility: "hidden",
  },
}));

export default function Header(props) {
  const classes = useStyles();

  const handleChange = (e, newValue) => {
    props.setValue(newValue);
  };

  const routes = [
    { name: "Board", link: "/", activeIndex: 0 },
    { name: "History", link: "/history", activeIndex: 1 },
    { name: "About", link: "/about", activeIndex: 2 },
  ];

  const tabs = (
    <React.Fragment>
      <Tabs
        value={props.value}
        className={classes.tabContainer}
        onChange={handleChange}
      >
        {routes.map((route, index) => (
          <Tab
            label={route.name}
            component={Link}
            to={route.link}
            className={classes.tab}
            key={`${route}${index}`}
          />
        ))}
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={() => props.setNewGame(props.newGame + 1)}
        >
          New Game
        </Button>
      </Tabs>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar className={props.hidden ? classes.hidden : classes.appbar}>
          <Toolbar disableGutters>{tabs}</Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={props.hidden ? classes.hidden : classes.toolbarMargin} />
    </React.Fragment>
  );
}
