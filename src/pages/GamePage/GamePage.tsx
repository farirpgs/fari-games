import { css } from "@emotion/css";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { shopProducts } from "../../../data/shop/shopProducts";
import { Document } from "../../components/Document/Document";
import { Page } from "../../components/Page/Page";
import {
  DocumentParser,
  IChapter,
} from "../../domains/documents/DocumentParser";
import { AppLinksFactory } from "../../domains/links/AppLinksFactory";
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
          authorLink={AppLinksFactory.makeAuthorLink(product)}
          slug={gameSlug}
          title={product?.name}
          author={product?.author.name}
          renderDocInfo={() => {
            return (
              <>
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
