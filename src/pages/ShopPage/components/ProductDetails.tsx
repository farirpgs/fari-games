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
                to={AppLinksFactory.makeProductLink(props.game)}
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
              to={AppLinksFactory.makeProductLink(props.game)}
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
