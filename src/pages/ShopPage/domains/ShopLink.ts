import { IShopProduct } from "../../../../data/shop/types/IShopProduct";

export const ShopLink = {
  makeAuthorLink(game: IShopProduct | undefined) {
    if (!game) {
      return "";
    }
    return `/shop/a/${game.authorSlug}`;
  },
  makeGameLink(game: IShopProduct | undefined) {
    if (!game) {
      return "";
    }
    return `/shop/p/${game.authorSlug}/${game.slug}`;
  },
};
