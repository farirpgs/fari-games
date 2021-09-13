export function track(event: string, body = {}) {
  //@ts-ignore
  const googleAnalytics = gtag;

  if (!googleAnalytics) {
    return;
  }

  googleAnalytics("event", event, body);
}
