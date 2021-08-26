import { Remarkable } from "remarkable";

export const MarkdownParser = {
  async toHtml(markdown: string) {
    const md = new Remarkable({
      html: true,
    });
    const markdownWithoutFrontMatter = removeFrontmatter(markdown);
    const result = md.render(markdownWithoutFrontMatter);

    return result;
  },
};

function removeFrontmatter(markdown: string) {
  const frontmatter = markdown.match(/---\n([\s\S]*?)\n---/);
  if (frontmatter) {
    return markdown.replace(frontmatter[0], "");
  }
  return markdown;
}
