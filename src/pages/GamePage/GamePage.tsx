import { css } from "@emotion/css";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/core/Autocomplete";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import NativeSelect from "@material-ui/core/NativeSelect";
import Stack from "@material-ui/core/Stack";
import { useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { MarkdownContent } from "../../components/MarkdownContent/MarkdownContent";
import { Page } from "../../components/Page/Page";
import { ReactRouterLink } from "../../components/ReactRouterLink/ReactRouterLink";
import { track } from "../../domains/analytics/track";
import {
  GameDocumentParser,
  IChapter,
  ISearchIndex,
  ISidebarItem,
} from "../../domains/games/GameDocumentParser";
import { AppLinksFactory } from "../../domains/links/AppLinksFactory";
import { ItchIcon } from "../../icons/ItchIcon";

export function GamePage() {
  const match = useRouteMatch<{
    author: string;
    game: string;
    chapter: string;
    language: string | undefined;
  }>();

  const author = match.params.author;
  const gameSlug = match.params.game;
  const chapterSlug = match.params.chapter;
  const language = match.params.language;

  const [autocompleteOpen, setAutocompleteOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [chapter, setChapter] = useState<IChapter>();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openedCategory, setOpenedCategory] = useState<string>();

  const theme = useTheme();
  const history = useHistory();
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
      const result = await GameDocumentParser.getChapter({
        author: author,
        game: gameSlug,
        chapterId: chapterSlug,
        language: language,
      });

      setChapter(result);
    }
  }, [author, gameSlug, chapterSlug, language]);

  return (
    <>
      <Page
        title={`${chapter?.currentChapter.text} - ${chapter?.frontMatter?.title}`}
        box={{ mt: "2rem" }}
        container={{ maxWidth: "xl" }}
      >
        {chapter && (
          <Fade in>
            <div>
              <Helmet>
                {chapter.frontMatter?.fonts?.split(",").map((font) => {
                  return <link key={font} href={font} rel="stylesheet" />;
                })}
              </Helmet>
              <Grid container spacing={4}>
                <Hidden mdDown>
                  <Grid item xs={3}>
                    {renderSideBar()}
                  </Grid>
                </Hidden>
                <Grid item sm={12} md={9} lg={6}>
                  {renderContent()}
                  {renderWidget()}
                </Grid>
                <Hidden lgDown>
                  <Grid item xs={3}>
                    {renderSearchBar()}
                    {renderLanguageBar()}
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
                <Box p="2rem">{renderSideBar()}</Box>
              </Drawer>
            </div>
          </Fade>
        )}
      </Page>
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

  function renderSideBar() {
    if (!chapter) {
      return null;
    }

    const shouldRenderSidebarFooter =
      chapter?.frontMatter?.version || chapter?.frontMatter?.itch;

    return (
      <>
        {renderImage()}

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
          <MenuList dense>
            {renderCategoriesSideBarItems()}
            {renderRootSideBarItems()}
          </MenuList>
          {shouldRenderSidebarFooter && (
            <>
              <Divider />
              <Box p=".5rem 1.5rem">
                {chapter.frontMatter?.version && (
                  <Box
                    pb=".5rem"
                    className={css({
                      fontFamily: "monospace",
                    })}
                  >
                    v{chapter.frontMatter?.version}
                  </Box>
                )}
                {chapter.frontMatter?.itch && (
                  <Box>
                    <Button
                      variant="outlined"
                      size="small"
                      color="info"
                      component={"a"}
                      href={chapter.frontMatter?.itch}
                      onClick={() => {
                        track("buy_itch", {
                          game: gameSlug,
                        });
                      }}
                      target="_blank"
                      className={css({
                        textTransform: "none",
                      })}
                      endIcon={<ItchIcon />}
                    >
                      Itch.io
                    </Button>
                  </Box>
                )}
              </Box>
            </>
          )}
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

  function renderImage() {
    if (!chapter?.frontMatter?.image) {
      return null;
    }

    return (
      <Box mt="1rem">
        <div
          className={css({
            width: "100%",
            height: "10rem",
            zIndex: -1,
            background: `url("${chapter?.frontMatter?.image}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          })}
        />
        {/* <img
          src={chapter?.frontMatter?.image}
          className={css({
            width: "100%",
            height: "auto",
            // zIndex: -1,
            // background: `url("${chapter?.frontMatter?.image}")`,
            // backgroundSize: "cover",
            // backgroundPosition: "center",
            // backgroundRepeat: "no-repeat",
          })}
        /> */}
      </Box>
    );
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
    const selected = chapterSlug === renderProps.item.path;
    const title = renderProps.item.title;
    return (
      <MenuItem
        key={renderProps.key}
        component={ReactRouterLink}
        onClick={() => {
          setMobileMenuOpen(false);
        }}
        selected={selected}
        to={AppLinksFactory.makeGameChapterLink(
          author,
          gameSlug,
          renderProps.item.path
        )}
        className={css({
          color: "inherit",
          textDecoration: "none",
          backgroundColor: false ? "red" : "inherit",
          borderLeft: selected
            ? `4px solid ${theme.palette.secondary.main}`
            : `4px solid transparent`,
        })}
      >
        <Typography
          noWrap
          className={css({
            paddingLeft: renderProps.paddingLeft,
            fontWeight: selected
              ? theme.typography.fontWeightBold
              : theme.typography.fontWeightRegular,
          })}
        >
          {title}
        </Typography>
      </MenuItem>
    );
  }

  function renderSearchBar() {
    const sortedOptions = chapter?.searchIndexes ?? [];
    // chapter?.searchIndexes.sort((a, b) => {
    //   return -b.group.localeCompare(a.group);
    // }) ?? [];

    return (
      <>
        <Autocomplete
          open={autocompleteOpen}
          onOpen={() => {
            setAutocompleteOpen(true);
          }}
          onClose={() => {
            setAutocompleteOpen(false);
          }}
          freeSolo
          size="small"
          autoHighlight
          filterOptions={createFilterOptions({ limit: 20 })}
          options={sortedOptions}
          groupBy={(index) => index.group ?? ""}
          getOptionLabel={(index) => index.label}
          inputValue={search}
          openOnFocus
          onChange={(event, newValue) => {
            const path = (newValue as ISearchIndex).path;
            if (path) {
              setAutocompleteOpen(false);
              history.push(
                AppLinksFactory.makeGameChapterLink(author, gameSlug, path)
              );
              track("search", {
                search_term: search,
                game: gameSlug,
                index: path,
              });
            }
          }}
          onInputChange={(e, value, reason) => {
            if (reason === "input") {
              setSearch(value);
            } else {
              setSearch("");
            }
          }}
          renderOption={(props, index) => (
            <React.Fragment key={index.id}>
              <MenuItem
                {...props}
                onClick={() => {
                  setAutocompleteOpen(false);
                  history.push(
                    AppLinksFactory.makeGameChapterLink(
                      author,
                      gameSlug,
                      index.path
                    )
                  );
                  track("search", {
                    search_term: search,
                    game: gameSlug,
                    index: index.path,
                  });
                }}
              >
                <Box pl=".5rem" width="100%">
                  <Grid container alignItems="center">
                    <Grid item xs={12}>
                      <Typography
                        variant="body1"
                        noWrap
                        color="textPrimary"
                        className={css({
                          fontSize: "1rem",
                        })}
                      >
                        {index.label}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        variant="body2"
                        noWrap
                        color="textSecondary"
                        className={css({
                          fontSize: ".8rem",
                        })}
                      >
                        {index.preview}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </MenuItem>
            </React.Fragment>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              className={css({ width: "100%", margin: "0" })}
              label="Search"
              margin="normal"
              variant="standard"
            />
          )}
        />
      </>
    );
  }

  function renderLanguageBar() {
    if (!chapter?.frontMatter?.languages) {
      return null;
    }
    const languages = chapter?.frontMatter?.languages.split(",");

    const languageLabels: Record<string, string> = {
      en: "English",
      "pt-br": "Português",
    };

    return (
      <>
        <Box mt=".5rem" display="flex" justifyContent="flex-end">
          <NativeSelect
            defaultValue={language}
            onChange={(event) => {
              const language = event.target.value;
              history.push(
                AppLinksFactory.makeGameLink(author, gameSlug, language)
              );
            }}
          >
            {languages.map((language, index) => {
              return (
                <option key={index} value={language}>
                  {languageLabels[language] ?? language}
                </option>
              );
            })}
          </NativeSelect>
        </Box>
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
                      marginLeft: `${indentationLevel}rem`,
                    })}
                  >
                    <Typography
                      noWrap
                      className={css({
                        fontSize: ".85rem",
                      })}
                    >
                      {tocItem.text}
                    </Typography>
                  </a>
                </div>
              );
            })}
          </Stack>
        </div>
      </>
    );
  }

  function renderTime() {
    const wordsPerMinute = 130;
    const numberOfWordsInChapter = chapter?.numberOfWordsInChapter ?? 0;
    const time = Math.round(numberOfWordsInChapter / wordsPerMinute);
    return (
      <Box position="absolute" right="0">
        <Typography variant="caption" color={theme.palette.text.secondary}>
          {time > 0 ? time : 1} min read
        </Typography>
      </Box>
    );
  }
  function renderAuthor() {
    if (!chapter?.frontMatter?.author) {
      return null;
    }

    return (
      <Box position="absolute" left="0">
        <Typography variant="caption" color={theme.palette.text.secondary}>
          By {chapter?.frontMatter?.author}
        </Typography>
      </Box>
    );
  }

  function renderContent() {
    return (
      <>
        <div className={css({ position: "relative" })}>
          {renderPreviousNextNavigation()}
          {renderAuthor()}
          {renderTime()}
          <MarkdownContent
            headingFont={chapter?.frontMatter?.headingFont}
            textFont={chapter?.frontMatter?.textFont}
            highlightFont={chapter?.frontMatter?.highlightFont}
            headingUppercase={chapter?.frontMatter?.headingUppercase}
            gameSlug={gameSlug}
            style={chapter?.style}
            html={chapter?.html}
          />
          <Box mt="1rem" />
          <Divider />
          <Box mb="1rem" />
          {renderPreviousNextNavigation()}
        </div>
      </>
    );
  }

  function renderWidget() {
    return null;
    // if (!chapter?.frontMatter.widget) {
    //   return null;
    // }
    // return (
    //   <Box display="flex" justifyContent="center" mt="2rem">
    //     <div
    //       dangerouslySetInnerHTML={{
    //         __html: chapter?.frontMatter.widget,
    //       }}
    //     />
    //   </Box>
    // );
  }

  function renderPreviousNextNavigation() {
    if (!chapter) {
      return null;
    }

    return (
      <Grid
        container
        spacing={1}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          {chapter.previousChapter.id && (
            <ReactRouterLink
              to={AppLinksFactory.makeGameChapterLink(
                author,
                gameSlug,
                chapter.previousChapter.id
              )}
              className={css({ color: "inherit", textDecoration: "none" })}
              onClick={() => {
                track("go_to_previous", {
                  game: gameSlug,
                  index: chapter.previousChapter.id,
                });
              }}
            >
              <Button color="inherit">« {chapter.previousChapter.text}</Button>
            </ReactRouterLink>
          )}
        </Grid>
        <Grid item>
          {chapter.next.id && (
            <ReactRouterLink
              to={AppLinksFactory.makeGameChapterLink(
                author,
                gameSlug,
                chapter.next.id
              )}
              className={css({ color: "inherit", textDecoration: "none" })}
              onClick={() => {
                track("go_to_next", {
                  game: gameSlug,
                  index: chapter.next.id,
                });
              }}
            >
              <Button color="inherit"> {chapter.next.text} »</Button>
            </ReactRouterLink>
          )}
        </Grid>
      </Grid>
    );
  }
}

export default GamePage;
