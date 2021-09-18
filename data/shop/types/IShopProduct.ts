export type IShopProduct = {
  name: string;
  slug: string;
  description: string;
  author: string;
  authorSlug: string;
  image: string;
  tags: Array<string>;
  featured?: boolean;
  releaseDate?: string;
  rating: number;
  document?: boolean;
  affiliate?: boolean;
  links: {
    driveThru?: string;
    itchIo?: string;
    twitter?: string;
    gumroad?: string;
    website?: string;
  };
};
