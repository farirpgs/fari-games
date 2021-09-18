import { css } from "@emotion/css";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { shopProducts } from "../../../data/shop/shopProducts";
import { Page } from "../../components/Page/Page";
import { useLazyState } from "../../hooks/useLazyState/useLazyState";
import { ProductList } from "../ShopPage/components/ProductList";

export function SearchPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const defaultSearchQuery = params.get("query") || "";
  const [searchQuery, setSearchQuery] = useState(defaultSearchQuery);
  const [inputSearchQuery, setInputSearchQuery] = useLazyState({
    delay: 500,
    value: defaultSearchQuery,
    onChange: (newQuery) => {
      setSearchQuery(newQuery);
    },
  });

  const productsToShow = shopProducts.filter((p) => {
    const searchLower = searchQuery.toLowerCase();
    const nameLower = p.name.toLowerCase();
    const authorLower = p.author.toLowerCase();
    const tags = p.tags.join(" ").toLowerCase();

    if (searchLower.length === 0) {
      return false;
    }

    const match =
      nameLower.includes(searchLower) ||
      authorLower.includes(searchLower) ||
      tags.includes(searchLower);

    return match;
  });

  const shouldRenderErrorMessage =
    productsToShow.length === 0 && searchQuery.length > 0;

  return (
    <Page
      title="Find a Game"
      description=""
      box={{ mt: "2rem" }}
      container={{ maxWidth: "lg" }}
    >
      <Box mb="2rem">
        <TextField
          fullWidth
          InputProps={{
            className: css({
              fontSize: "1.5rem",
              borderRadius: "8px",
            }),
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon
                  className={css({
                    width: "2.5rem",
                    height: "2.5rem",
                  })}
                />
              </InputAdornment>
            ),
          }}
          placeholder="Search..."
          value={inputSearchQuery}
          onChange={(event) => {
            setInputSearchQuery(event.target.value);
          }}
        />
      </Box>

      <Box>
        <ProductList products={productsToShow} />

        {shouldRenderErrorMessage && (
          <Typography>
            No results found for &quot;{inputSearchQuery}&quot;.
          </Typography>
        )}
      </Box>
    </Page>
  );
}

export default SearchPage;
