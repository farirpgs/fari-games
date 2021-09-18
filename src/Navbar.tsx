import { css } from "@emotion/css";
import ComputerIcon from "@mui/icons-material/Computer";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ForumIcon from "@mui/icons-material/Forum";
import GitHubIcon from "@mui/icons-material/GitHub";
import LightModeIcon from "@mui/icons-material/LightMode";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Hidden from "@mui/material/Hidden";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Popover from "@mui/material/Popover";
import { Breakpoint, useTheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { ReactRouterLink } from "./components/ReactRouterLink/ReactRouterLink";
import { SettingsContext } from "./contexts/SettingsContext";
import { track } from "./domains/analytics/track";
import { AppLinksFactory } from "./domains/links/AppLinksFactory";

export function Navbar() {
  const theme = useTheme();
  const location = useLocation();
  const settingsManager = useContext(SettingsContext);
  const maxWidth: Breakpoint | undefined = location.pathname.includes("/srds")
    ? "xl"
    : undefined;

  return (
    <Box
      className={css({
        width: "100%",
        background: theme.palette.primary.main,
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
                <NavLink
                  to={AppLinksFactory.makeGameLink({
                    author: "fari-games",
                    game: "charge-rpg",
                  })}
                >
                  Charge RPG ⚡
                </NavLink>
              </Grid>
              <Grid item>
                <NavLinkCategory
                  label={"Community"}
                  subNav={[
                    {
                      label: "Community",
                      links: [
                        {
                          to: { pathname: "https://fari.app/discord" },
                          label: "Join the Discord Server",
                          icon: <ForumIcon />,
                          target: "_blank",
                        },
                        {
                          to: {
                            pathname:
                              "https://www.patreon.com/bePatron?u=43408921",
                          },
                          label: "Become a Patron",
                          icon: <ThumbUpIcon />,
                          target: "_blank",
                        },
                        {
                          to: {
                            pathname: "https://github.com/fariapp/fari-games",
                          },
                          label: "Contribute on GitHub",
                          icon: <GitHubIcon />,
                          target: "_blank",
                        },
                      ],
                    },
                  ]}
                />
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

function NavLink(props: { to: string; children: React.ReactNode }) {
  const theme = useTheme();
  return (
    <Button
      color="inherit"
      component={ReactRouterLink}
      to={props.to}
      className={css({
        "&:hover": {
          background: theme.palette.primary.light,
        },
      })}
    >
      {props.children}
    </Button>
  );
}

function NavLinkCategory(props: {
  label: JSX.Element | string;
  subNav: Array<{
    label: JSX.Element | string;
    links: Array<{
      label: JSX.Element | string;
      to: string | { pathname: string };
      target?: "_blank";
      tooltip?: string;
      icon?: JSX.Element;
    }>;
  }>;
  children?: JSX.Element;
}) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const open = Boolean(anchorEl);

  function handleOpenSubNav(event: React.MouseEvent<HTMLButtonElement>) {
    if (!open) {
      setAnchorEl(event.currentTarget);
    } else {
      handleCloseSubNav();
    }
  }

  function handleCloseSubNav() {
    setAnchorEl(null);
  }

  return (
    <>
      <div>
        <Button
          onClick={handleOpenSubNav}
          color="inherit"
          className={css({
            "&:hover": {
              background: theme.palette.primary.light,
            },
          })}
          endIcon={<ExpandMoreIcon />}
        >
          {props.label}
        </Button>
      </div>

      <Hidden mdDown>
        <Popover
          open={open}
          onClose={handleCloseSubNav}
          anchorEl={anchorEl}
          TransitionProps={{ timeout: theme.transitions.duration.shortest }}
          className={css({
            marginTop: "1rem",
          })}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Box px="1.5rem" py=".5rem" minWidth="200px">
            <Box>
              <Box>{renderSubNav()}</Box>
            </Box>
          </Box>
        </Popover>
      </Hidden>

      <Hidden mdUp>
        <Collapse in={open}>
          <Box mt=".5rem">
            <Paper elevation={2}>
              <Box p="1rem">
                <Box>{renderSubNav()}</Box>
              </Box>
            </Paper>
          </Box>
        </Collapse>
      </Hidden>
    </>
  );

  function renderSubNav() {
    return (
      <>
        {props.subNav?.map((category, categoryIndex) => {
          return (
            <Box key={categoryIndex} mt=".5rem" mb="1.5rem">
              <Box display="flex">
                <Typography
                  fontWeight="bold"
                  color="textSecondary"
                  className={css({
                    fontSize: ".8rem",
                    textTransform: "uppercase",
                  })}
                  variant="caption"
                >
                  {category.label}
                </Typography>
              </Box>
              {category.links.map((link, linkIndex) => {
                return (
                  <Box key={linkIndex} my=".5rem">
                    <Grid
                      container
                      wrap="nowrap"
                      spacing={1}
                      alignItems="center"
                    >
                      {link.icon && (
                        <Grid item>
                          <Box
                            display="flex"
                            className={css({
                              "& *": {
                                color: theme.palette.secondary.main,
                              },
                            })}
                          >
                            {link.icon}
                          </Box>
                        </Grid>
                      )}
                      <Grid item>
                        <Tooltip title={link.tooltip ?? ""}>
                          <div
                            className={css({
                              textAlign: "left",
                            })}
                          >
                            <ReactRouterLink
                              to={link.to}
                              target={link.target}
                              className={css({
                                color: theme.palette.secondary.main,
                                fontWeight: theme.typography.fontWeightBold,
                                fontSize: "1rem",
                                textDecoration: "none",
                                "&:hover": {
                                  textDecoration: "underline",
                                },
                              })}
                            >
                              {link.label}
                            </ReactRouterLink>
                          </div>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </Box>
                );
              })}
            </Box>
          );
        })}
      </>
    );
  }
}
