import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Fade from "@mui/material/Fade";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import React, { Suspense, useContext, useEffect } from "react";
import ReactDom from "react-dom";
import { HelmetProvider } from "react-helmet-async";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import { SettingsContext, useSettings } from "./contexts/SettingsContext";
import { Navbar } from "./Navbar";
import { darkTheme, lightTheme } from "./theme";

const GamePage = React.lazy(() => import("./pages/GamePage/GamePage"));
const SearchPage = React.lazy(() => import("./pages/SearchPage/SearchPage"));
const HomePage = React.lazy(() => import("./pages/HomePage/HomePage"));
const NotFoundPage = React.lazy(
  () => import("./pages/NotFoundPage/NotFoundPage")
);

const ShopAuthorPage = React.lazy(
  () => import("./pages/ShopPage/ShopAuthorPage")
);
const ShopAuthorProductPage = React.lazy(
  () => import("./pages/ShopPage/ShopAuthorProductPage")
);

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
              <Suspense
                fallback={
                  <Fade in>
                    <Container maxWidth="md">
                      <Box
                        display="flex"
                        justifyContent="center"
                        margin="3rem 0"
                      >
                        <CircularProgress />
                      </Box>
                    </Container>
                  </Fade>
                }
              >
                <Switch>
                  <Route exact path="/" component={HomePage} />

                  <Route
                    exact
                    path="/:language/srds/:author/:game/:chapter?"
                    component={GamePage}
                  />
                  <Route
                    exact
                    path="/:language/srds/:author/:game/:chapter?"
                    component={GamePage}
                  />
                  <Route exact path="/search" component={SearchPage} />

                  <Route
                    exact
                    path={"/browse/:authorSlug/"}
                    render={() => {
                      return <ShopAuthorPage />;
                    }}
                  />
                  <Route
                    exact
                    path={"/browse/:authorSlug/:productSlug"}
                    render={() => {
                      return <ShopAuthorProductPage />;
                    }}
                  />
                  <Route
                    path="*"
                    render={() => {
                      return <NotFoundPage />;
                    }}
                  />
                </Switch>
              </Suspense>

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
