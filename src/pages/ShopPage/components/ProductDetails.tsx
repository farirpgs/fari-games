import { css } from "@emotion/css";
import { Theme } from "@material-ui/system/createTheme";
import NextPlanIcon from "@mui/icons-material/NextPlan";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Hidden from "@mui/material/Hidden";
import {
  responsiveFontSizes,
  ThemeProvider,
  useTheme,
} from "@mui/material/styles";
import createTheme from "@mui/material/styles/createTheme";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import produce from "immer";
import React, { useMemo } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { IShopProduct } from "../../../../data/shop/types/IShopProduct";
import { track } from "../../../domains/analytics/track";
import { AppLinksFactory } from "../../../domains/links/AppLinksFactory";
import { ItchIcon } from "../../../icons/ItchIcon";
import {
  driveThruRpgAffiliateCode,
  itchIoAffiliateCode,
} from "../configs/games";

export function useThemeFromColor(color: string, mode?: any) {
  const defaultTheme = useTheme();
  const whiteVariants = ["#fff", "#ffffff", "#FFF", "#FFFFFF", "white"];

  const buttonTheme = useMemo(() => {
    const newTheme = produce(defaultTheme, (draft: Theme) => {
      const defaultType = whiteVariants.includes(color) ? "dark" : "light";
      draft.palette = { primary: { main: color }, mode: mode ?? defaultType };
    });

    return responsiveFontSizes(createTheme(newTheme));
  }, [color]);

  return buttonTheme;
}

export function ProductDetails(props: {
  product: IShopProduct | undefined;
  alignItems?: string;
  justifyContent?: string;
  padding?: string;
  color: string;
  clickable?: boolean;
}) {
  const productTheme = useThemeFromColor(props.color);
  const theme = useTheme();
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
              <ReactRouterLink
                className={css({
                  color: productTheme.palette.text.secondary,
                  // textDecoration: "none",
                })}
                to={AppLinksFactory.makeAuthorLink(props.product)}
              >
                <Typography
                  variant="caption"
                  className={css({
                    fontSize: "1rem",
                  })}
                >
                  By {props.product.author}
                </Typography>
              </ReactRouterLink>
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
                  {props.product.document && (
                    <Grid item>
                      <Button
                        size="large"
                        variant="contained"
                        component={ReactRouterLink}
                        to={AppLinksFactory.makeGameLink({
                          author: props.product.authorSlug,
                          game: props.product.slug,
                        })}
                        className={css({
                          textTransform: "none",
                        })}
                      >
                        Read the SRD
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </div>
              <Box mb="1rem">
                <Divider />
              </Box>
              <div
                className={css({
                  color: productTheme.palette.text.primary,
                  marginBottom: "1rem",
                })}
              >
                <Grid container spacing={1} alignItems="center">
                  {props.product.links.itchIo && (
                    <Grid item>
                      <Button
                        variant="outlined"
                        size="small"
                        component={"a"}
                        href={
                          props.product.affiliate
                            ? props.product.links.itchIo + itchIoAffiliateCode
                            : props.product.links.itchIo
                        }
                        target="_blank"
                        onClick={() => {
                          track("buy_itch", {
                            game: props.product?.slug,
                          });
                        }}
                        className={css({
                          textTransform: "none",
                        })}
                        endIcon={<ItchIcon />}
                      >
                        Itch.io
                      </Button>
                    </Grid>
                  )}
                  {props.product.links.driveThru && (
                    <Grid item>
                      <Button
                        variant="outlined"
                        size="small"
                        component={"a"}
                        href={
                          props.product.affiliate
                            ? props.product.links.driveThru +
                              driveThruRpgAffiliateCode
                            : props.product.links.driveThru
                        }
                        target="_blank"
                        onClick={() => {
                          track("buy_drivethrurpg", {
                            game: props.product?.slug,
                          });
                        }}
                        className={css({
                          textTransform: "none",
                        })}
                        endIcon={<NextPlanIcon />}
                      >
                        DriveThruRPG
                      </Button>
                    </Grid>
                  )}
                  {props.product.links.website && (
                    <Grid item>
                      <Button
                        variant="outlined"
                        size="small"
                        component={"a"}
                        href={props.product.links.website}
                        target="_blank"
                        onClick={() => {
                          track("buy_website", {
                            game: props.product?.slug,
                          });
                        }}
                        className={css({
                          textTransform: "none",
                        })}
                      >
                        Website
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </div>
            </ThemeProvider>
          </div>
        </Grid>
        <Hidden lgDown>
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
        </Hidden>
      </Grid>
    </>
  );
}
