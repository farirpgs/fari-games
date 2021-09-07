export function track(event: string, body = {}) {
  //@ts-ignore
  gtag("event", event, body);
}
