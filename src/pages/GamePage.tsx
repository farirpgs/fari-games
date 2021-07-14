import { css } from "@emotion/css";

import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { ReactRouterLink } from "../components/ReactRouterLink";
import { Game, IChapter } from "../domains/games/Game";
import { Helmet } from "react-helmet-async";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useTheme } from "@material-ui/core/styles";

export function GamePage() {
  const match = useRouteMatch<{ game: string; chapter: string }>();
  const gameSlug = match.params.game;
  const chapterSlug = match.params.chapter;
  const [chapter, setChapter] = useState<IChapter>();
  const theme = useTheme();

  useEffect(() => {
    load();
    async function load() {
      const result = await Game.getChapter(gameSlug, chapterSlug);

      setChapter(result);
    }
  }, [gameSlug, chapterSlug]);

  return (
    <>
      <Container>
        {chapter && (
          <div>
            <Helmet>
              <title>{chapter.data?.title}</title>
            </Helmet>
            {chapter.data?.image && (
              <Box mb="1rem">
                <img
                  src={chapter.data?.image}
                  className={css({
                    width: "100%",
                  })}
                />
              </Box>
            )}
            {renderNavBar()}
            <div
              className={css({
                "& blockquote": {
                  margin: "0",
                  padding: ".5rem 1rem",
                  background: theme.palette.background.paper,
                  borderLeft: `4px solid ${theme.palette.divider}`,
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
                __html: chapter?.html,
              }}
            />
            <Box mt="1rem" />
            <Divider />
            <Box mb="1rem" />
            {renderNavBar()}
          </div>
        )}
      </Container>
    </>
  );

  function renderNavBar() {
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
