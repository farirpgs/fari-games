import { css } from "@emotion/css";
import NextPlanIcon from "@mui/icons-material/NextPlan";
import TwitterIcon from "@mui/icons-material/Twitter";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import React from "react";
import { IShopProductWithAuthor } from "../../../../data/shop/types/IShopProduct";
import { track } from "../../../domains/analytics/track";
import { ItchIcon } from "../../../icons/ItchIcon";
import {
  driveThruRpgAffiliateCode,
  itchIoAffiliateCode,
} from "../configs/games";

export function ProductLinks(props: {
  product: IShopProductWithAuthor | undefined;
}) {
  if (!props.product) {
    return null;
  }
  return (
    <Grid container spacing={1}>
      {props.product.links.itchIo && (
        <Grid item xs={12}>
          <Button
            color="secondary"
            fullWidth
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
        <Grid item xs={12}>
          <Button
            color="secondary"
            fullWidth
            variant="outlined"
            size="small"
            component={"a"}
            href={
              props.product.affiliate
                ? props.product.links.driveThru + driveThruRpgAffiliateCode
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
      {props.product.author.links.website && (
        <Grid item xs={12}>
          <Button
            color="secondary"
            fullWidth
            variant="outlined"
            size="small"
            component={"a"}
            href={props.product.author.links.website}
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
      {props.product.author.links.twitter && (
        <Grid item xs={12}>
          <Button
            color="secondary"
            fullWidth
            variant="outlined"
            size="small"
            component={"a"}
            href={props.product.author.links.twitter}
            target="_blank"
            onClick={() => {
              track("follow_twitter", {
                game: props.product?.slug,
              });
            }}
            className={css({
              textTransform: "none",
            })}
            endIcon={<TwitterIcon />}
          >
            Twitter
          </Button>
        </Grid>
      )}
    </Grid>
  );
}
