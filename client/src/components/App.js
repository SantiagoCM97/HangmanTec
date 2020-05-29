import React, { useState, useEffect } from "react";
import Header from "./ui/Header";
import GameBoard from "./GameBoard";
import About from "./About";
import Login from "./Login";
import History from "./History";
import Settings from "./Settings";
import * as api from "../api";
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
  const [user, setUser] = useState({
    googleId: "",
    username: "",
    totalScore: 0,
    games: [],
  });

  useEffect(() => {
    console.log("USER STATE: ", user);
  }, [user]);

  async function login(response) {
    console.log("Response: ", response);
    console.log("token: ", response.accessToken);
    if (response.accessToken) {
      const payload = response.profileObj;
      const { data } = await api.signin(payload);
      console.log("Data returned: ", data);
      setUser({
        googleId: data.user.googleId,
        username: data.user.username,
        totalScore: data.user.total_scores,
        games: data.user.games,
        id: data.user._id,
      });
      setLoggedIn(true);
      setAccessToken(response.accessToken);
      // BACK-END server login logic
    }
  }

  function updateUserState(game, score) {
    var newGames = [];
    Object.assign(newGames, user.games);
    newGames.push(game);
    console.log("Temporary Games", newGames);
    console.log("Total  Score", user.totalScore);

    setUser({
      googleId: user.googleId,
      username: user.username,
      totalScore: user.totalScore + score,
      games: newGames,
      id: user.id,
    });
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
              <Login clientID={CLIENT_ID} login={login} />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route exact path="/">
            {loggedIn ? (
              <GameBoard
                newGame={newGame}
                setNewGame={setNewGame}
                userId={user.id}
                updateUser={updateUserState}
              />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route exact path="/history">
            {loggedIn ? (
              <History games={user.games} totalScore={user.totalScore} />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route exact path="/settings">
            {loggedIn ? <Settings /> : <Redirect to="/login" />}
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
