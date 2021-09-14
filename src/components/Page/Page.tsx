import Box from "@material-ui/core/Box";
import Container, { ContainerProps } from "@material-ui/core/Container";
import { BoxProps } from "@material-ui/system";
import React from "react";
import { Helmet } from "react-helmet-async";

export function Page(props: {
  title?: string;
  children: React.ReactNode;
  box?: BoxProps;
  container?: ContainerProps;
}) {
  return (
    <>
      <Helmet>
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
