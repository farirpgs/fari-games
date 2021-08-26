import React, { useContext } from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { GamePage } from "./pages/GamePage";
import { HomePage } from "./pages/HomePage";
import { Navbar } from "./Navbar";
import { darkTheme, lightTheme } from "./theme";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { StyledEngineProvider, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import { useSettings, SettingsContext } from "./contexts/SettingsContext";
import PrintGamePage from "./pages/PrintGamePage";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppProviders(props: { children: any }) {
  const settingsManager = useSettings();
  return (
    <SettingsContext.Provider value={settingsManager}>
      {props.children}
    </SettingsContext.Provider>
  );
}

function App() {
  const settingsManager = useContext(SettingsContext);
  return (
    <>
      <HelmetProvider>
        <StyledEngineProvider injectFirst>
          <ThemeProvider
            theme={
              settingsManager.state.themeMode === "dark"
                ? darkTheme
                : lightTheme
            }
          >
            <CssBaseline />
            <Router>
              <ScrollToTop />
              <Navbar />
              <Switch>
                <Route exact path="/" component={HomePage} />{" "}
                <Route
                  exact
                  path="/games/print/:game/:chapter?"
                  component={PrintGamePage}
                />
                <Route
                  exact
                  path="/games/:game/:chapter?"
                  component={GamePage}
                />
              </Switch>
              <Box mb="50vh" />
            </Router>
          </ThemeProvider>
        </StyledEngineProvider>
      </HelmetProvider>
    </>
  );
}

ReactDom.render(
  <AppProviders>
    <App />
  </AppProviders>,
  document.getElementById("root")
);
