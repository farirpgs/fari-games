import { css } from "@emotion/css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MenuIcon from "@mui/icons-material/Menu";
import TocIcon from "@mui/icons-material/Toc";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import NativeSelect from "@mui/material/NativeSelect";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory, useLocation } from "react-router-dom";
import { Delays } from "../../constants/delays";
import { track } from "../../domains/analytics/track";
import {
  IChapter,
  ISearchIndex,
  ISidebarItem,
} from "../../domains/documents/DocumentParser";
import { MarkdownContent } from "../MarkdownContent/MarkdownContent";
import { ReactRouterLink } from "../ReactRouterLink/ReactRouterLink";

export function Document(props: {
  chapter: IChapter | undefined;
  language: string | undefined;
  slug: string | undefined;
  onLanguageChange(language: string): void;
  makeChapterLink(chapterId: string): string;
  renderSideBarHeader?(): React.ReactNode;
  renderSideBarFooter?(): React.ReactNode;
  renderFooter?(): React.ReactNode;
}) {
  const theme = useTheme();
  const history = useHistory();
  const location = useLocation();

  const [autocompleteOpen, setAutocompleteOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [mobileChapterMenuOpen, setMobileChapterMenuOpen] = useState(false);
  const [mobileTocMenuOpen, setMobileTocMenuOpen] = useState(false);
  const [openedCategory, setOpenedCategory] = useState<string>();

  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
  const isLgDown = useMediaQuery(theme.breakpoints.down("lg"));
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    if (!location.hash) {
      return;
    }
    const scrollElement = document.querySelector(
      `[id="${location.hash.replace("#", "")}"]`
    );

    let timeout: number;
    if (scrollElement) {
      timeout = setTimeout(() => {
        scrollElement.scrollIntoView({ behavior: "smooth" });
      }, Delays.scrollToHeadingDelay);
    }

    return () => {
      clearTimeout(timeout);
    };
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
          {!isMdDown && (
            <Grid item xs={3}>
              {renderSideBar()}
            </Grid>
          )}
          <Grid item sm={12} md={9} lg={6}>
            {renderContent()}
          </Grid>
          {!isLgDown && (
            <Grid item xs={3}>
              {renderSearchBar()}
              {renderLanguageBar()}
              {renderToc()}
            </Grid>
          )}
        </Grid>
        {renderMobileMenuBar()}
        <Drawer
          anchor="left"
          open={mobileChapterMenuOpen}
          classes={{
            paper: css({
              width: "80vw",
            }),
          }}
          onClose={() => {
            setMobileChapterMenuOpen(false);
          }}
        >
          <Box>{renderSideBar()}</Box>
        </Drawer>
        <Drawer
          anchor="right"
          open={mobileTocMenuOpen}
          classes={{
            paper: css({
              width: "400px",
              maxWidth: "80vw",
            }),
          }}
          onClose={() => {
            setMobileTocMenuOpen(false);
          }}
        >
          <Box p="1rem">
            {renderSearchBar()}
            {renderLanguageBar()}
            {renderToc()}
          </Box>
        </Drawer>
      </div>
    </Fade>
  );

  function renderMobileMenuBar() {
    if (isMdUp) {
      return null;
    }
    return (
      <Box
        displayPrint="none"
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
        <Grid
          container
          spacing={1}
          alignItems="center"
          wrap="nowrap"
          justifyContent="space-between"
        >
          <Grid item>
            <Button
              color="inherit"
              onClick={() => {
                setMobileChapterMenuOpen(true);
              }}
              startIcon={<MenuIcon color="inherit" />}
            >
              Chapters
            </Button>
          </Grid>
          <Grid item>
            <Button
              color="inherit"
              onClick={() => {
                setMobileTocMenuOpen(true);
              }}
              endIcon={<TocIcon color="inherit" />}
            >
              Table of Content
            </Button>
          </Grid>
        </Grid>
      </Box>
    );
  }

  function renderSideBar() {
    const shouldRenderChapters = chapter.numberOfChapters > 1;

    return (
      <>
        <Box
          displayPrint="none"
          className={css({
            background: theme.palette.background.paper,
            boxShadow: theme.shadows[1],
            maxHeight: "calc(100vh)",
            position: "sticky",
            top: "0px",
            overflowY: "auto",
          })}
        >
          {props.renderSideBarHeader?.()}
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
          {props.renderSideBarFooter?.()}
        </Box>
      </>
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
                <Grid item xs zeroMinWidth>
                  <Typography
                    noWrap
                    component="span"
                    className={css({
                      display: "block",
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
                      transform: open ? "rotate(90deg)" : "rotate(0deg)",
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
          setMobileChapterMenuOpen(false);
        }}
        selected={selected}
        to={props.makeChapterLink(renderProps.item.path)}
        className={css({
          color: "inherit",
          textDecoration: "none",
          backgroundColor: "inherit",
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
              setMobileTocMenuOpen(false);
              track("search", {
                search_term: search,
                game: props.slug,
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
                  setMobileTocMenuOpen(false);
                  track("search", {
                    search_term: search,
                    game: props.slug,
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
      fr: "Français",
      de: "Deutsch",
    };

    return (
      <>
        <Box mt=".5rem" display="flex" justifyContent="flex-end">
          <NativeSelect
            defaultValue={props.language}
            onChange={(event) => {
              const language = event.target.value;
              setMobileTocMenuOpen(false);
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
            <a
              className={css({
                color: theme.palette.text.secondary,
                fontWeight: theme.typography.fontWeightBold,
                textDecoration: "none",
                cursor: "pointer",
                display: "flex",
                marginLeft: `0`,
              })}
              onClick={(e) => {
                e.preventDefault();
                setMobileTocMenuOpen(false);
                window.scrollTo({
                  top: 0,
                });
              }}
            >
              <Typography
                noWrap
                className={css({
                  fontSize: ".85rem",
                })}
              >
                {chapter.currentChapter.text}
              </Typography>
            </a>
            {chapter?.chapterToc.map((tocItem, index) => {
              const indentationLevel = tocItem.level - 1;
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
                    onClick={() => {
                      setMobileTocMenuOpen(false);
                    }}
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
      <Box position="absolute" right="0" displayPrint="none">
        <Typography variant="caption" color={theme.palette.text.secondary}>
          {time > 0 ? time : 1} min read
        </Typography>
      </Box>
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
          <Box mb="1rem" />
          {props.renderFooter?.()}
          {false && renderDevModeInfo()}
        </div>
      </>
    );
  }

  function renderDevModeInfo() {
    if (import.meta.env.PROD) {
      return null;
    }
    return (
      <pre
        className={css({
          whiteSpace: "pre-wrap",
        })}
      >
        <p>title: {chapter.currentChapter.text}</p>
        <p>description: {chapter.currentChapter.description}</p>
      </pre>
    );
  }

  function renderSmallPreviousNextNavigation() {
    return (
      <Box displayPrint="none">
        <Grid
          container
          spacing={1}
          justifyContent="space-between"
          alignItems="center"
          wrap="nowrap"
        >
          <Grid
            item
            xs={6}
            className={css({
              display: "flex",
              justifyContent: "flex-start",
            })}
          >
            {chapter.previousChapter?.id && (
              <ReactRouterLink
                to={props.makeChapterLink(chapter.previousChapter?.id)}
                className={css({
                  color: "inherit",
                  textDecoration: "none",
                  textAlign: "left",
                })}
                onClick={() => {
                  track("go_to_previous", {
                    game: props.slug,
                    index: chapter.previousChapter?.id,
                  });
                }}
              >
                <Button color="inherit">
                  « {chapter.previousChapter?.text}
                </Button>
              </ReactRouterLink>
            )}
          </Grid>
          <Grid
            item
            xs={6}
            className={css({
              display: "flex",
              justifyContent: "flex-end",
            })}
          >
            {chapter.nextChapter?.id && (
              <ReactRouterLink
                to={props.makeChapterLink(chapter.nextChapter?.id)}
                className={css({
                  color: "inherit",
                  textDecoration: "none",
                  textAlign: "right",
                })}
                onClick={() => {
                  track("go_to_next", {
                    game: props.slug,
                    index: chapter.nextChapter?.id,
                  });
                }}
              >
                <Button color="inherit">{chapter.nextChapter?.text} »</Button>
              </ReactRouterLink>
            )}
          </Grid>
        </Grid>
      </Box>
    );
  }

  function renderPreviousNextNavigation() {
    return (
      <Box displayPrint="none">
        <Grid
          container
          spacing={1}
          alignItems="stretch"
          className={css({
            color: theme.palette.text.disabled,
          })}
        >
          {chapter.previousChapter?.id && (
            <Grid item xs={12} md={chapter.nextChapter?.id ? 6 : 12}>
              <ReactRouterLink
                to={props.makeChapterLink(chapter.previousChapter?.id)}
                className={css({
                  color: "inherit",
                  textDecoration: "none",
                  height: "100%",
                })}
                onClick={() => {
                  track("go_to_previous", {
                    game: props.slug,
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
            <Grid item xs={12} md={chapter.previousChapter?.id ? 6 : 12}>
              <ReactRouterLink
                to={props.makeChapterLink(chapter.nextChapter?.id)}
                className={css({
                  color: "inherit",
                  textDecoration: "none",
                  height: "100%",
                })}
                onClick={() => {
                  track("go_to_next", {
                    game: props.slug,
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
      </Box>
    );
  }
}
