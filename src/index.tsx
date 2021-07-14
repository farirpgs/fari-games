import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { GamePage } from "./pages/GamePage";
import { HomePage } from "./pages/HomePage";
import { Navbar } from "./Navbar";
import { darkTheme, lightTheme } from "./theme";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  return (
    <>
      <HelmetProvider>
        <ThemeProvider theme={prefersDarkMode ? darkTheme : lightTheme}>
          <CssBaseline />
          <Router>
            <ScrollToTop />
            <Navbar />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/game/:game/:chapter?" component={GamePage} />
            </Switch>
            <Box mb="50vh" />
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </>
  );
}

ReactDom.render(<App />, document.getElementById("root"));
