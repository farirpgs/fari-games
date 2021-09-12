import shuffle from "lodash/shuffle";
import { shopProducts } from "../../../../data/shop/shopProducts";

export const driveThruRpgAffiliateCode = `?affiliate_id=2404514`;
export const itchIoAffiliateCode = `?ac=8MQvHZMDXvG`;

export const featuredGames = shuffle(shopProducts.filter((g) => g.featured));
