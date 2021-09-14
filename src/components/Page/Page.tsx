import Box from "@material-ui/core/Box";
import Container, { ContainerProps } from "@material-ui/core/Container";
import { BoxProps } from "@material-ui/system";
import React from "react";
import { Helmet } from "react-helmet-async";

export function Page(props: {
  title: string | null;
  description: string | null;
  children: React.ReactNode;
  box?: BoxProps;
  container?: ContainerProps;
}) {
  return (
    <>
      <Helmet
        meta={[
          {
            name: "description",
            content:
              props.description ||
              "All the best TTRPG SRDs available right here on Fari Games.",
          },
        ]}
      >
        <title>
          {props.title
            ? `${props.title} - Fari Games`
            : "Fari Games - Building RPGs Together"}
        </title>
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
