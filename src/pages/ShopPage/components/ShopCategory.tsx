import { css } from "@emotion/css";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import shuffle from "lodash/shuffle";
import React, { useMemo } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Settings } from "react-slick";
import { shopProducts } from "../../../../data/shop/shopProducts";
import { IShopProduct } from "../../../../data/shop/types/IShopProduct";
import { AppLinksFactory } from "../../../domains/links/AppLinksFactory";
import { BetterSlider } from "./BetterSlider";

export function useGames(
  tags: string | undefined,
  excludeProduct?: IShopProduct | undefined
) {
  return useMemo(() => {
    const tagsList = tags?.split(",").map((t) => t.trim()) ?? [];

    const gamesMatchingTags = shopProducts.filter((g) => {
      return g.tags.some((t) => tagsList.includes(t));
    });
    const gamesWithoutExcluded = gamesMatchingTags.filter(
      (g) =>
        g.author !== excludeProduct?.author && g.name !== excludeProduct?.name
    );

    const numberOfItemsToReturn = 10;
    const gamesToReturn = gamesWithoutExcluded.slice(0, numberOfItemsToReturn);
    return shuffle(gamesToReturn);

    // const gamesGroupedByRating = gamesWithoutExcluded.reduce<
    //   Record<string, Array<IShopProduct>>
    // >((acc, curr) => {
    //   const rating = curr.rating.toString();
    //   const list = acc[rating] ?? [];
    //   return {
    //     ...acc,
    //     [rating]: [...list, curr],
    //   };
    // }, {});

    // const sortedRatings = arraySort(Object.keys(gamesGroupedByRating), [
    //   // (rating) => true,
    //   // (rating) => ({ direction: "desc", value: rating }),
    // ]);
    // const shuffledGamesGroupedByRating = sortedRatings.flatMap((rating) => {
    //   return shuffle(gamesGroupedByRating[rating]);
    // });
    // return shuffledGamesGroupedByRating.slice(0, numberOfItemsToReturn);
  }, [tags]);
}

export function ShopCategory(props: {
  name: string;
  tags: string;
  excludeProduct?: IShopProduct | undefined;
  count?: number;
}) {
  const gamesForTags = useGames(props.tags, props.excludeProduct);
  const gamesToDisplay = gamesForTags.slice(0, props.count);

  const productSliderSettings: Settings = {
    autoplay: false,
    dots: false,
    infinite: false,
    centerMode: false,
    speed: 500,
    slidesToScroll: 2,
    variableWidth: true,
  };

  if (gamesToDisplay.length === 0) {
    return null;
  }

  return (
    <Box mb="2rem">
      <Box>
        <Typography variant="h4" gutterBottom>
          {props.name}
        </Typography>
      </Box>

      <BetterSlider
        height="12rem"
        settings={productSliderSettings}
        className={css({
          "& .slick-track": {
            margin: "0 -.5rem", // for product gap
          },
        })}
      >
        {gamesToDisplay.map((game, i) => {
          return (
            <React.Fragment key={i}>{renderProductCard(game)}</React.Fragment>
          );
        })}
      </BetterSlider>
    </Box>
  );

  function renderProductCard(game: IShopProduct) {
    const gap = ".5rem";
    return (
      <ReactRouterLink
        to={AppLinksFactory.makeProductLink(game)}
        className={css({
          position: "relative",
          cursor: "pointer",
        })}
      >
        <div
          className={css({
            width: "100%",
            height: "100%",
            position: "absolute",
            top: "0",
            left: "0",
            // "background": `linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5)),url(${game.image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",

            "&:after": {
              backdropFilter: "blur(16px)",
              content: '""',
              position: "absolute",
              width: "100%",
              height: "100%",
              pointerEvents: "none" /* make the overlay click-through */,
            },
          })}
        />
        <div
          className={css({
            height: "12rem",
            margin: `0 ${gap}`,
            display: "flex",
            justifyContent: "center",
            position: "relative",
          })}
        >
          <img
            src={game.image}
            className={css({
              height: "12rem",
              width: "auto",
              margin: "0 auto",
              position: "relative",
              zIndex: 1,
            })}
          />
        </div>
      </ReactRouterLink>
    );
  }
}
