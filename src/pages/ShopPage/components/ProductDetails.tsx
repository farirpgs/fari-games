import { css } from "@emotion/css";
import { useTheme } from "@emotion/react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import { responsiveFontSizes, ThemeProvider } from "@material-ui/core/styles";
import createTheme from "@material-ui/core/styles/createTheme";
import Typography from "@material-ui/core/Typography";
import NextPlanIcon from "@material-ui/icons/NextPlan";
import { Theme } from "@material-ui/system/createTheme";
import produce from "immer";
import React, { useMemo } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { IShopProduct } from "../../../../data/shop/types/IShopProduct";
import {
  driveThruRpgAffiliateCode,
  itchIoAffiliateCode,
} from "../configs/games";
import { ShopLink } from "../domains/ShopLink";

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

function ItchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1rem"
      width="1rem"
      viewBox="0 0 245.371 220.736"
    >
      <path
        d="M31.99 1.365C21.287 7.72.2 31.945 0 38.298v10.516C0 62.144 12.46 73.86 23.773 73.86c13.584 0 24.902-11.258 24.903-24.62 0 13.362 10.93 24.62 24.515 24.62 13.586 0 24.165-11.258 24.165-24.62 0 13.362 11.622 24.62 25.207 24.62h.246c13.586 0 25.208-11.258 25.208-24.62 0 13.362 10.58 24.62 24.164 24.62 13.585 0 24.515-11.258 24.515-24.62 0 13.362 11.32 24.62 24.903 24.62 11.313 0 23.773-11.714 23.773-25.046V38.298c-.2-6.354-21.287-30.58-31.988-36.933C180.118.197 157.056-.005 122.685 0c-34.37.003-81.228.54-90.697 1.365zm65.194 66.217a28.025 28.025 0 0 1-4.78 6.155c-5.128 5.014-12.157 8.122-19.906 8.122a28.482 28.482 0 0 1-19.948-8.126c-1.858-1.82-3.27-3.766-4.563-6.032l-.006.004c-1.292 2.27-3.092 4.215-4.954 6.037a28.5 28.5 0 0 1-19.948 8.12c-.934 0-1.906-.258-2.692-.528-1.092 11.372-1.553 22.24-1.716 30.164l-.002.045c-.02 4.024-.04 7.333-.06 11.93.21 23.86-2.363 77.334 10.52 90.473 19.964 4.655 56.7 6.775 93.555 6.788h.006c36.854-.013 73.59-2.133 93.554-6.788 12.883-13.14 10.31-66.614 10.52-90.474-.022-4.596-.04-7.905-.06-11.93l-.003-.045c-.162-7.926-.623-18.793-1.715-30.165-.786.27-1.757.528-2.692.528a28.5 28.5 0 0 1-19.948-8.12c-1.862-1.822-3.662-3.766-4.955-6.037l-.006-.004c-1.294 2.266-2.705 4.213-4.563 6.032a28.48 28.48 0 0 1-19.947 8.125c-7.748 0-14.778-3.11-19.906-8.123a28.025 28.025 0 0 1-4.78-6.155 27.99 27.99 0 0 1-4.736 6.155 28.49 28.49 0 0 1-19.95 8.124c-.27 0-.54-.012-.81-.02h-.007c-.27.008-.54.02-.813.02a28.49 28.49 0 0 1-19.95-8.123 27.992 27.992 0 0 1-4.736-6.155zm-20.486 26.49l-.002.01h.015c8.113.017 15.32 0 24.25 9.746 7.028-.737 14.372-1.105 21.722-1.094h.006c7.35-.01 14.694.357 21.723 1.094 8.93-9.747 16.137-9.73 24.25-9.746h.014l-.002-.01c3.833 0 19.166 0 29.85 30.007L210 165.244c8.504 30.624-2.723 31.373-16.727 31.4-20.768-.773-32.267-15.855-32.267-30.935-11.496 1.884-24.907 2.826-38.318 2.827h-.006c-13.412 0-26.823-.943-38.318-2.827 0 15.08-11.5 30.162-32.267 30.935-14.004-.027-25.23-.775-16.726-31.4L46.85 124.08C57.534 94.073 72.867 94.073 76.7 94.073zm45.985 23.582v.006c-.02.02-21.863 20.08-25.79 27.215l14.304-.573v12.474c0 .584 5.74.346 11.486.08h.006c5.744.266 11.485.504 11.485-.08v-12.474l14.304.573c-3.928-7.135-25.79-27.215-25.79-27.215v-.006l-.003.002z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ProductDetails(props: {
  game: IShopProduct | undefined;
  alignItems?: string;
  justifyContent?: string;
  padding?: string;
  color: string;
  clickable?: boolean;
}) {
  const productTheme = useThemeFromColor(props.color);

  if (!props.game) {
    return null;
  }

  return (
    <>
      <Grid
        container
        alignItems={props.alignItems}
        justifyContent={props.justifyContent}
        className={css({
          zIndex: 1,
          position: "relative",
          minHeight: "400px",
          padding: props.padding,
        })}
      >
        <Grid item xs={12} sm={8} md={6}>
          <div>
            <div
              className={css({
                color: productTheme.palette.text.primary,
                textAlign: "left",
                display: "flex",
              })}
            >
              <Typography variant="caption">By {props.game.author}</Typography>
            </div>
            <div
              className={css({
                color: productTheme.palette.text.primary,
                bottom: "4rem",
                left: "4rem",
                fontSize: "3.5rem",
                lineHeight: "1em",
                textAlign: "left",
                marginBottom: ".5rem",
                display: "flex",
                fontWeight: 800,
              })}
            >
              <ReactRouterLink
                to={ShopLink.makeGameLink(props.game)}
                className={css({
                  color: productTheme.palette.text.primary,
                  cursor: props.clickable ? "pointer" : "text",
                  textDecoration: "none",
                  pointerEvents: props.clickable ? undefined : "none",
                })}
              >
                {props.game.name}
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
              <Typography variant="body2">{props.game.description}</Typography>
            </div>

            <div
              className={css({
                color: productTheme.palette.text.primary,
                marginBottom: "1rem",
              })}
            >
              <ThemeProvider theme={productTheme}>
                <Grid container spacing={1} alignItems="center">
                  {props.game.document && (
                    <Grid item>
                      <Button
                        variant="contained"
                        component={ReactRouterLink}
                        to={`/games/${props.game.authorSlug}/${props.game.slug}`}
                        className={css({
                          textTransform: "none",
                        })}
                      >
                        Read the SRD
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </ThemeProvider>
            </div>
            <div
              className={css({
                color: productTheme.palette.text.primary,
                marginBottom: "1rem",
              })}
            >
              <ThemeProvider theme={productTheme}>
                <Grid container spacing={1} alignItems="center">
                  {props.game.links.itchIo && (
                    <Grid item>
                      <Button
                        variant="outlined"
                        size="small"
                        component={"a"}
                        href={
                          props.game.affiliate
                            ? props.game.links.itchIo + itchIoAffiliateCode
                            : props.game.links.itchIo
                        }
                        target="_blank"
                        className={css({
                          textTransform: "none",
                        })}
                        endIcon={<ItchIcon />}
                      >
                        Itch.io
                      </Button>
                    </Grid>
                  )}
                  {props.game.links.driveThru && (
                    <Grid item>
                      <Button
                        variant="outlined"
                        size="small"
                        component={"a"}
                        href={
                          props.game.affiliate
                            ? props.game.links.driveThru +
                              driveThruRpgAffiliateCode
                            : props.game.links.driveThru
                        }
                        target="_blank"
                        className={css({
                          textTransform: "none",
                        })}
                        endIcon={<NextPlanIcon />}
                      >
                        DriveThruRPG
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </ThemeProvider>
            </div>
          </div>
        </Grid>
        <Hidden smDown>
          <Grid item xs={12} sm={4} md={6}>
            <ReactRouterLink
              to={ShopLink.makeGameLink(props.game)}
              className={css({
                cursor: "pointer",
              })}
            >
              <div
                className={css({
                  height: "100%",
                })}
              >
                <img
                  src={props.game.image}
                  className={css({
                    width: "auto",
                    maxWidth: "100%",
                    height: "100%",
                    maxHeight: "300px",
                    margin: "0 auto",
                    border: "4px solid #fff",
                  })}
                />
              </div>
            </ReactRouterLink>
          </Grid>
        </Hidden>
      </Grid>
    </>
  );
}
