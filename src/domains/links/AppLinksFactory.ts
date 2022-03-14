import {
  IShopProductWithAuthor,
  ProductTypeEnum,
} from "../../../data/shop/types/IShopProduct";

export const AppLinksFactory = {
  makeHomeLink() {
    return "/";
  },
  makeBrowseLink() {
    return "/browse";
  },
  makeAuthorLink(product: IShopProductWithAuthor | undefined) {
    if (!product) {
      return "";
    }
    return `/browse/${product.author.slug}`;
  },
  makeProductBrowseLink(product: IShopProductWithAuthor | undefined) {
    if (!product) {
      return "";
    }
    return `/browse/${product.author.slug}/${product.slug}`;
  },
  makeProductLink(props: {
    author: string;
    type: ProductTypeEnum | undefined;
    game: string;
    language?: string;
  }) {
    if (!props.type) {
      return "";
    }
    const category = `${props.type.toLowerCase()}s`;
    if (!props.language || props.language === "en") {
      return `/en/${category}/${props.author}/${props.game}`;
    }
    return `/${props.language}/${category}/${props.author}/${props.game}`;
  },
  makeSearchPage(query: string) {
    return `/search?query=${query}`;
  },
  makeGameChapterLink(props: {
    author: string;
    game: string;
    chapter: string;
    language?: string;
  }) {
    if (!props.language || props.language === "en") {
      return `/en/srds/${props.author}/${props.game}/${props.chapter}`;
    }
    return `/${props.language}/srds/${props.author}/${props.game}/${props.chapter}`;
  },
};
