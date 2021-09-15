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
    return `/browse/${game.authorSlug}`;
  },
  makeProductLink(game: IShopProduct | undefined) {
    if (!game) {
      return "";
    }
    return `/browse/${game.authorSlug}/${game.slug}`;
  },
  makeGameLink(props: { author: string; game: string; language?: string }) {
    if (!props.language || props.language === "en") {
      return `/games/en/${props.author}/${props.game}`;
    }
    return `/games/${props.language}/${props.author}/${props.game}`;
  },
  makeGameChapterLink(props: {
    author: string;
    game: string;
    chapter: string;
    language?: string;
  }) {
    if (!props.language || props.language === "en") {
      return `/games/en/${props.author}/${props.game}/${props.chapter}`;
    }
    return `/games/${props.language}/${props.author}/${props.game}/${props.chapter}`;
  },
};
