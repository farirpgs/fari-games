import { css } from "@emotion/css";
import Chip, { ChipProps } from "@mui/material/Chip";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { IShopProductWithAuthor } from "../../../../data/shop/types/IShopProduct";

export function ProductType(props: {
  product: IShopProductWithAuthor | undefined;
  size?: ChipProps["size"];
}) {
  const theme = useTheme();

  if (!props.product?.type) {
    return null;
  }

  return (
    <Chip
      label={props.product.type}
      size={props.size}
      color="default"
      className={css({
        background: theme.palette.primary.main,
        color: theme.palette.getContrastText(theme.palette.primary.main),
        fontWeight: theme.typography.fontWeightBold,
      })}
    />
  );
}
