import { css } from "@emotion/css";
import NextPlanIcon from "@mui/icons-material/NextPlan";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import React from "react";
import { IShopProduct } from "../../../../data/shop/types/IShopProduct";
import { track } from "../../../domains/analytics/track";
import { ItchIcon } from "../../../icons/ItchIcon";
import {
  driveThruRpgAffiliateCode,
  itchIoAffiliateCode,
} from "../configs/games";

export function ProductLinks(props: { product: IShopProduct | undefined }) {
  if (!props.product) {
    return null;
  }
  return (
    <Grid container spacing={1}>
      {props.product.links.itchIo && (
        <Grid item xs={12}>
          <Button
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
      {props.product.links.website && (
        <Grid item xs={12}>
          <Button
            fullWidth
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
  );
}
