import Typography from "@mui/material/Typography";
import React from "react";
import { Page } from "../Page/Page";

export class ErrorBoundary extends React.Component<{}, { hasError: boolean }> {
  constructor(props: {}) {
    super(props);
    this.state = { hasError: false };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(error: unknown) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidCatch(error: unknown, errorInfo: unknown) {
    // You can also log the error to an error reporting service
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Page
          title="Something went wrong"
          description="An error has occurred. Please try again later."
          container={{
            maxWidth: "md",
          }}
          box={{ mt: "2rem" }}
        >
          <Typography variant="h2" gutterBottom>
            Something went wrong.
          </Typography>
          <Typography variant="body1">
            An error has occurred. Please try again later.
          </Typography>
        </Page>
      );
    }

    return this.props.children;
  }
}
