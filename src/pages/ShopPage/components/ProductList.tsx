import Grid from "@material-ui/core/Grid";
import React from "react";
import { IShopProduct } from "../../../../data/shop/types/IShopProduct";
import { ProductCard } from "./ProductCard";

export function ProductList(props: { products: Array<IShopProduct> }) {
  return (
    <Grid flexWrap="wrap" container spacing={1}>
      {props.products.map((product, i) => {
        return (
          <Grid item key={i} xs={6} sm={6} md={4} lg={3} xl={3}>
            <ProductCard product={product} />
          </Grid>
        );
      })}
    </Grid>
  );
}
