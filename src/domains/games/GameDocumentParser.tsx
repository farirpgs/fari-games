import kebabCase from "lodash/kebabCase";
import React from "react";
import { MarkdownParser } from "./MarkdownParser";
export type IChapterListItem = {
  id: string;
  text: string | null;
};

export type ISidebar = {
  root: Array<ISidebarItem>;

  categories: Record<
    string, // category label
    Array<ISidebarItem> // category items
  >;
};

export type ISidebarItem = {
  path: string;
  title: string;
};

export type IChapter = {
  html: string;
  data: Record<string, string>;
  searchIndexes: Array<ISearchIndex>;
  sidebar: ISidebar;
  chapterToc: Array<{
    id: string;
    text: string;
    level: number;
  }>;
  currentChapter: {
    id: string | null;
    text: string | null;
  };
  previousChapter: {
    id: string | null;
    text: string | null;
  };
  next: {
    id: string | null;
    text: string | null;
  };
};

export const GameSettings: Record<
  string,
  {
    fontFamilies: Array<string>;
    head: React.ReactNode;
    load: () => Promise<typeof import("*?raw")>;
  }
> = {
  "charge-rpg": {
    head: (
      <>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </>
    ),
    fontFamilies: ["Oswald"],
    load: () => import("../../../_games/charge-rpg.md?raw"),
  },
};

export type IGameContent = {
  dom: HTMLDivElement;
  chapters: Array<{ id: string; text: string | null }>;
  data: Record<string, string>;
  sidebar: ISidebar;
  searchIndexes: Array<ISearchIndex>;
};
export type ISearchIndex = {
  id: string;
  label: string;
  group: string;
  preview: string;
  path: string;
};

export const GameDocumentParser = {
  async getGameContent(game: string): Promise<IGameContent> {
    const { default: fileContent } = await GameSettings[game].load();

    const data = parseFrontMatter(fileContent);
    const html = await MarkdownParser.toHtml(fileContent);

    const dom = document.createElement("div");
    dom.innerHTML = html;

    const headings = dom.querySelectorAll("h1,h2,h3,h4,h5,h6");
    const pageSlugCounts: Record<string, number> = {};
    const sectionSlugCounts: Record<string, number> = {};

    const chapters: Array<{ id: string; text: string | null }> = [];
    const sidebar: ISidebar = {
      root: [],
      categories: {},
    };

    const searchIndexes: Array<ISearchIndex> = [];

    let lastH1: Element | null = null;
    headings.forEach((h) => {
      const titles = h.textContent?.split("|");
      const pageTitle = titles?.[0]?.trim() ?? "";
      const headingTitle = titles?.[1]?.trim() ?? "";
      const headingSlug = kebabCase(pageTitle ?? "");

      const headingPreview =
        getFirstSiblingUntilSelector(h, "p,ul")?.textContent ?? "";

      if (h.tagName === "H1") {
        const count = pageSlugCounts[headingSlug] ?? 0;
        const newCount = count + 1;
        const id = count === 0 ? headingSlug : `${headingSlug}-${count}`;
        pageSlugCounts[headingSlug] = newCount;

        const sidebarItem: ISidebarItem = {
          path: id,
          title: pageTitle,
        };
        if (!headingTitle) {
          sidebar.root.push(sidebarItem);
        } else {
          const prev = sidebar.categories[headingTitle] ?? [];

          sidebar.categories[headingTitle] = [...prev, sidebarItem];
        }

        h.id = id;
        h.textContent = pageTitle;
        chapters.push({ id: id, text: pageTitle });
        searchIndexes.push({
          id: id,
          label: pageTitle,
          group: pageTitle,
          preview: headingPreview,
          path: id,
        });
        lastH1 = h;
      } else {
        const count = sectionSlugCounts[headingSlug] ?? 0;
        const newCount = count + 1;
        const id = count === 0 ? headingSlug : `${headingSlug}-${count}`;
        sectionSlugCounts[headingSlug] = newCount;

        h.id = id;
        h.innerHTML = `<a href="#${id}" class="anchor">#</a> ${pageTitle}`;
        searchIndexes.push({
          id: id,
          label: pageTitle,
          group: lastH1?.textContent ?? "",
          preview: headingPreview,
          path: `${lastH1?.id}#${id}` ?? "",
        });
      }
    });

    dom.querySelectorAll("img").forEach((img) => {
      const html = img.outerHTML;
      img.outerHTML = `<figure class="document-image">${html}<figcaption>${img.alt}</figcaption></figure>`;
    });

    return { dom: dom, chapters, data, sidebar, searchIndexes };
  },
  async getChapter(game: string, chapterId: string): Promise<IChapter> {
    const markdown = await GameDocumentParser.getGameContent(game);
    const chapterIdToUse = chapterId ?? markdown.chapters[0].id;
    const currentChapterIndex = markdown.chapters.findIndex(
      (c) => c.id === chapterIdToUse
    );
    const currentChapter = markdown.chapters[currentChapterIndex];
    const previousChapterIndex = currentChapterIndex + -1;
    const previousChapter = markdown.chapters[previousChapterIndex];

    const nextChapterIndex = currentChapterIndex + 1;
    const nextChapter = markdown.chapters[nextChapterIndex];

    const currentChapterHeading = markdown.dom.querySelector(
      `h1#${chapterIdToUse}`
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
      chapterToc: tableOfContent,
      sidebar: markdown.sidebar,
      data: markdown.data,
      searchIndexes: markdown.searchIndexes,
      currentChapter: {
        id: currentChapter?.id || null,
        text: currentChapter?.text || null,
      },
      previousChapter: {
        id: previousChapter?.id || null,
        text: previousChapter?.text || null,
      },
      next: {
        id: nextChapter?.id || null,
        text: nextChapter?.text || null,
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

function getFirstSiblingUntilSelector(
  elem: Element | undefined | null,
  selector: string | undefined
) {
  if (!elem) {
    return;
  }

  let currentElement = elem?.nextElementSibling;

  while (currentElement) {
    if (selector) {
      if (currentElement.matches(selector)) {
        return currentElement;
      }
      currentElement = currentElement.nextElementSibling;
    } else {
      currentElement = currentElement.nextElementSibling;
    }
  }
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

  dom.querySelectorAll("h2,h3").forEach((h) => {
    const id = h.id;
    const level = h.tagName.split("H")[1];
    const text = h.textContent?.split("#").join("") ?? "";

    tableOfContent.push({ id, text, level: parseInt(level, 10) });
    // const isHeadingInsideBlockquote = h.parentElement?.matches("blockquote");
    // if (!isHeadingInsideBlockquote) {
    // }
  });

  return tableOfContent;
}
