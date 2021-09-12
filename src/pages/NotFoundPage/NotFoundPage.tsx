import Container from "@material-ui/core/Container";
import React from "react";
import { Helmet } from "react-helmet-async";

export function NotFoundPage() {
  return (
    <Container>
      <Helmet>
        <title>Not Found | Fari Games</title>
      </Helmet>
      <h1>404</h1>
      <p>Page not found</p>
    </Container>
  );
}
export default NotFoundPage;
