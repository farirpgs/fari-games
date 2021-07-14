import kebabCase from "lodash/kebabCase";
import remark from "remark";
import html from "remark-html";
export type IDerp = {
  id: string;
  text: string | null;
};
export type IChapter = {
  html: string;
  data: Record<string, string>;
  chapters: Array<IDerp>;
  chapterToc: Array<{
    id: string;
    text: string;
    level: number;
  }>;
  previousChapter: {
    id: string | null;
    text: string | null;
  };
  next: {
    id: string | null;
    text: string | null;
  };
};
// heading hierarchy from html

export const Game = {
  async getGameContent(game: string) {
    const { default: fileContent } = await import(
      `../../../_games/${game}.md?raw`
    );

    const data = parseFrontMatter(fileContent);
    const html = await markdownToHtml(fileContent);

    const dom = document.createElement("div");
    dom.innerHTML = html;

    const documentChapters = dom.querySelectorAll("h1");
    const headingIdCounts: Record<string, number> = {};
    const chapters: Array<{ id: string; text: string | null }> = [];
    documentChapters.forEach((h) => {
      const id = kebabCase(h.textContent ?? "");
      const count = headingIdCounts[id] ?? 0;
      const newCount = count + 1;
      const chapterId = count === 0 ? id : `${id}-${count}`;

      h.id = chapterId;
      chapters.push({ id, text: h.textContent });
      headingIdCounts[id] = newCount;
    });

    const documentHeadings = dom.querySelectorAll("h2,h3,h4,h5,h6");
    documentHeadings.forEach((h) => {
      const id = kebabCase(h.textContent ?? "");
      h.innerHTML = `<a href="#${id}" class="anchor">#</a> ${h.textContent}`;
      h.id = id;
    });

    return { dom: dom, chapters, data } as const;
  },
  async getChapter(game: string, chapterId: string): Promise<IChapter> {
    const markdown = await Game.getGameContent(game);
    const chapterIdToUse = chapterId ?? markdown.chapters[0].id;
    const currentChapterIndex = markdown.chapters.findIndex(
      (c) => c.id === chapterIdToUse
    );
    const previousChapterIndex = currentChapterIndex + -1;
    const previousChapter = markdown.chapters[previousChapterIndex];

    const nextChapterIndex = currentChapterIndex + 1;
    const nextChapter = markdown.chapters[nextChapterIndex];

    const currentChapterHeading = markdown.dom.querySelector(
      `#${chapterIdToUse}`
    );

    const elements = getAllNextSiblingUntilSelector(
      currentChapterHeading,
      `#${nextChapter.id}`
    );
    let chapterHtml = "";
    elements.forEach((e) => {
      chapterHtml += e.outerHTML;
    });
    const tableOfContent = getTableOfContent(chapterHtml);

    return {
      html: chapterHtml,
      chapters: markdown.chapters,
      chapterToc: tableOfContent,
      data: markdown.data,
      previousChapter: {
        id: previousChapter?.id || null,
        text:
          markdown.dom.querySelector(`#${previousChapter?.id}`)?.textContent ||
          null,
      },
      next: {
        id: nextChapter?.id || null,
        text:
          markdown.dom.querySelector(`#${nextChapter?.id}`)?.textContent ||
          null,
      },
    };
  },
};

function getAllNextSiblingUntilSelector(
  elem: Element | undefined | null,
  selector: string
) {
  if (!elem) {
    return [];
  }
  const siblings: Array<Element> = [elem];

  let currentElement = elem?.nextElementSibling;

  while (currentElement) {
    if (currentElement.matches(selector)) break;

    siblings.push(currentElement);

    currentElement = currentElement.nextElementSibling;
  }

  return siblings;
}

async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

// function that returns all heading with their depth from a markdown document
// https://stackoverflow.com/questions/15785719/get-all-headings-in-a-markdown-file
function parseMarkdown(markdown: string) {
  const headingRegex = /^(#+)\s*(.*)$/gm;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2];
    headings.push({
      level,
      text,
    });
  }

  return headings;
}

function parseFrontMatter(markdown: string): Record<string, string> {
  const frontMatter = markdown.split("---");
  if (frontMatter.length === 1) {
    return {};
  }
  const [, content] = frontMatter;
  const firstLines = content.split("\n");
  const frontMatterObject: Record<string, string> = {};
  for (const line of firstLines) {
    const [key, value] = line.split(": ");
    if (key && value) {
      frontMatterObject[key] = value;
    }
  }
  return frontMatterObject;
}

function getTableOfContent(html: string) {
  const dom = document.createElement("div");
  dom.innerHTML = html;
  const tableOfContent: Array<{ id: string; text: string; level: number }> = [];

  dom.querySelectorAll("h2,h3,h4,h5,h6").forEach((h) => {
    const id = h.id;
    const level = h.tagName.split("H")[1];
    const text = h.textContent ?? "";
    tableOfContent.push({ id, text, level: parseInt(level, 10) });
  });

  return tableOfContent;
}
