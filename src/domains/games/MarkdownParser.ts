import { Remarkable } from "remarkable";

export const MarkdownParser = {
  async toHtml(markdown: string) {
    const md = new Remarkable({
      html: true,
    });
    const result = md.render(markdown);

    return result;
  },
};
