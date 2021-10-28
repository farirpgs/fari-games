import { css } from "@emotion/css";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import { default as React, useState } from "react";
import { useHistory } from "react-router";
import { Settings } from "react-slick";
import { shopCategories } from "../../../data/shop/shopCategories";
import { IShopProductWithAuthor } from "../../../data/shop/types/IShopProduct";
import { AppLinksFactory } from "../../domains/links/AppLinksFactory";
import { BetterSlider } from "./components/BetterSlider";
import { ProductDetails } from "./components/ProductDetails";
import { ShopCategory, useGames } from "./components/ShopCategory";

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
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const featuredGames = useGames("new");

  return (
    <Fade in>
      <Container>
        <Box mb="2rem">
          <BetterSlider height="400px" settings={heroSliderSettings}>
            {featuredGames.map((game, i) => {
              return (
                <React.Fragment key={i}>{renderHeroSlide(game)}</React.Fragment>
              );
            })}
          </BetterSlider>
        </Box>
        <Box mb="2rem">
          <ShopPageSearch />
        </Box>
        {shopCategories.map((category, i) => {
          return (
            <ShopCategory
              key={i}
              name={category.name}
              tags={category.tags}
              count={100}
            />
          );
        })}
      </Container>
    </Fade>
  );

  function renderHeroSlide(game: IShopProductWithAuthor) {
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
          padding={isSmall ? "2rem" : "2rem 6rem"}
          color="#fff"
          justifyContent="space-evenly"
          clickable
        />
      </div>
    );
  }
}

function ShopPageSearch() {
  const [search, setSearch] = useState("");

  const history = useHistory();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        history.push(AppLinksFactory.makeSearchPage(search));
      }}
    >
      <TextField
        fullWidth
        InputProps={{
          className: css({
            fontSize: "1.5rem",
            borderRadius: "8px",
          }),
          startAdornment: (
            <InputAdornment position="start">
              <IconButton type="submit">
                <SearchIcon
                  className={css({
                    width: "2.5rem",
                    height: "2.5rem",
                  })}
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
        placeholder="Search..."
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
    </form>
  );
}

export default ShopPage;
