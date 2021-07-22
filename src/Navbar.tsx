import React from "react";

import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import { css } from "@emotion/css";

import { ReactRouterLink } from "./components/ReactRouterLink";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { Breakpoint, useTheme } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import { useContext } from "react";
import { SettingsContext } from "./contexts/SettingsContext";

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
        marginBottom: "2rem",
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
            <Grid item>
              <ReactRouterLink
                to="/game/charge-rpg"
                className={css({
                  color: "inherit",
                  textDecoration: "none",
                })}
              >
                <Button color="inherit">Charge RPG</Button>
              </ReactRouterLink>
            </Grid>
          </Grid>
          <Grid item>
            <IconButton
              className={css({ color: "inherit" })}
              onClick={() => {
                const newThemeMode =
                  settingsManager.state.themeMode === "dark" ? "light" : "dark";
                settingsManager.actions.setThemeMode(newThemeMode);
              }}
            >
              <>
                {settingsManager.state.themeMode === "dark" ? (
                  <Brightness7Icon />
                ) : (
                  <Brightness4Icon />
                )}
              </>
            </IconButton>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
