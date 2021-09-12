import { IShopProduct } from "../../../data/shop/types/IShopProduct";

export const AppLinksFactory = {
  makeHomeLink() {
    return "/";
  },
  makeBrowseLink() {
    return "/browse";
  },
  makeAuthorLink(game: IShopProduct | undefined) {
    if (!game) {
      return "";
    }
    return `/browse/a/${game.authorSlug}`;
  },
  makeProductLink(game: IShopProduct | undefined) {
    if (!game) {
      return "";
    }
    return `/browse/p/${game.authorSlug}/${game.slug}`;
  },
  makeGameLink(author: string, game: string, language?: string) {
    if (language === "en") {
      return `/games/${author}/${game}`;
    }
    return `/games/t/${language}/${author}/${game}`;
  },
  makeGameChapterLink(author: string, game: string, chapter: string) {
    return `/games/${author}/${game}/${chapter}`;
  },
};
