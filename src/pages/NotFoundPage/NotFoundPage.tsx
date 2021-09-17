import Container from "@mui/material/Container";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { track } from "../../domains/analytics/track";

export function NotFoundPage() {
  const location = useLocation();

  useEffect(() => {
    track("not_found", {
      path: location.pathname,
    });
  }, []);

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
