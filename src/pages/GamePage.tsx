import { css } from "@emotion/css";

import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import React, { useEffect, useState } from "react";
import { useLocation, useRouteMatch } from "react-router-dom";
import { ReactRouterLink } from "../components/ReactRouterLink";
import {
  Game,
  GameSettings,
  IChapter,
  ISidebarItem,
} from "../domains/games/Game";
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
  const [openedCategory, setOpenedCategory] = useState<string>();
  const theme = useTheme();

  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      return;
    }
    const scrollElement = document.querySelector(location.hash);

    if (scrollElement) {
      scrollElement.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.hash, chapter]);

  useEffect(() => {
    if (chapter) {
      const categories = Object.keys(chapter.sidebar.categories);

      categories.forEach((categoryName) => {
        const sidebarItems = chapter.sidebar.categories[categoryName];
        const open = sidebarItems.some((i) => i.path === chapterSlug);
        if (open) {
          setOpenedCategory(categoryName);
        }
      });
    }
  }, [chapter]);

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
              <Grid item sm={12} md={9} lg={6}>
                {renderContent()}
              </Grid>
              <Hidden lgDown>
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
                  top: "5rem",
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
    if (!chapter) {
      return null;
    }

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
            />
          )}
          <MenuList dense>
            {renderCategoriesSideBarItems()}
            {renderRootSideBarItems()}
          </MenuList>
        </div>
      </>
    );
  }

  function renderRootSideBarItems() {
    if (!chapter) {
      return null;
    }
    return chapter.sidebar.root.map((sidebarItem, index) => {
      return renderSidebarItem({
        key: index,
        item: sidebarItem,
        paddingLeft: "0",
      });
    });
  }

  function renderCategoriesSideBarItems() {
    if (!chapter) {
      return null;
    }

    return Object.keys(chapter.sidebar.categories).map(
      (categoryName, index) => {
        const sidebarItems = chapter.sidebar.categories[categoryName];
        const open = openedCategory === categoryName;

        return [
          <MenuItem
            key={index}
            onClick={() => {
              setOpenedCategory((prev) => {
                return prev === categoryName ? undefined : categoryName;
              });
            }}
            className={css({
              width: "100%",
              display: "flex",
              color: "inherit",
              textDecoration: "none",
            })}
          >
            <div
              className={css({
                width: "100%",
                display: "flex",
                flexDirection: "column",
              })}
            >
              <Grid
                container
                spacing={1}
                justifyContent="space-between"
                wrap="nowrap"
                alignItems="center"
              >
                <Grid item>
                  <Typography
                    noWrap
                    component="span"
                    className={css({
                      // fontWeight: theme.typography.fontWeightBold,
                      // textTransform: "uppercase",
                      // fontFamily: GameSettings[gameSlug].fontFamilies.join(","),
                    })}
                  >
                    {categoryName}
                  </Typography>
                </Grid>
                <Grid item>
                  <ArrowForwardIosIcon
                    htmlColor={theme.palette.text.secondary}
                    className={css({
                      width: "1rem",
                      height: "1rem",
                      transform: false ? "rotate(90deg)" : "rotate(0deg)",
                      transition: theme.transitions.create("transform"),
                    })}
                  />
                </Grid>
              </Grid>
            </div>
          </MenuItem>,
          // eslint-disable-next-line react/jsx-key
          <Collapse in={open}>
            {sidebarItems.map((sidebarItem, index) => {
              return renderSidebarItem({
                key: index,
                item: sidebarItem,
                paddingLeft: ".5rem",
              });
            })}
          </Collapse>,
        ];
      }
    );
  }

  function renderSidebarItem(renderProps: {
    key: any;
    item: ISidebarItem;
    paddingLeft: string;
  }) {
    return (
      <MenuItem
        key={renderProps.key}
        component={ReactRouterLink}
        onClick={() => {
          setMobileMenuOpen(false);
        }}
        selected={chapterSlug === renderProps.item.path}
        to={`/game/${gameSlug}/${renderProps.item.path}`}
        className={css({
          color: "inherit",
          textDecoration: "none",
          backgroundColor: false ? "red" : "inherit",
          borderLeft:
            chapterSlug === renderProps.item.path
              ? `4px solid ${theme.palette.secondary.main}`
              : `4px solid transparent`,
          // : `4px solid ${theme.palette.divider}`,
        })}
      >
        <Typography
          noWrap
          className={css({
            paddingLeft: renderProps.paddingLeft,
            // fontFamily: GameSettings[gameSlug].fontFamilies.join(","),
          })}
        >
          {renderProps.item.title}
        </Typography>
      </MenuItem>
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
                      marginLeft: `${indentationLevel * 2}rem`,
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
          <Helmet>{GameSettings[gameSlug].head}</Helmet>
          <div
            className={css({
              "& blockquote": {
                margin: "0",
                padding: ".5rem 1rem",
                background: theme.palette.background.paper,
                boxShadow: theme.shadows[1],
                borderLeft: `4px solid ${theme.palette.secondary.main}`,
              },
              "& code": {
                // background: "rgba(255, 229, 100, 0.4)",
                // fontFamily: "inherit",
                fontFamily: GameSettings[gameSlug].fontFamilies.join(","),
                fontWeight: theme.typography.fontWeightBold,
                // fontSize: "1.05em",
              },
              "& pre": {
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                background: theme.palette.action.selected,
                padding: "1rem",
                "& code": {
                  background: "none",
                },
              },
              "& strong": {
                // fontFamily: GameSettings[gameSlug].fontFamilies.join(","),
              },
              "& > p > em:first-child": {
                // display: "block",
                textAlign: "center",
                // padding: "1rem",
                // borderRadius: "4px",
                // border: `1px solid ${theme.palette.divider}`,
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
              "& img": {
                maxWidth: "50%",
                margin: "0 auto",
                display: "block",
              },
              "& h1": {
                ...(theme.typography.h1 as any),
                fontFamily: GameSettings[gameSlug].fontFamilies.join(","),
              },
              "& h2": {
                ...(theme.typography.h2 as any),
                fontFamily: GameSettings[gameSlug].fontFamilies.join(","),
              },
              "& h3": {
                ...(theme.typography.h3 as any),
                fontFamily: GameSettings[gameSlug].fontFamilies.join(","),
              },
              "& h4": {
                ...(theme.typography.h4 as any),
                fontFamily: GameSettings[gameSlug].fontFamilies.join(","),
              },
              "& h5": {
                ...(theme.typography.h5 as any),
                fontFamily: GameSettings[gameSlug].fontFamilies.join(","),
              },
              "& h6": {
                ...(theme.typography.h6 as any),
                fontFamily: GameSettings[gameSlug].fontFamilies.join(","),
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
