import { css } from "@emotion/css";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";
import { Page } from "../../components/Page/Page";
import ShopPage from "../ShopPage/ShopPage";

const Sponsors: Array<{ image: string; name: string; link: string }> = [
  {
    name: "Netlify",
    image: "https://www.netlify.com/img/global/badges/netlify-color-accent.svg",
    link: "https://www.netlify.com",
  },
];

export function HomePage() {
  return (
    <>
      <Page title={null} description={null}>
        <ShopPage />
        {renderSponsors()}
      </Page>
    </>
  );

  function renderSponsors() {
    return (
      <Box py="2rem" mb={"2rem"}>
        <Container>
          <Typography variant="h3" gutterBottom>
            Sponsors
          </Typography>
          <Grid container spacing={4} justifyContent="flex-start">
            {Sponsors.map((sponsor, i) => {
              return (
                <Grid item key={i}>
                  <a href={sponsor.link} target="_blank" rel="noreferrer">
                    <img
                      className={css({ width: "auto", height: "50px" })}
                      src={sponsor.image}
                      title={sponsor.name}
                    />
                  </a>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>
    );
  }
}

export default HomePage;
