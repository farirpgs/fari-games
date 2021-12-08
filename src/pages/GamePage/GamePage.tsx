import { css } from "@emotion/css";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { shopProducts } from "../../../data/shop/shopProducts";
import { Document } from "../../components/Document/Document";
import { Page } from "../../components/Page/Page";
import { ReactRouterLink } from "../../components/ReactRouterLink/ReactRouterLink";
import {
  DocumentParser,
  IChapter,
} from "../../domains/documents/DocumentParser";
import { AppLinksFactory } from "../../domains/links/AppLinksFactory";
import { ProductLicense } from "../ShopPage/components/ProductLicense";
import { ProductLinks } from "../ShopPage/components/ProductLinks";

export function GamePage() {
  const match = useRouteMatch<{
    author: string;
    game: string;
    chapter: string;
    language: string | undefined;
  }>();

  const authorSlug = match.params.author;
  const gameSlug = match.params.game;
  const chapterSlug = match.params.chapter;
  const language = match.params.language;
  const product = shopProducts.find(
    (p) => p.slug === gameSlug && p.author.slug === authorSlug
  );

  const [chapter, setChapter] = useState<IChapter>();

  const theme = useTheme();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    load();
    async function load() {
      try {
        const result = await DocumentParser.getChapter({
          author: authorSlug,
          slug: gameSlug,
          chapterId: chapterSlug,
          language: language,
        });

        if (!result.html) {
          throw new Error("No html found");
        }

        setChapter(result);
      } catch (error) {
        console.error(error);
        history.replace(`/not-found?path=${location.pathname}`);
      }
    }
  }, [authorSlug, gameSlug, chapterSlug, language]);

  return (
    <>
      <Page
        title={`${chapter?.currentChapter.text} - ${product?.name}`}
        description={`${chapter?.currentChapter.description}`}
        image={product?.image}
        box={{ mt: "2rem" }}
        container={{ maxWidth: "xl" }}
      >
        <Document
          slug={gameSlug}
          renderSideBarHeader={() => {
            return (
              <Box px="1rem" pt="1rem">
                <Box>
                  <Typography variant="h4">{product?.name}</Typography>
                </Box>
                <Box mb=".5rem">
                  <ReactRouterLink
                    className={css({
                      color: theme.palette.text.secondary,
                    })}
                    to={AppLinksFactory.makeAuthorLink(product)}
                  >
                    <Typography
                      variant="caption"
                      className={css({
                        fontSize: "1rem",
                      })}
                    >
                      By {product?.author.name}
                    </Typography>
                  </ReactRouterLink>
                </Box>

                <Box>
                  <ProductLicense size="small" product={product} />
                </Box>
              </Box>
            );
          }}
          renderSideBarFooter={() => {
            return (
              <Box px="1rem" py="1rem">
                <Box mb=".5rem">
                  <ProductLinks product={product} />
                </Box>
                <Box mb=".5rem">
                  <img
                    src={product?.image}
                    className={css({
                      width: "100%",
                      height: "auto",
                    })}
                  />
                </Box>
              </Box>
            );
          }}
          renderFooter={() => {
            if (!product?.footer) {
              return null;
            }
            return (
              <>
                <Box mb=".5rem" whiteSpace="pre-line">
                  <Typography variant="caption">{product?.footer}</Typography>
                </Box>
                <Box mb=".5rem" whiteSpace="pre-line">
                  <Button
                    component="a"
                    startIcon={<EditIcon />}
                    color="secondary"
                    target="_blank"
                    rel="noreferrer"
                    href={`https://github.com/fariapp/fari-games/tree/main/data/game-documents/${authorSlug}/${gameSlug}.md#:~:text=${chapter?.currentChapter.originalText}`}
                  >
                    Edit this Page
                  </Button>
                </Box>
              </>
            );
          }}
          chapter={chapter}
          language={language}
          onLanguageChange={(newLanguage) => {
            history.push(
              AppLinksFactory.makeGameLink({
                author: authorSlug,
                game: gameSlug,
                language: newLanguage,
              })
            );
          }}
          makeChapterLink={(chapterId) => {
            return AppLinksFactory.makeGameChapterLink({
              author: authorSlug,
              game: gameSlug,
              chapter: chapterId,
              language: language,
            });
          }}
        />
      </Page>
    </>
  );
}

export default GamePage;
