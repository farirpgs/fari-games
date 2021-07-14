import kebabCase from "lodash/kebabCase";
import remark from "remark";
import html from "remark-html";

export type IChapter = {
  chapterHtml: string;
  documentData: Record<string, string>;
  previous: {
    id: string | null;
    text: string | null;
  };
  next: {
    id: string | null;
    text: string | null;
  };
};

export const Game = {
  async getGameContent(game: string) {
    // const { default: fileContent } = await gamesImport[game]();
    const { default: fileContent } = await import(
      `../../../_games/${game}.md?raw`
    );

    const data = parseFrontMatter(fileContent);

    const html = await markdownToHtml(fileContent);
    const dom = document.createElement("div");
    dom.innerHTML = html;

    const documentChapters = dom.querySelectorAll("h1");
    const ids: Array<string> = [];
    const headingIdCounts: Record<string, number> = {};
    documentChapters.forEach((h) => {
      const id = kebabCase(h.textContent ?? "");
      const count = headingIdCounts[id] ?? 0;
      const newCount = count + 1;
      const chapterId = count === 0 ? id : `${id}-${count}`;

      h.id = chapterId;
      ids.push(chapterId);
      headingIdCounts[id] = newCount;
    });
    const chapterIds = Object.keys(headingIdCounts);

    const documentHeadings = dom.querySelectorAll("h2,h3,h4,h5,h6");
    documentHeadings.forEach((h) => {
      const id = kebabCase(h.textContent ?? "");
      h.innerHTML = `<a id="${id}" href="#${id}" class="anchor">#</a> ${h.textContent}`;
    });

    return { dom: dom, chapterIds: chapterIds, data } as const;
  },
  async getChapter(game: string, chapterId: string): Promise<IChapter> {
    const markdown = await Game.getGameContent(game);
    const chapterIdToUse = chapterId ?? markdown.chapterIds[0];
    const previousChapterIndex =
      markdown.chapterIds.indexOf(chapterIdToUse) + -1;
    const previousChapterId = markdown.chapterIds[previousChapterIndex];

    const nextChapterIndex = markdown.chapterIds.indexOf(chapterIdToUse) + 1;
    const nextChapterId = markdown.chapterIds[nextChapterIndex];

    const currentChapterHeading = markdown.dom.querySelector(
      `#${chapterIdToUse}`
    );

    const elements = getAllNextSiblingUntilSelector(
      currentChapterHeading,
      `#${nextChapterId}`
    );
    let chapterHtml = "";
    elements.forEach((e) => {
      chapterHtml += e.outerHTML;
    });

    return {
      chapterHtml,
      documentData: markdown.data,
      previous: {
        id: previousChapterId || null,
        text:
          markdown.dom.querySelector(`#${previousChapterId}`)?.textContent ||
          null,
      },
      next: {
        id: nextChapterId || null,
        text:
          markdown.dom.querySelector(`#${nextChapterId}`)?.textContent || null,
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
