import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useRouteMatch } from "react-router-dom";
import { MarkdownContent } from "../../components/MarkdownContent/MarkdownContent";
import {
  GameDocumentParser,
  IGameContent,
} from "../../domains/games/GameDocumentParser";

export function PrintGamePage() {
  const match = useRouteMatch<{ author: string; game: string }>();
  const gameSlug = match.params.game;
  const author = match.params.author;
  const [game, setGame] = useState<IGameContent>();

  useEffect(() => {
    load();
    async function load() {
      const result = await GameDocumentParser.getGameContent(author, gameSlug);

      setGame(result);
    }
  }, [gameSlug, author]);

  return (
    <>
      <Container maxWidth="xl">
        {game && (
          <div>
            <Helmet>
              <title>{game.frontMatter?.title}</title>
            </Helmet>
            <Grid container spacing={4}>
              <Grid item sm={12} md={9} lg={6}>
                <MarkdownContent
                  headingFont={game?.frontMatter?.headingFont}
                  textFont={game?.frontMatter?.textFont}
                  highlightFont={game?.frontMatter?.highlightFont}
                  gameSlug={gameSlug}
                  style={game.style}
                  html={game?.dom.innerHTML}
                />
              </Grid>
            </Grid>
          </div>
        )}
      </Container>
    </>
  );
}

export default PrintGamePage;
