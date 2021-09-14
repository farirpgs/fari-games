import kebabCase from "lodash/kebabCase";
import { gameDocuments } from "../../../data/game-documents/gameDocuments";
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
  title?: string;
  description?: string;
  author?: string;
  fonts?: string;
  headingFont?: string;
  textFont?: string;
  highlightFont?: string;
  headingUppercase?: string;
  image?: string;
  itch?: string;
  website?: string;
  widget?: string;
  version?: string;
  languages?: string;
};

export type IChapter = {
  html: string;
  style: string;
  frontMatter?: IDocFrontMatter;
  numberOfWordsInChapter: number;
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
    description: string | null;
  };
  previousChapter: {
    id: string | null;
    text: string | null;
  } | null;
  nextChapter: {
    id: string | null;
    text: string | null;
  } | null;
};

export type IDocument = {
  dom: HTMLDivElement;
  style: string;
  frontMatter: IDocFrontMatter;
  chapters: Array<{ id: string; text: string | null }>;
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

const previewTextSelector = "p:not(:empty),ul:not(:empty)";

export class DocumentParser {
  static async getDocument(props: {
    author: string;
    slug: string;
    language: string | undefined;
  }): Promise<IDocument> {
    const link = props.language
      ? `${props.author}/${props.slug}_${props.language}`
      : `${props.author}/${props.slug}`;
    const { default: fileContent } = await gameDocuments[link]();

    const frontMatter =
      DocumentParser.extractFrontMatterFromMarkdown(fileContent);

    const dom = await DocumentParser.convertMarkdownToDom(fileContent);

    const info = DocumentParser.extraInfoFromDom(dom);

    DocumentParser.addImgCaptionsToDom(dom);

    const style = DocumentParser.extractCustomCSSFromDom(dom);

    return {
      dom: dom,
      style: style,
      frontMatter: frontMatter,
      chapters: info.chapters,
      sidebar: info.sidebar,
      searchIndexes: info.searchIndexes,
    };
  }

  private static extraInfoFromDom(dom: HTMLDivElement) {
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
        getFirstSiblingUntilSelector(
          h,
          previewTextSelector
        )?.textContent?.trim() ?? "";

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
    return { chapters, sidebar, searchIndexes };
  }

  private static async convertMarkdownToDom(fileContent: string) {
    const html = await MarkdownParser.toHtml(fileContent);

    const dom = document.createElement("div");
    dom.innerHTML = html;

    return dom;
  }

  private static extractFrontMatterFromMarkdown(fileContent: string) {
    const frontMatter = parseFrontMatter(fileContent) as IDocFrontMatter;

    if (!frontMatter.title) {
      console.warn("Missing Document `title`");
    }
    if (!frontMatter.author) {
      console.warn("Missing Document `author`");
    }
    if (!frontMatter.image) {
      console.warn("Missing Document `image`");
    }
    return frontMatter;
  }

  private static extractCustomCSSFromDom(dom: HTMLDivElement) {
    return dom.querySelector("style")?.innerHTML ?? "";
  }

  private static addImgCaptionsToDom(dom: HTMLDivElement) {
    dom.querySelectorAll("img").forEach((img) => {
      const html = img.outerHTML;
      img.outerHTML = `<figure class="document-image">${html}<figcaption>${img.alt}</figcaption></figure>`;
    });
  }

  static async getChapter(props: {
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
    const { currentChapterIndex, currentChapter } =
      DocumentParser.getCurrentChapter(document, chapterId);
    const previousChapter = DocumentParser.getPreviousChapter(
      currentChapterIndex,
      document
    );
    const nextChapter = DocumentParser.getNextChapter(
      currentChapterIndex,
      document
    );

    const chapter = DocumentParser.getChapterContent(
      document,
      chapterId,
      nextChapter
    );

    const tableOfContent = getTableOfContent(chapter.html);

    return {
      style: document.style,
      html: chapter.html,
      chapterToc: tableOfContent,
      sidebar: document.sidebar,
      frontMatter: document.frontMatter,
      numberOfWordsInChapter: chapter.numberOfWords,
      searchIndexes: document.searchIndexes,
      currentChapter: {
        id: currentChapter?.id || null,
        text: currentChapter?.text || null,
        description: chapter.preview,
      },
      previousChapter: previousChapter,
      nextChapter: nextChapter,
    };
  }

  private static getChapterContent(
    document: IDocument,
    chapterId: string,
    nextChapter: { id: string; text: string | null }
  ) {
    const currentChapterHeading = document.dom.querySelector(`h1#${chapterId}`);

    const elements = getAllNextSiblingUntilSelector(
      currentChapterHeading,
      nextChapter ? `#${nextChapter.id}` : undefined
    );

    const currentChapterPreview =
      getFirstSiblingUntilSelector(
        currentChapterHeading,
        previewTextSelector
      )?.textContent?.trim() ?? "";

    let chapterHtml = "";
    let words = "";

    elements.forEach((e) => {
      chapterHtml += e.outerHTML;
      words += e.textContent;
    });

    const numberOfWords = words.split(" ").length;
    return { html: chapterHtml, numberOfWords, preview: currentChapterPreview };
  }

  private static getNextChapter(
    currentChapterIndex: number,
    document: IDocument
  ) {
    const nextChapterIndex = currentChapterIndex + 1;
    const nextChapter = document.chapters[nextChapterIndex];
    return nextChapter;
  }

  private static getPreviousChapter(
    currentChapterIndex: number,
    document: IDocument
  ) {
    const previousChapterIndex = currentChapterIndex + -1;
    const previousChapter = document.chapters[previousChapterIndex];
    return previousChapter;
  }

  private static getCurrentChapter(
    document: IDocument,
    chapterIdToUse: string
  ) {
    const currentChapterIndex = document.chapters.findIndex(
      (c) => c.id === chapterIdToUse
    );
    const currentChapter = document.chapters[currentChapterIndex];
    return { currentChapterIndex, currentChapter };
  }
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
  });

  return tableOfContent;
}
