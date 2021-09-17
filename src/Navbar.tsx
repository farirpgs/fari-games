import { css } from "@emotion/css";
import ComputerIcon from "@mui/icons-material/Computer";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Hidden from "@mui/material/Hidden";
import IconButton from "@mui/material/IconButton";
import { Breakpoint, useTheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { ReactRouterLink } from "./components/ReactRouterLink/ReactRouterLink";
import { SettingsContext } from "./contexts/SettingsContext";
import { track } from "./domains/analytics/track";
import { AppLinksFactory } from "./domains/links/AppLinksFactory";

export function Navbar() {
  const theme = useTheme();
  const location = useLocation();
  const settingsManager = useContext(SettingsContext);
  const maxWidth: Breakpoint | undefined = location.pathname.startsWith("/game")
    ? "xl"
    : undefined;
  return (
    <Box
      className={css({
        width: "100%",
        background: "#2d436e",
        color: "#fff",
        height: "6rem",
        boxShadow: theme.shadows[4],
      })}
    >
      <Container maxWidth={maxWidth} className={css({ height: "6rem" })}>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
          wrap="nowrap"
          className={css({
            height: "100%",
          })}
        >
          <Grid item container spacing={1} alignItems="center">
            <Grid item>
              <ReactRouterLink
                to="/"
                className={css({ color: "inherit", textDecoration: "none" })}
              >
                <Button color="inherit">
                  <Grid container spacing={1} wrap="nowrap" alignItems="center">
                    <Grid item>
                      <img
                        src="/images/app.png"
                        title="Fari Games"
                        className={css({
                          height: "3rem",
                        })}
                      />
                    </Grid>
                    <Grid item>
                      <Typography
                        noWrap
                        className={css({
                          fontWeight: theme.typography.fontWeightBold,
                        })}
                      >
                        Fari | Games
                      </Typography>
                    </Grid>
                  </Grid>
                </Button>
              </ReactRouterLink>
            </Grid>
            <Hidden smDown>
              <Grid item>
                <ReactRouterLink
                  to={AppLinksFactory.makeGameLink({
                    author: "fari-games",
                    game: "charge-rpg",
                  })}
                  className={css({
                    color: "inherit",
                    textDecoration: "none",
                  })}
                >
                  <Button color="inherit">Charge RPG ⚡ </Button>
                </ReactRouterLink>
              </Grid>
            </Hidden>
          </Grid>
          <Hidden smDown>
            <Grid item>
              <Tooltip title="Use Theme from System Preferences">
                <IconButton
                  className={css({ color: "inherit" })}
                  onClick={() => {
                    settingsManager.actions.setThemeMode(undefined);
                    track("update_theme", {
                      mode: "system",
                    });
                  }}
                >
                  <>
                    <ComputerIcon />
                  </>
                </IconButton>
              </Tooltip>
            </Grid>
          </Hidden>
          <Grid item>
            <Tooltip
              title={
                settingsManager.state.themeMode === "dark"
                  ? "Light Mode"
                  : "Dark Mode"
              }
            >
              <IconButton
                className={css({ color: "inherit" })}
                onClick={() => {
                  const newThemeMode =
                    settingsManager.state.themeMode === "dark"
                      ? "light"
                      : "dark";
                  settingsManager.actions.setThemeMode(newThemeMode);
                  track("update_theme", {
                    mode: newThemeMode,
                  });
                }}
              >
                <>
                  {settingsManager.state.themeMode === "dark" ? (
                    <LightModeIcon />
                  ) : (
                    <DarkModeIcon />
                  )}
                </>
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
