import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Page } from "../../components/Page/Page";
import { track } from "../../domains/analytics/track";

export function NotFoundPage() {
  const location = useLocation();

  useEffect(() => {
    track("not_found", {
      path: location.pathname,
    });
  }, []);

  return (
    <Page
      description="We could not find the page you were looking for."
      title="Page Not Found (404)"
      box={{ mt: "2rem" }}
      container={{ maxWidth: "lg" }}
    >
      <Typography gutterBottom variant="h2">
        Page Not Found (404)
      </Typography>
      <p>We could not find the page you were looking for.</p>
    </Page>
  );
}
export default NotFoundPage;
