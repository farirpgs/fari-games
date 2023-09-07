import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Fade from "@mui/material/Fade";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import React, { Suspense, useContext } from "react";
import ReactDom from "react-dom";
import { HelmetProvider } from "react-helmet-async";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { Navbar } from "./Navbar";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { SettingsContext, useSettings } from "./contexts/SettingsContext";
import { SentryService } from "./services/SentryService";
import { darkTheme, lightTheme } from "./theme";

const ProductPage = React.lazy(() => import("./pages/ProductPage/ProductPage"));
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
              <ErrorBoundary>
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
                  {renderRedirects()}
                  <Switch>
                    <Route
                      exact
                      path="/"
                      render={() => {
                        location.href = "https://fari.community";
                        return null;
                      }}
                    />
                    <Route
                      exact
                      path="/search"
                      render={(props) => {
                        const params = new URLSearchParams(location.search);
                        const defaultSearchQuery = params.get("query") || "";
                        location.href = `https://fari.community/browse?search=${defaultSearchQuery}`;
                        return null;
                      }}
                    />

                    <Route
                      exact
                      path="/:language/:type/:author/:game/:chapter?"
                      render={(props) => {
                        let creator = props.match.params.author;
                        let project = props.match.params.game;
                        const page = props.match.params.chapter;
                        // https://fari.games/en/srds/fari-games/charge-rpg
                        if (creator === "donbisdorf") {
                          creator = "don-bisdorf";
                        }
                        if (creator === "evilhat") {
                          creator = "evil-hat";
                        }
                        if (creator === "gilarpgs") {
                          creator = "gila-rpgs";
                        }
                        if (creator === "jasontocci") {
                          creator = "jason-tocci";
                        }
                        if (creator === "peachgardengames") {
                          creator = "peach-garden-games";
                        }
                        if (creator === "wuderpg") {
                          creator = "wude-rpg";
                        }
                        if (creator === "zadmargames") {
                          creator = "zadmar-games";
                        }
                        if (creator === "zonefighterj") {
                          creator = "zone-fighter-j";
                        }

                        if (project === "breathless-srd") {
                          project = "breathless";
                        }
                        if (project === "charge-rpg") {
                          project = "charge";
                        }
                        if (project === "hopes-and-dreams-srd") {
                          project = "hopes-and-dreams";
                        }

                        if (page) {
                          location.href = `https://fari.community/creators/${creator}/projects/${project}/${page}`;
                        } else {
                          location.href = `https://fari.community/creators/${creator}/projects/${project}`;
                        }
                        return null;
                      }}
                    />
                    <Route
                      exact
                      path={"/browse/:authorSlug/"}
                      render={(props) => {
                        location.href = `https://fari.community/creators/${props.match.params.authorSlug}`;
                        return null;
                      }}
                    />
                    <Route
                      exact
                      path={"/browse/:authorSlug/:productSlug"}
                      render={(props) => {
                        location.href = `https://fari.community/creators/${props.match.params.authorSlug}/projects/${props.match.params.productSlug}`;
                        return null;
                      }}
                    />
                    <Route
                      path="*"
                      render={() => {
                        location.href = "https://fari.community";
                        return null;
                      }}
                    />
                  </Switch>
                </Suspense>

                <Box mb="50vh" />
              </ErrorBoundary>
            </Router>
          </ThemeProvider>
        </StyledEngineProvider>
      </HelmetProvider>
    </>
  );

  function renderRedirects() {
    return (
      <>
        <Route
          path="*"
          render={(routeProps) => {
            if (routeProps.match.url.includes("fari-games")) {
              return (
                <>
                  <Redirect
                    to={routeProps.match.url
                      .split("fari-games")
                      .join("fari-rpgs")}
                  />
                </>
              );
            }
            return null;
          }}
        />
      </>
    );
  }
}

SentryService.init();

ReactDom.render(
  <AppProviders>
    <App />
  </AppProviders>,
  document.getElementById("root")
);
