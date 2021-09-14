import Box from "@material-ui/core/Box";
import Container, { ContainerProps } from "@material-ui/core/Container";
import { BoxProps } from "@material-ui/system";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router";

export function Page(props: {
  title: string | null;
  description: string | null;
  image?: string;
  children: React.ReactNode;
  box?: BoxProps;
  container?: ContainerProps;
}) {
  const location = useLocation();
  const title = props.title
    ? `${props.title} - Fari Games`
    : "Fari Games - Building RPGs Together";
  const description =
    props.description ||
    "All the best TTRPG SRDs available right here on Fari Games.";
  return (
    <>
      <Helmet
        meta={[
          {
            name: "description",
            content: description,
          },
          {
            property: "og:title",
            content: title,
          },
          {
            property: "og:description",
            content: description,
          },
          {
            property: "og:image",
            content: props.image || "",
          },
          {
            property: "og:url",
            content: `https://fari.games${location.pathname}`,
          },
          {
            name: "twitter:card",
            content: "summary_large_image",
          },
        ]}
      >
        <title>{title}</title>
      </Helmet>
      <Box {...props.box}>
        {props.container ? (
          <Container {...props.container}>{props.children}</Container>
        ) : (
          props.children
        )}
      </Box>
    </>
  );
}
