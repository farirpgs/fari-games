import Grid from "@mui/material/Grid";
import React from "react";
import { IShopProductWithAuthor } from "../../../../data/shop/types/IShopProduct";
import { ProductCard } from "./ProductCard";

export function ProductList(props: {
  products: Array<IShopProductWithAuthor>;
}) {
  return (
    <Grid flexWrap="wrap" container spacing={1}>
      {props.products.map((product, i) => {
        return (
          <Grid item key={i} xs={12} sm={6} md={4} lg={3} xl={3}>
            <ProductCard product={product} />
          </Grid>
        );
      })}
    </Grid>
  );
}
