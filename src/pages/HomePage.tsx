import { css } from "@emotion/css";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import React from "react";
import { ReactRouterLink } from "../components/ReactRouterLink";

export function HomePage() {
  return (
    <>
      <Container>
        <Box mb="2rem">
          <Typography variant="h3">Home</Typography>
        </Box>
        <ReactRouterLink
          to="/game/charge-rpg"
          className={css({
            textDecoration: "none",
          })}
        >
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                sx={{ height: 140 }}
                image="https://gyazo.com/ff00ddc1fac5142e897dd4b66192a2ff.png"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Charge RPG
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Power Your Story Telling
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Start Reading
              </Button>
            </CardActions>
          </Card>
        </ReactRouterLink>
      </Container>
    </>
  );
}
