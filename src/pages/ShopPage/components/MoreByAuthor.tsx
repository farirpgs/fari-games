import { css } from "@emotion/css";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { shopProducts } from "../../../../data/shop/shopProducts";
import { IShopProduct } from "../../../../data/shop/types/IShopProduct";
import { ShopLink } from "../domains/ShopLink";

export function MoreByAuthor(props: {
  authorSlug: string | undefined;
  count?: number;
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
    <>
      <Box>
        <Typography variant="h6">More by {firstGame.author}</Typography>
      </Box>

      <Grid container spacing={2}>
        {gamesToDisplay.map((game, i) => {
          return (
            <Grid item key={i}>
              <ReactRouterLink
                to={ShopLink.makeGameLink(game)}
                className={css({
                  position: "relative",
                  cursor: "pointer",
                })}
              >
                <div
                  className={css({
                    height: "12rem",
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
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
