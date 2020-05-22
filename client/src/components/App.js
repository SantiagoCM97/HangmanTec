import React, { useState } from "react";
import Header from "./ui/Header";
import GameBoard from "./GameBoard";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./ui/Theme.js";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  const [value, setValue] = useState(0);
  const [newGame, setNewGame] = useState(1);
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header
          value={value}
          setValue={setValue}
          newGame={newGame}
          setNewGame={setNewGame}
        />
        <Switch>
          <Route exact path="/">
            <GameBoard newGame={newGame} />
          </Route>
          <Route
            exact
            path="/history"
            component={() => <div>history</div>}
          ></Route>
          <Route
            exact
            path="/settings"
            component={() => <div>Settings</div>}
          ></Route>
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
