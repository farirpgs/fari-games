export type IShop = {
  authors: Array<IShopAuthor>;
};

export enum ShopCategory {
  SRD = "srds",
  Game = "games",
}

export type IShopAuthor = {
  name: string;
  slug: string;
  links: {
    twitter?: string;
    website?: string;
  };
  products: Array<IShopProduct>;
};

export type IShopProduct = {
  name: string;
  slug: string;
  description: string;
  image: string;
  tags: Array<string>;
  affiliate?: boolean;
  license?: License;
  footer?: string;
  category: ShopCategory;
  links: {
    driveThru?: string;
    itchIo?: string;
    gumroad?: string;
  };
};

export type IShopProductWithAuthor = IShopProduct & {
  author: {
    name: string;
    slug: string;
    links: {
      twitter?: string;
      website?: string;
    };
  };
};

export enum License {
  CC_BY_3 = "CC BY 3.0",
  CC_BY_4 = "CC BY 4.0",
}
