import { css } from "@emotion/css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MenuIcon from "@mui/icons-material/Menu";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Grid";
import Hidden from "@mui/material/Hidden";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import NativeSelect from "@mui/material/NativeSelect";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory, useLocation } from "react-router-dom";
import { track } from "../../domains/analytics/track";
import {
  IChapter,
  ISearchIndex,
  ISidebarItem
} from "../../domains/documents/DocumentParser";
import { MarkdownContent } from "../MarkdownContent/MarkdownContent";
import { ReactRouterLink } from "../ReactRouterLink/ReactRouterLink";

export function Document(props: {
  gameSlug: string;
  chapter: IChapter | undefined;
  language: string | undefined;
  authorLink: string;
  onLanguageChange(language: string): void;
  makeChapterLink(chapterId: string): string;
  renderLinks?(): void;
}) {
  const [autocompleteOpen, setAutocompleteOpen] = useState(false);
  const [search, setSearch] = useState("");
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
  }, [location.hash, props.chapter]);

  useEffect(() => {
    if (props.chapter) {
      const categories = Object.keys(props.chapter.sidebar.categories);
      categories.forEach((categoryName) => {
        const sidebarItems = props.chapter?.sidebar.categories[categoryName];
        const open = sidebarItems?.some(
          (i) => i.path === props.chapter?.currentChapter.id
        );
        if (open) {
          setOpenedCategory(categoryName);
        }
      });
    }
  }, [props.chapter]);

  if (!props.chapter) {
    return null;
  }

  const chapter = props.chapter as IChapter;

  return (
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
    const shouldRenderChapters = chapter.numberOfChapters > 1;

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
          <Box px="1rem" mt="1rem">
            <Box>{renderTitle()}</Box>
            <Box pb=".5rem">{renderAuthor()}</Box>
          </Box>
          <Box px="1rem">
            <Divider />
          </Box>
          {shouldRenderChapters && (
            <>
              <Box>
                <MenuList dense>
                  {renderCategoriesSideBarItems()}
                  {renderRootSideBarItems()}
                </MenuList>
              </Box>
              <Box px="1rem">
                <Divider />
              </Box>
            </>
          )}
          <Box px="1rem" py="1rem">
            {props.renderLinks?.()}
            <Box mb=".5rem">{renderImage()}</Box>
            <Box>{renderVersion()}</Box>
          </Box>
        </div>
      </>
    );
  }

  function renderVersion() {
    if (!chapter?.frontMatter?.version) {
      return null;
    }
    return (
      <Box
        className={css({
          fontFamily: "monospace",
        })}
      >
        v{chapter?.frontMatter?.version}
      </Box>
    );
  }

  function renderRootSideBarItems() {
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
      <Box>
        <img
          src={chapter?.frontMatter?.image}
          className={css({
            width: "100%",
            height: "auto",
          })}
        />
      </Box>
    );
  }

  function renderCategoriesSideBarItems() {
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
    const selected = chapter?.currentChapter.id === renderProps.item.path;
    const title = renderProps.item.title;
    return (
      <MenuItem
        key={renderProps.key}
        component={ReactRouterLink}
        onClick={() => {
          setMobileMenuOpen(false);
        }}
        selected={selected}
        to={props.makeChapterLink(renderProps.item.path)}
        className={css({
          color: "inherit",
          textDecoration: "none",
          backgroundColor:  "inherit",
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
              history.push(props.makeChapterLink(path));
              track("search", {
                search_term: search,
                game: props.gameSlug,
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
          renderOption={(renderProps, index) => (
            <React.Fragment key={index.id}>
              <MenuItem
                {...renderProps}
                onClick={() => {
                  setAutocompleteOpen(false);
                  history.push(props.makeChapterLink(index.path));
                  track("search", {
                    search_term: search,
                    game: props.gameSlug,
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
            defaultValue={props.language}
            onChange={(event) => {
              const language = event.target.value;
              props.onLanguageChange(language);
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

  function renderTitle() {
    if (!chapter?.frontMatter?.title) {
      return null;
    }
    return <Typography variant="h4">{chapter?.frontMatter?.title}</Typography>;
  }

  function renderAuthor() {
    if (!chapter?.frontMatter?.author) {
      return null;
    }

    return (
      <ReactRouterLink
        className={css({
          color: theme.palette.text.secondary,
        })}
        to={props.authorLink}
      >
        <Typography
          variant="caption"
          className={css({
            fontSize: "1rem",
          })}
        >
          By {chapter?.frontMatter?.author}
        </Typography>
      </ReactRouterLink>
    );
  }

  function renderContent() {
    return (
      <>
        <div className={css({ position: "relative" })}>
          {renderSmallPreviousNextNavigation()}
          {renderTime()}
          <MarkdownContent
            headingFont={chapter?.frontMatter?.headingFont}
            textFont={chapter?.frontMatter?.textFont}
            highlightFont={chapter?.frontMatter?.highlightFont}
            headingUppercase={chapter?.frontMatter?.headingUppercase}
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

  function renderSmallPreviousNextNavigation() {
    return (
      <Grid
        container
        spacing={1}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          {chapter.previousChapter?.id && (
            <ReactRouterLink
              to={props.makeChapterLink(chapter.previousChapter?.id)}
              className={css({ color: "inherit", textDecoration: "none" })}
              onClick={() => {
                track("go_to_previous", {
                  game: props.gameSlug,
                  index: chapter.previousChapter?.id,
                });
              }}
            >
              <Button color="inherit">« {chapter.previousChapter?.text}</Button>
            </ReactRouterLink>
          )}
        </Grid>
        <Grid item>
          {chapter.nextChapter?.id && (
            <ReactRouterLink
              to={props.makeChapterLink(chapter.nextChapter?.id)}
              className={css({ color: "inherit", textDecoration: "none" })}
              onClick={() => {
                track("go_to_next", {
                  game: props.gameSlug,
                  index: chapter.nextChapter?.id,
                });
              }}
            >
              <Button color="inherit">{chapter.nextChapter?.text} »</Button>
            </ReactRouterLink>
          )}
        </Grid>
      </Grid>
    );
  }

  function renderPreviousNextNavigation() {
    return (
      <Grid
        container
        spacing={1}
        // justifyContent="space-between"
        alignItems="stretch"
        className={css({
          color: theme.palette.text.disabled,
        })}
      >
        {chapter.previousChapter?.id && (
          <Grid item xs={chapter.nextChapter?.id ? 6 : 12}>
            <ReactRouterLink
              to={props.makeChapterLink(chapter.previousChapter?.id)}
              className={css({
                color: "inherit",
                textDecoration: "none",
                height: "100%",
              })}
              onClick={() => {
                track("go_to_previous", {
                  game: props.gameSlug,
                  index: chapter.previousChapter?.id,
                });
              }}
            >
              <Button
                fullWidth
                variant="outlined"
                startIcon={
                  <ArrowBackIcon
                    className={css({
                      width: "1.5rem",
                      height: "1.5rem",
                    })}
                  />
                }
                className={css({
                  height: "100%",
                  padding: "1.5rem 1rem",
                  textAlign: "right",
                })}
                color="inherit"
                size="large"
              >
                <Grid container>
                  <Grid item xs={12}>
                    <Typography color="textSecondary" variant="caption">
                      Previous
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography color="textPrimary" fontWeight="bold">
                      {chapter.previousChapter?.text}
                    </Typography>
                  </Grid>
                </Grid>
              </Button>
            </ReactRouterLink>
          </Grid>
        )}
        {chapter.nextChapter?.id && (
          <Grid item xs={chapter.previousChapter?.id ? 6 : 12}>
            <ReactRouterLink
              to={props.makeChapterLink(chapter.nextChapter?.id)}
              className={css({
                color: "inherit",
                textDecoration: "none",
                height: "100%",
              })}
              onClick={() => {
                track("go_to_next", {
                  game: props.gameSlug,
                  index: chapter.nextChapter?.id,
                });
              }}
            >
              <Button
                fullWidth
                variant="outlined"
                endIcon={
                  <ArrowForwardIcon
                    className={css({
                      width: "1.5rem",
                      height: "1.5rem",
                    })}
                  />
                }
                className={css({
                  height: "100%",
                  padding: "1.5rem 1rem",
                  textAlign: "left",
                })}
                color="inherit"
                size="large"
              >
                <Grid container>
                  <Grid item xs={12}>
                    <Typography color="textSecondary" variant="caption">
                      Next
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography color="textPrimary" fontWeight="bold">
                      {chapter.nextChapter?.text}
                    </Typography>
                  </Grid>
                </Grid>
              </Button>
            </ReactRouterLink>
          </Grid>
        )}
      </Grid>
    );
  }
}
