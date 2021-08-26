import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { GameDocumentParser, IGame } from "../domains/games/GameDocumentParser";
import { Helmet } from "react-helmet-async";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { useTheme } from "@material-ui/core/styles";
import { MarkdownContent } from "../components/MarkdownContent/MarkdownContent";

export default function PrintGamePage() {
  const match = useRouteMatch<{ game: string }>();
  const gameSlug = match.params.game;
  const [game, setGame] = useState<IGame>();

  useEffect(() => {
    load();
    async function load() {
      const result = await GameDocumentParser.getGameContent(gameSlug);

      setGame(result);
    }
  }, [gameSlug]);

  return (
    <>
      <Container maxWidth="xl">
        {game && (
          <div>
            <Helmet>
              <title>{game.data?.title}</title>
            </Helmet>
            <Grid container spacing={4}>
              <Grid item sm={12} md={9} lg={6}>
                <MarkdownContent
                  gameSlug={gameSlug}
                  content={game?.dom.innerHTML}
                />
              </Grid>
            </Grid>
          </div>
        )}
      </Container>
    </>
  );
}
