import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Container from "@mui/material/Container";
import Fade from "@mui/material/Fade";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
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
    const authorSlug = g.author.slug;

    return match.params.authorSlug === authorSlug;
  });
  const gamesAsString = creatorsGames.map((g) => g.name).join(", ");
  const [firstGame] = creatorsGames;

  return (
    <>
      <Page
        box={{ mt: "2rem" }}
        title={`Games by ${firstGame?.author.name}`}
        description={`${gamesAsString}, and more...`}
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

                <Typography color="textPrimary">
                  {firstGame.author.name}
                </Typography>
              </Breadcrumbs>
            </Box>
            <Box mb="1rem">
              <MoreByAuthor variant="h2" authorSlug={firstGame.author.slug} />
            </Box>
            <Box>
              <ShopCategory
                excludeProduct={firstGame}
                name={`You Might Also Like... `}
                tags={"srd"}
                count={4}
              />
            </Box>
          </Container>
        </Fade>
      </Page>
    </>
  );
}

export default ShopAuthorPage;
