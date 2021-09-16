import { css } from "@emotion/css";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Fade from "@material-ui/core/Fade";
import React from "react";
import { Settings } from "react-slick";
import { shopCategories } from "../../../data/shop/shopCategories";
import { IShopProduct } from "../../../data/shop/types/IShopProduct";
import { BetterSlider } from "./components/BetterSlider";
import { ProductDetails } from "./components/ProductDetails";
import { ShopCategory } from "./components/ShopCategory";
import { featuredGames } from "./configs/games";

export function ShopPage() {
  const heroSliderSettings: Settings = {
    autoplay: false,
    dots: true,
    infinite: true,
    centerMode: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Fade in>
      <Container>
        <Box mb="2rem">
          <BetterSlider
            height="400px"
            settings={heroSliderSettings}
            className={css({})}
          >
            {featuredGames.map((game, i) => {
              return (
                <React.Fragment key={i}>{renderHeroSlide(game)}</React.Fragment>
              );
            })}
          </BetterSlider>
        </Box>
        {shopCategories.map((category, i) => {
          return (
            <ShopCategory
              key={i}
              name={category.name}
              tags={category.tags}
              count={20}
            />
          );
        })}
      </Container>
    </Fade>
  );

  function renderHeroSlide(game: IShopProduct) {
    return (
      <div
        className={css({
          width: "100%",
          height: "400px",
          position: "relative",
          display: "flex",
        })}
      >
        <div
          className={css({
            width: "100%",
            height: "100%",
            position: "absolute",
            top: "0",
            left: "0",

            background: `linear-gradient(90deg, rgba(0, 0, 0, .8) 0%, rgba(0, 0, 0, .5) 100%), url(${game.image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            "&:after": {
              backdropFilter: "blur(8px)",
              content: '""',
              position: "absolute",
              width: "100%",
              height: "100%",
              pointerEvents: "none" /* make the overlay click-through */,
            },
          })}
        />
        <ProductDetails
          alignItems="center"
          product={game}
          padding="2rem 6rem"
          color="#fff"
          justifyContent="space-evenly"
          clickable
        />
      </div>
    );
  }
}

export default ShopPage;
