import kebabCase from "lodash/kebabCase";
import { MarkdownParser } from "../markdown/MarkdownParser";

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

type IDocFrontMatter = {
  fonts?: string;
  headingFont?: string;
  textFont?: string;
  highlightFont?: string;
  headingUppercase?: string;
  languages?: string;
};

export type IChapter = {
  html: string;
  style: string;
  frontMatter?: IDocFrontMatter;
  numberOfWordsInChapter: number;
  searchIndexes: Array<ISearchIndex>;
  sidebar: ISidebar;
  numberOfChapters: number;
  chapterToc: Array<{
    id: string;
    text: string;
    level: number;
  }>;
  currentChapter: IChapterInfo & { description: string };
  previousChapter: IChapterInfo | null;
  nextChapter: IChapterInfo | null;
};

export type IChapterInfo = {
  id: string | null;
  text: string | null;
  originalText: string | null;
};

export type IDocument = {
  dom: HTMLDivElement;
  style: string;
  frontMatter: IDocFrontMatter;
  chapters: Array<IChapterInfo>;
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

const FileContentCache = {
  path: "",
  content: "",
};

export const DocumentParser = {
  async getDocument(props: {
    author: string;
    slug: string;
    language: string | undefined;
  }): Promise<IDocument> {
    const link =
      props.language === "en"
        ? `${props.author}/${props.slug}`
        : `${props.author}/${props.slug}_${props.language}`;
    let fileContent = "";

    const path = `/documents/${link}.md`;
    if (FileContentCache.path === path) {
      fileContent = FileContentCache.content;
    } else {
      fileContent = await fetch(path).then((res) => res.text());
    }
    FileContentCache.path = path;
    FileContentCache.content = fileContent;

    const frontMatter = extractFrontMatterFromMarkdown(fileContent);
    const dom = await convertMarkdownToDom(fileContent);
    const info = extraInfoFromDom(dom);
    const style = extractCustomCSSFromDom(dom);

    return {
      dom: dom,
      style: style,
      frontMatter: frontMatter,
      chapters: info.chapters,
      sidebar: info.sidebar,
      searchIndexes: info.searchIndexes,
    };

    function extraInfoFromDom(dom: HTMLDivElement) {
      const headings = dom.querySelectorAll("h1,h2,h3,h4,h5,h6");
      const pageSlugCounts: Record<string, number> = {};
      const sectionSlugCounts: Record<string, number> = {};

      const chapters: Array<IChapterInfo> = [];
      const sidebar: ISidebar = {
        root: [],
        categories: {},
      };

      const searchIndexes: Array<ISearchIndex> = [];

      let lastH1: Element | null = null;
      headings.forEach((h) => {
        const initialPageContent = h.textContent;
        const titles = initialPageContent?.split("|");
        const pageTitle = titles?.[0]?.trim() ?? "";
        const headingTitle = titles?.[1]?.trim() ?? "";
        const headingSlug = kebabCase(pageTitle ?? "");

        const preview = getFirstTextContentAfter(h);

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
          chapters.push({
            id: id,
            text: pageTitle,
            originalText: initialPageContent,
          });
          searchIndexes.push({
            id: id,
            label: pageTitle,
            group: pageTitle,
            preview: preview,
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
            preview: preview,
            path: `${lastH1?.id}#${id}` ?? "",
          });
        }
      });
      return { chapters, sidebar, searchIndexes };
    }

    function extractFrontMatterFromMarkdown(fileContent: string) {
      const frontMatter = parseFrontMatter(fileContent) as IDocFrontMatter;

      return frontMatter;
    }

    function extractCustomCSSFromDom(dom: HTMLDivElement) {
      return dom.querySelector("style")?.innerHTML ?? "";
    }

    async function convertMarkdownToDom(fileContent: string) {
      const html = await MarkdownParser.toHtml(fileContent);

      const dom = document.createElement("div");
      dom.innerHTML = html;

      return dom;
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
  },

  async getChapter(props: {
    author: string;
    slug: string;
    chapterId: string;
    language: string | undefined;
  }): Promise<IChapter> {
    const document = await DocumentParser.getDocument({
      author: props.author,
      slug: props.slug,
      language: props.language,
    });
    const chapterId = props.chapterId ?? document.chapters[0]?.id;
    const { currentChapterIndex, currentChapter } = getCurrentChapter(
      document,
      chapterId
    );
    const previousChapter = getPreviousChapterInfo(
      currentChapterIndex,
      document
    );
    const nextChapter = getNextChapterInfo(currentChapterIndex, document);
    const chapter = getChapterContent(document, chapterId, nextChapter);
    const tableOfContent = getTableOfContent(chapter.html);

    return {
      style: document.style,
      html: chapter.html,
      chapterToc: tableOfContent,
      numberOfChapters: document.chapters.length,
      sidebar: document.sidebar,
      frontMatter: document.frontMatter,
      numberOfWordsInChapter: chapter.numberOfWords,
      searchIndexes: document.searchIndexes,
      currentChapter: {
        id: currentChapter?.id || null,
        text: currentChapter?.text || null,
        originalText: currentChapter?.originalText || null,
        description: chapter.preview,
      },
      previousChapter: previousChapter,
      nextChapter: nextChapter,
    };

    function addImgCaptionsToDom(dom: HTMLDivElement) {
      dom.querySelectorAll("img").forEach((img) => {
        const html = img.outerHTML;
        img.outerHTML = `<figure class="document-image">${html}<figcaption>${img.alt}</figcaption></figure>`;
      });
    }

    function getChapterContent(
      document: IDocument,
      chapterId: string,
      nextChapter: IChapterInfo
    ) {
      const currentChapterHeading = document.dom.querySelector(
        `h1[id="${chapterId}"]`
      );

      const elements = getAllNextSiblingUntilSelector(
        currentChapterHeading,
        nextChapter ? `[id="${nextChapter.id}"]` : undefined
      );

      const preview = getFirstTextContentAfter(currentChapterHeading);

      addImgCaptionsToDom(document.dom);

      let chapterHtml = "";
      let words = "";

      elements.forEach((e) => {
        chapterHtml += e.outerHTML;
        words += e.textContent;
      });

      const numberOfWords = words.split(" ").length;
      return { html: chapterHtml, numberOfWords, preview: preview };
    }

    function getNextChapterInfo(
      currentChapterIndex: number,
      document: IDocument
    ) {
      const nextChapterIndex = currentChapterIndex + 1;
      const nextChapter = document.chapters[nextChapterIndex];
      return nextChapter;
    }

    function getPreviousChapterInfo(
      currentChapterIndex: number,
      document: IDocument
    ) {
      const previousChapterIndex = currentChapterIndex + -1;
      const previousChapter = document.chapters[previousChapterIndex];
      return previousChapter;
    }

    function getCurrentChapter(document: IDocument, chapterIdToUse: string) {
      const currentChapterIndex = document.chapters.findIndex(
        (c) => c.id === chapterIdToUse
      );
      const currentChapter = document.chapters[currentChapterIndex];
      return { currentChapterIndex, currentChapter };
    }

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

    function getTableOfContent(html: string) {
      const dom = window.document.createElement("div");
      dom.innerHTML = html;
      const tableOfContent: Array<{ id: string; text: string; level: number }> =
        [];

      dom.querySelectorAll("h2,h3").forEach((h) => {
        const id = h.id;
        const level = h.tagName.split("H")[1];
        const text = h.textContent?.split("#").join("") ?? "";

        tableOfContent.push({ id, text, level: parseInt(level, 10) });
      });

      return tableOfContent;
    }
  },
};

function getFirstTextContentAfter(elem: Element | undefined | null) {
  if (!elem) {
    return "";
  }

  let currentElement = elem?.nextElementSibling;

  while (currentElement) {
    const textContent = currentElement.textContent?.trim();

    const isValidElement =
      currentElement.nodeName === "P" || currentElement.nodeName === "UL";
    if (textContent && isValidElement) {
      return textContent;
    }
    currentElement = currentElement.nextElementSibling;
  }
  return "";
}
