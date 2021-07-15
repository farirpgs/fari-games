import { Remarkable } from "remarkable";

export const Markdown = {
  async toHtml(markdown: string) {

    var md = new Remarkable();
    const result = md.render(markdown);

    return result;
  },
};
