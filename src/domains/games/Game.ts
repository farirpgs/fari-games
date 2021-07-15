import kebabCase from "lodash/kebabCase";
import { Markdown } from "./Markdown";
export type IChapterListItem = {
  id: string;
  text: string | null;
};

export type IChapter = {
  html: string;
  data: Record<string, string>;
  chapters: Array<IChapterListItem>;
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

const GameImporters: Record<string, () => Promise<typeof import("*?raw")>> = {
  "charge-rpg": () => import("../../../_games/charge-rpg.md?raw"),
} as const;

export const Game = {
  async getGameContent(game: string) {
    const { default: fileContent } = await GameImporters[game]();
    // const fileContent = await fetch(url).then((r) => r.text());

    const data = parseFrontMatter(fileContent);
    const html = await Markdown.toHtml(fileContent);

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
      nextChapter ? `#${nextChapter.id}` : undefined
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
  selector: string | undefined
) {
  if (!elem) {
    return [];
  }
  const siblings: Array<Element> = [elem];

  let currentElement = elem?.nextElementSibling;

  while (currentElement) {
    if (selector) {
      if (currentElement.matches(selector)) {
        break;
      }
      siblings.push(currentElement);
      currentElement = currentElement.nextElementSibling;
    } else {
      siblings.push(currentElement);
      currentElement = currentElement.nextElementSibling;
    }
  }
  return siblings;
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
    const text = h.textContent?.split("#").join("") ?? "";
    tableOfContent.push({ id, text, level: parseInt(level, 10) });
  });


  return tableOfContent;
}
