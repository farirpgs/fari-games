import { css } from "@emotion/css";

import React, { useEffect, useState } from "react";
import { useLocation, useRouteMatch } from "react-router-dom";
import { ReactRouterLink } from "../components/ReactRouterLink";
import { Game, IChapter } from "../domains/games/Game";
import { Helmet } from "react-helmet-async";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import { useTheme } from "@material-ui/core/styles";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import Stack from "@material-ui/core/Stack";
import Collapse from "@material-ui/core/Collapse";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";

export function GamePage() {
  const match = useRouteMatch<{ game: string; chapter: string }>();
  const gameSlug = match.params.game;
  const chapterSlug = match.params.chapter;
  const [chapter, setChapter] = useState<IChapter>();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = useTheme();

  const location = useLocation();
  useEffect(() => {
    if (!location.hash) {
      return;
    }
    const scrollElement = document.querySelector(location.hash);
    // scroll to the element if it exists
    if (scrollElement) {
      scrollElement.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.hash]);

  useEffect(() => {
    load();
    async function load() {
      const result = await Game.getChapter(gameSlug, chapterSlug);

      setChapter(result);
    }
  }, [gameSlug, chapterSlug]);

  return (
    <>
      <Container maxWidth="xl">
        {chapter && (
          <div>
            <Helmet>
              <title>{chapter.data?.title}</title>
            </Helmet>
            <Grid container spacing={4}>
              <Hidden mdDown>
                <Grid item xs={3}>
                  {renderChapters()}
                </Grid>
              </Hidden>
              <Grid item sm={12} md={6}>
                {renderContent()}
              </Grid>
              <Hidden mdDown>
                <Grid item xs={3}>
                  {renderToc()}
                </Grid>
              </Hidden>
            </Grid>
            {renderMobileMenuBar()}
            <Drawer
              anchor="bottom"
              open={mobileMenuOpen}
              classes={{
                paper: css({
                  top: "5rem !important",
                }),
              }}
              onClose={() => {
                setMobileMenuOpen(false);
              }}
            >
              <Box p="2rem">{renderChapters()}</Box>
            </Drawer>
          </div>
        )}
      </Container>
    </>
  );

  function renderMobileMenuBar() {
    return (
      <Hidden mdUp>
        <Box
          p=".5rem"
          className={css({
            position: "fixed",
            bottom: "0",
            left: "0",
            width: "100%",
            boxShadow: theme.shadows[24],
            background: theme.palette.background.paper,
          })}
        >
          <Grid container spacing={1} alignItems="center" wrap="nowrap">
            <Grid item>
              <IconButton
                color="inherit"
                onClick={() => {
                  setMobileMenuOpen(true);
                }}
              >
                <MenuIcon color="inherit" />
              </IconButton>
            </Grid>
            <Grid item zeroMinWidth>
              <Box>Chapters</Box>
            </Grid>
          </Grid>
        </Box>
      </Hidden>
    );
  }

  function renderChapters() {
    return (
      <>
        <div
          className={css({
            background: theme.palette.background.paper,
            boxShadow: theme.shadows[1],
            maxHeight: "calc(100vh)",
            position: "sticky",
            top: "0px",
            overflowY: "auto",
          })}
        >
          {chapter?.data?.image && (
            <div
              className={css({
                width: "100%",
                height: "8rem",
                zIndex: -1,
                background: `url("${chapter?.data?.image}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              })}
            ></div>
          )}
          <MenuList dense>
            {chapter?.navigation.map((navigationItem, index) => {
              const open =
                chapterSlug === navigationItem.path ||
                (index === 0 && !chapterSlug);
              return [
                <MenuItem
                  key={index}
                  component={ReactRouterLink}
                  to={`/game/${gameSlug}/${navigationItem.path}`}
                  onClick={() => {
                    setMobileMenuOpen(false);
                  }}
                  className={css({
                    width: "100%",
                    display: "flex",
                    color: "inherit",
                    textDecoration: "none",
                  })}
                  selected={open}
                >
                  <div
                    className={css({
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                    })}
                  >
                    <Typography noWrap component="span">
                      <span>{navigationItem.text}</span>
                    </Typography>
                  </div>
                </MenuItem>,
                <Collapse in={open}>
                  {navigationItem.children.map((child, index) => {
                    return (
                      <MenuItem
                        selected={open}
                        key={index}
                        component={ReactRouterLink}
                        onClick={() => {
                          setMobileMenuOpen(false);
                        }}
                        to={`/game/${gameSlug}/${child.path}`}
                        className={css({
                          color: "inherit",
                          textDecoration: "none",
                          backgroundColor: open ? "red" : "inherit",
                        })}
                      >
                        <Typography
                          noWrap
                          className={css({
                            paddingLeft: "1rem",
                          })}
                        >
                          {child.text}
                        </Typography>
                      </MenuItem>
                    );
                  })}
                </Collapse>,
              ];
            })}
          </MenuList>
        </div>
      </>
    );
  }

  function renderToc() {
    return (
      <>
        <div
          className={css({
            maxHeight: "calc(100vh)",
            position: "sticky",
            padding: "4rem 0 ",
            top: "0px",
            overflowY: "auto",
          })}
        >
          <Stack spacing={1}>
            {chapter?.chapterToc.map((tocItem, index) => {
              const indentationLevel = tocItem.level - 2;
              return (
                <div key={index}>
                  <a
                    href={`#${tocItem.id}`}
                    className={css({
                      color: theme.palette.text.secondary,
                      textDecoration: "none",
                      display: "flex",
                      marginLeft: indentationLevel * 2 + "rem",
                    })}
                  >
                    <Typography noWrap>{tocItem.text}</Typography>
                  </a>
                </div>
              );
            })}
          </Stack>
        </div>
      </>
    );
  }

  function renderContent() {
    return (
      <>
        <div>
          {renderPreviousNextNavigation()}
          <div
            className={css({
              "& blockquote": {
                margin: "0",
                padding: ".5rem 1rem",
                background: theme.palette.background.paper,
                boxShadow: theme.shadows[1],
                borderLeft: `4px solid ${theme.palette.secondary.main}`,
              },
              "& pre": {
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              },
              "& p": {
                ...(theme.typography.body1 as any),
              },
              "& a": {
                color: theme.palette.secondary.main,
                fontWeight: "bold",
                "&:visited": {
                  color: theme.palette.secondary.main,
                },
              },
              "& .anchor, .anchor:visited": {
                color: theme.palette.text.secondary,
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                  color: theme.palette.text.primary,
                },
              },
              "& h1": {
                ...(theme.typography.h1 as any),
              },
              "& h2": {
                ...(theme.typography.h2 as any),
              },
              "& h3": {
                ...(theme.typography.h3 as any),
              },
              "& h4": {
                ...(theme.typography.h4 as any),
              },
              "& h5": {
                ...(theme.typography.h5 as any),
              },
              "& h6": {
                ...(theme.typography.h6 as any),
              },
            })}
            dangerouslySetInnerHTML={{
              __html: chapter?.html ?? "",
            }}
          />
          <Box mt="1rem" />
          <Divider />
          <Box mb="1rem" />
          {renderPreviousNextNavigation()}
        </div>
      </>
    );
  }

  function renderPreviousNextNavigation() {
    if (!chapter) {
      return null;
    }

    return (
      <Grid container spacing={1} justifyContent="space-between">
        <Grid item>
          {chapter.previousChapter.id && (
            <ReactRouterLink
              to={`/game/${gameSlug}/${chapter.previousChapter.id}`}
              className={css({ color: "inherit", textDecoration: "none" })}
            >
              <Button color="inherit">« {chapter.previousChapter.text}</Button>
            </ReactRouterLink>
          )}
        </Grid>
        <Grid item>
          {chapter.next.id && (
            <ReactRouterLink
              to={`/game/${gameSlug}/${chapter.next.id}`}
              className={css({ color: "inherit", textDecoration: "none" })}
            >
              <Button color="inherit"> {chapter.next.text} »</Button>
            </ReactRouterLink>
          )}
        </Grid>
      </Grid>
    );
  }
}
