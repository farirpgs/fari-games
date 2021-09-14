import Box from "@material-ui/core/Box";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Container from "@material-ui/core/Container";
import Fade from "@material-ui/core/Fade";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useRouteMatch } from "react-router";
import { Link as ReactRouterLink } from "react-router-dom";
import { shopProducts } from "../../../data/shop/shopProducts";
import { Page } from "../../components/Page/Page";
import { AppLinksFactory } from "../../domains/links/AppLinksFactory";
import { MoreByAuthor } from "./components/MoreByAuthor";
import { ShopCategory } from "./components/ShopCategory";

export function ShopAuthorPage() {
  const match = useRouteMatch<{ authorSlug: string }>();

  const creatorsGames = shopProducts.filter((g) => {
    const authorSlug = g.authorSlug;

    return match.params.authorSlug === authorSlug;
  });
  const [firstGame] = creatorsGames;

  return (
    <>
      <Page box={{ mt: "2rem" }} title={`Games by ${firstGame?.author}`}>
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

                <Typography color="textPrimary">{firstGame.author}</Typography>
              </Breadcrumbs>
            </Box>
            <Box mb="1rem">
              <MoreByAuthor variant="h2" authorSlug={firstGame.authorSlug} />
            </Box>
            <Box>
              <ShopCategory
                excludeProduct={firstGame}
                name={`You might also like... `}
                tags={"main"}
                count={6}
              />
            </Box>
          </Container>
        </Fade>
      </Page>
    </>
  );
}

export default ShopAuthorPage;
