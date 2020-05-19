import React, { useState } from "react";
import Header from "./ui/Header";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./ui/Theme.js";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  const [value, setValue] = useState(0);
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header value={value} setValue={setValue} />
        <Switch>
          <Route exact path="/" component={() => <div>Board</div>}></Route>
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
