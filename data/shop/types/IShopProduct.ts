export type IShop = {
  authors: Array<IShopAuthor>;
};

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
  featured?: boolean;
  document?: boolean;
  affiliate?: boolean;
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
