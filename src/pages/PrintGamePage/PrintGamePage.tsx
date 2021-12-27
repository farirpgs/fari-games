import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MarkdownContent } from "../../components/MarkdownContent/MarkdownContent";
import {
  DocumentParser,
  IDocument,
} from "../../domains/documents/DocumentParser";

export function PrintGamePage() {
  const params = useParams<{
    author: string;
    game: string;
    language: string | undefined;
  }>();
  const gameSlug = params.game as string;
  const author = params.author as string;
  const language = params.language as string;
  const [game, setGame] = useState<IDocument>();

  useEffect(() => {
    load();
    async function load() {
      const result = await DocumentParser.getDocument({
        author: author,
        slug: gameSlug,
        language: language,
      });

      setGame(result);
    }
  }, [gameSlug, author]);

  return (
    <>
      <Container maxWidth="xl">
        {game && (
          <div>
            <Grid container spacing={4}>
              <Grid item sm={12} md={9} lg={6}>
                <MarkdownContent
                  headingUppercase={game.frontMatter.headingUppercase}
                  headingFont={game?.frontMatter?.headingFont}
                  textFont={game?.frontMatter?.textFont}
                  highlightFont={game?.frontMatter?.highlightFont}
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
