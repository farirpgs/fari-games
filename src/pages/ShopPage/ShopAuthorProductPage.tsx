import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Container from "@mui/material/Container";
import Fade from "@mui/material/Fade";
import Link from "@mui/material/Link";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React from "react";
import { useParams } from "react-router";
import { Link as ReactRouterLink } from "react-router-dom";
import { shopProducts } from "../../../data/shop/shopProducts";
import { Page } from "../../components/Page/Page";
import { AppLinksFactory } from "../../domains/links/AppLinksFactory";
import { MoreByAuthor } from "./components/MoreByAuthor";
import { ProductDetails } from "./components/ProductDetails";
import { ShopCategory } from "./components/ShopCategory";

export function ShopAuthorProductPage() {
  const params = useParams<{ authorSlug: string; productSlug: string }>();

  const selectedGame = shopProducts.find((g) => {
    return params.authorSlug === g.author.slug && params.productSlug === g.slug;
  });

  const selectedGameTags = selectedGame?.tags ?? [];

  const theme = useTheme();

  return (
    <>
      <Page
        box={{ mt: "2rem" }}
        title={`${selectedGame?.name} by ${selectedGame?.author.name}`}
        image={selectedGame?.image}
        description={`${selectedGame?.description}`}
      >
        <Fade in>
          <Container>
            <Box mb="2rem">
              <Breadcrumbs aria-label="breadcrumb">
                <Link
                  color="inherit"
                  to={AppLinksFactory.makeHomeLink()}
                  component={ReactRouterLink}
                >
                  Browse
                </Link>
                <Link
                  color="inherit"
                  to={AppLinksFactory.makeAuthorLink(selectedGame)}
                  component={ReactRouterLink}
                >
                  {selectedGame?.author.name}
                </Link>
                <Typography color="textPrimary">
                  {selectedGame?.name}
                </Typography>
              </Breadcrumbs>
            </Box>
            <ProductDetails
              alignItems="flex-start"
              justifyContent="space-between"
              padding="2rem 0"
              product={selectedGame}
              color={theme.palette.text.primary}
            />
            <ShopCategory
              excludeProduct={selectedGame}
              name={`You Might Also Like... `}
              tags={selectedGameTags.join(", ")}
              count={4}
            />
            <MoreByAuthor
              variant="h3"
              authorSlug={selectedGame?.author.slug}
              count={4}
              excludeProduct={selectedGame}
            />
          </Container>
        </Fade>
      </Page>
    </>
  );
}

export default ShopAuthorProductPage;
