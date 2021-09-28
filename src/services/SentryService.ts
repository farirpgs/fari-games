import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

export const SentryService = {
  init() {
    if (import.meta.env.DEV) {
      return;
    }
    Sentry.init({
      dsn: "https://45a9554609a0460899b2739c8e2c875d@o332302.ingest.sentry.io/5982870",
      integrations: [new Integrations.BrowserTracing()],

      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      tracesSampleRate: 1.0,
    });
  },
};
