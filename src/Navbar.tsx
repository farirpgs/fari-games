import React from "react";
import { css } from "@emotion/css";

import { ReactRouterLink } from "./components/ReactRouterLink";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { useTheme } from "@material-ui/core/styles";

export function Navbar() {
  const theme = useTheme();
  return (
    <Box
      className={css({
        width: "100%",
        background: theme.palette.background.paper,
        height: "6rem",
        marginBottom: "2rem",
      })}
    >
      <Container className={css({ height: "6rem" })}>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
          wrap="nowrap"
          className={css({
            height: "100%",
          })}
        >
          <Grid item>
            <Grid container spacing={1} alignItems="center">
              <Grid item marginRight="2rem">
                <ReactRouterLink
                  to="/"
                  className={css({ color: "inherit", textDecoration: "none" })}
                >
                  <Button color="inherit">
                    <Typography variant="h5" fontWeight="bold">
                      Fari Games
                    </Typography>
                  </Button>
                </ReactRouterLink>
              </Grid>
              <Grid item>
                <ReactRouterLink
                  to="/game/charge-rpg"
                  className={css({ color: "inherit", textDecoration: "none" })}
                >
                  <Button color="inherit">Charge RPG</Button>
                </ReactRouterLink>
              </Grid>
            </Grid>
          </Grid>
          <Grid item />
        </Grid>
      </Container>
    </Box>
  );
}
