import React, { useState } from "react";
import Header from "./ui/Header";
import GameBoard from "./GameBoard";
import About from "./About";
import Login from "./Login";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./ui/Theme.js";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

function App() {
  const CLIENT_ID =
    "394161277788-0imnnbji1quabntinua24o1ust9bl29b.apps.googleusercontent.com";

  const [value, setValue] = useState(0);
  const [newGame, setNewGame] = useState(1);
  const [loggedIn, setLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  function login(response) {
    console.log("Response: ", response);
    console.log("token: ", response.accessToken);
    if (response.accessToken) {
      setLoggedIn(true);
      setAccessToken(response.accessToken);
      // BACK-END server login logic
    }
  }
  function logout(response) {
    setLoggedIn(false);
    setAccessToken("");
    // Back-end server logout logic
  }

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header
          hidden={!loggedIn}
          value={value}
          setValue={setValue}
          newGame={newGame}
          setNewGame={setNewGame}
        />
        <Switch>
          <Route exact path="/login">
            {!loggedIn ? (
              <Login clientID={CLIENT_ID} login={login} logout={logout} />
            ) : (
              <Redirect to="/game" />
            )}
          </Route>
          <Route exact path="/game">
            {loggedIn ? (
              <GameBoard newGame={newGame} setNewGame={setNewGame} />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route exact path="/history">
            {loggedIn ? <div>history</div> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/settings">
            {loggedIn ? <div>settings</div> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/about">
            {loggedIn ? <div>about</div> : <Redirect to="/login" />}
          </Route>
          <Route
            exact
            path="/logout"
            component={() => <div>Logout</div>}
          ></Route>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
