import { createMuiTheme } from "@material-ui/core/styles";

const uiGreen = "#009688";
const uiWhite = "#F4F4F4";
const uiBlack = "#111921";

export default createMuiTheme({
  palette: {
    common: {
      green: uiGreen,
      black: uiBlack,
      white: uiWhite,
    },
    primary: {
      main: uiBlack,
    },
    secondary: {
      main: uiGreen,
    },
  },
  typography: {
    tab: {
      fontFamily: "Open Sans",
      textTransform: "none",
      fontWeight: 600,
      fontSize: "1rem",
      color: uiGreen,
    },
    newGame: {
      fontFamily: "Montserrat",
      fontSize: "1rem",
      textTransform: "none",
      color: uiWhite,
    },
    h2: {
      fontFamily: "Montserrat",
      fontWeight: 500,
      fontSize: "2.5rem",
      color: uiGreen,
    },
  },
});
