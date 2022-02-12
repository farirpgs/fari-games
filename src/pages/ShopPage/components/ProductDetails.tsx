import { css } from "@emotion/css";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import {
  responsiveFontSizes,
  ThemeProvider,
  useTheme,
} from "@mui/material/styles";
import createTheme from "@mui/material/styles/createTheme";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useMemo } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { IShopProductWithAuthor } from "../../../../data/shop/types/IShopProduct";
import { AppLinksFactory } from "../../../domains/links/AppLinksFactory";
import { themeOptions } from "../../../theme";
import { ProductType } from "./ProductType";

export function useThemeFromColor(color: string, mode?: any) {
  const whiteVariants = ["#fff", "#ffffff", "#FFF", "#FFFFFF", "white"];

  const buttonTheme = useMemo(() => {
    const defaultType = whiteVariants.includes(color) ? "dark" : "light";
    return responsiveFontSizes(
      createTheme({
        palette: {
          mode: mode ?? defaultType,
          primary: { main: color },
        },
        ...themeOptions,
      })
    );
  }, [color]);

  return buttonTheme;
}

export function ProductDetails(props: {
  product: IShopProductWithAuthor | undefined;
  alignItems?: string;
  justifyContent?: string;
  padding?: string;
  color: string;
  clickable?: boolean;
}) {
  const productTheme = useThemeFromColor(props.color);
  const theme = useTheme();
  const isLgDown = useMediaQuery(theme.breakpoints.down("lg"));
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));

  if (!props.product) {
    return null;
  }

  return (
    <>
      <Grid
        container
        spacing={2}
        alignItems={props.alignItems}
        justifyContent={props.justifyContent}
        className={css({
          zIndex: 1,
          position: "relative",
          minHeight: "400px",
          padding: props.padding,
        })}
      >
        <Grid item xs={12} lg={6}>
          <div>
            <div
              className={css({
                textAlign: "left",
                display: "flex",
              })}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <ReactRouterLink
                    className={css({
                      color: productTheme.palette.text.secondary,
                    })}
                    to={AppLinksFactory.makeAuthorLink(props.product)}
                  >
                    <Typography
                      variant="caption"
                      className={css({
                        fontSize: "1rem",
                      })}
                    >
                      By {props.product.author.name}
                    </Typography>
                  </ReactRouterLink>
                </Grid>
                <Grid item>
                  <Stack direction="row" spacing={1}>
                    <ProductType product={props.product} />
                  </Stack>
                </Grid>
              </Grid>
            </div>
            <div
              className={css({
                color: productTheme.palette.text.primary,
                bottom: "4rem",
                left: "4rem",
                fontSize: isSmall ? "2.5rem" : "3.5rem",
                lineHeight: "1em",
                textAlign: "left",
                marginBottom: ".5rem",
                display: "flex",
                fontWeight: 800,
              })}
            >
              <ReactRouterLink
                to={AppLinksFactory.makeProductLink(props.product)}
                className={css({
                  color: productTheme.palette.text.primary,
                  cursor: props.clickable ? "pointer" : "text",
                  textDecoration: "none",
                  pointerEvents: props.clickable ? undefined : "none",
                })}
              >
                {props.product.name}
              </ReactRouterLink>
            </div>
            <div
              className={css({
                color: productTheme.palette.text.primary,
                bottom: "4rem",
                left: "4rem",
                fontSize: "1rem",
                textAlign: "left",
                marginBottom: "1rem",
                display: "flex",
              })}
            >
              <Typography variant="body2">
                {props.product.description}
              </Typography>
            </div>
            <ThemeProvider theme={productTheme}>
              <div
                className={css({
                  color: productTheme.palette.text.primary,
                  marginBottom: "1rem",
                })}
              >
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <Button
                      size="large"
                      variant="contained"
                      component={ReactRouterLink}
                      to={AppLinksFactory.makeGameLink({
                        author: props.product.author.slug,
                        game: props.product.slug,
                      })}
                      className={css({
                        textTransform: "none",
                      })}
                    >
                      Read Now
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </ThemeProvider>
          </div>
        </Grid>
        {!isLgDown && (
          <Grid item xs={12} lg={6}>
            <ReactRouterLink
              to={AppLinksFactory.makeProductLink(props.product)}
              className={css({
                cursor: "pointer",
                display: "flex",
                margin: "0 auto",
              })}
            >
              <img
                src={props.product.image}
                className={css({
                  width: "auto",
                  maxWidth: "100%",
                  height: "100%",
                  maxHeight: "300px",
                  margin: "0 auto",
                  border: "4px solid #fff",
                })}
              />
            </ReactRouterLink>
          </Grid>
        )}
      </Grid>
    </>
  );
}
