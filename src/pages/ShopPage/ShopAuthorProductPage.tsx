import Box from "@material-ui/core/Box";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Container from "@material-ui/core/Container";
import Fade from "@material-ui/core/Fade";
import Link from "@material-ui/core/Link";
import { useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import shuffle from "lodash/shuffle";
import React from "react";
import { useRouteMatch } from "react-router";
import { Link as ReactRouterLink } from "react-router-dom";
import { shopProducts } from "../../../data/shop/shopProducts";
import { Page } from "../../components/Page/Page";
import { AppLinksFactory } from "../../domains/links/AppLinksFactory";
import { MoreByAuthor } from "./components/MoreByAuthor";
import { ProductDetails } from "./components/ProductDetails";
import { ShopCategory } from "./components/ShopCategory";

export function ShopCreatorProductPage() {
  const match = useRouteMatch<{ authorSlug: string; productSlug: string }>();

  const selectedGame = shopProducts.find((g) => {
    return (
      match.params.authorSlug === g.authorSlug &&
      match.params.productSlug === g.slug
    );
  });
  const selectedGameTags = selectedGame?.tags ?? [];
  const [firstTag] = shuffle(selectedGameTags);

  const theme = useTheme();

  return (
    <>
      <Page
        box={{ mt: "2rem" }}
        title={`${selectedGame?.name} by ${selectedGame?.author}`}
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
                  {selectedGame?.author}
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
              game={selectedGame}
              color={theme.palette.text.primary}
            />
            <ShopCategory
              excludeProduct={selectedGame}
              name={`You might also like... `}
              tags={firstTag}
              count={5}
            />
            <MoreByAuthor
              authorSlug={selectedGame?.authorSlug}
              count={5}
              excludeProduct={selectedGame}
            />
          </Container>
        </Fade>
      </Page>{" "}
    </>
  );
}

export default ShopCreatorProductPage;
