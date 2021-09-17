import { css } from "@emotion/css";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { IShopProduct } from "../../../../data/shop/types/IShopProduct";
import { AppLinksFactory } from "../../../domains/links/AppLinksFactory";

export function ProductCard(props: { product: IShopProduct }) {
  const theme = useTheme();
  return (
    <div
      className={css({
        marginBottom: "1rem",
      })}
    >
      <ReactRouterLink
        to={AppLinksFactory.makeProductLink(props.product)}
        className={css({
          cursor: "pointer",
          position: "relative",
          display: "inline-block",
          alignItems: "center",
          width: "100%",
          height: "16rem",
        })}
      >
        <div
          className={css({
            width: "100%",
            height: "100%",
            position: "absolute",
            top: "0",
            left: "0",
            background: `linear-gradient(90deg, rgba(0, 0, 0, .3) 0%, rgba(0, 0, 0, .5) 100%), url(${props.product.image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            "&:after": {
              backdropFilter: "blur(16px)",
              content: '""',
              position: "absolute",
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            },
          })}
        />

        <img
          src={props.product.image}
          className={css({
            margin: "0 auto",
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "contain",
            position: "relative",
            padding: ".5rem .5rem .5rem .5rem",
          })}
        />
      </ReactRouterLink>
      <div>
        <ReactRouterLink
          to={AppLinksFactory.makeProductLink(props.product)}
          className={css({
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline",
              textDecorationColor: theme.palette.text.primary,
            },
          })}
        >
          <Typography variant="h6" color="textPrimary">
            {props.product.name}
          </Typography>
        </ReactRouterLink>
      </div>
      <div>
        <Typography variant="button" color="textSecondary">
          {props.product.author}
        </Typography>
      </div>
      <div>
        <Typography variant="caption" color="textSecondary">
          {props.product.description}
        </Typography>
      </div>
    </div>
  );
}
