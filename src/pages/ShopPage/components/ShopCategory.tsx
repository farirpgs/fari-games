import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import shuffle from "lodash/shuffle";
import React, { useMemo } from "react";
import { shopProducts } from "../../../../data/shop/shopProducts";
import { IShopProduct } from "../../../../data/shop/types/IShopProduct";
import { ProductList } from "./ProductList";

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
  count: number;
}) {
  const gamesForTags = useGames(props.tags, props.excludeProduct);
  const gamesToDisplay = gamesForTags.slice(0, props.count);

  if (gamesToDisplay.length === 0) {
    return null;
  }

  return (
    <Box mb="2rem">
      <Box>
        <Typography variant="h3" gutterBottom>
          {props.name}
        </Typography>
      </Box>

      <ProductList products={gamesToDisplay} />
    </Box>
  );
}
