import Box from "@material-ui/core/Box";
import Typography, { TypographyProps } from "@material-ui/core/Typography";
import React from "react";
import { shopProducts } from "../../../../data/shop/shopProducts";
import { IShopProduct } from "../../../../data/shop/types/IShopProduct";
import { ProductList } from "./ProductList";

export function MoreByAuthor(props: {
  authorSlug: string | undefined;
  count?: number;
  variant?: TypographyProps["variant"];
  excludeProduct?: IShopProduct | undefined;
}) {
  const authorsGame = shopProducts.filter((g) => {
    return (
      props.authorSlug === g.authorSlug && g.slug !== props.excludeProduct?.slug
    );
  });

  const [firstGame] = authorsGame;

  const gamesToDisplay = authorsGame.slice(0, props.count);

  if (!firstGame) {
    return null;
  }

  return (
    <Box mb="2rem">
      <Box>
        <Typography variant={props.variant} gutterBottom>
          By {firstGame.author}
        </Typography>
      </Box>

      <ProductList products={gamesToDisplay} />
    </Box>
  );
}
