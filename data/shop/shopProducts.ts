import { IShopProduct } from "./types/IShopProduct";

/**
 * Rooted in Trophy (Drake)
 * Descended From the Queen (Drake)
 * Ironsworn (Drake)
 * Lost & Found (Drake)
 *
 * Carta SRD
 * Harmony Drive SRD
 * Lady Blackbird
 * Eclipse Phase
 * Gumshoe
 *
 * Paragon System
 */

export const shopProducts: Array<IShopProduct> = [
  {
    featured: true,
    name: "Charge RPG",
    slug: "charge-rpg",
    author: "René-Pier Deshaies",
    authorSlug: "rpdeshaies",
    document: true,
    description: "Power Your Story Telling",
    tags: ["charge-rpg", "ttrpg", "main"],
    rating: 0,
    image: "https://gyazo.com/402b81ebf877834948003b092e6ac384.png",
    links: {
      itchIo: "https://rpdeshaies.itch.io/charge-rpg",
    },
  },
  {
    featured: true,
    name: "Lumen",
    slug: "lumen",
    author: "Gila RPGs",
    authorSlug: "gilarpgs",
    document: true,
    description: "RPG system for action packed, power fantasy games",
    tags: ["lumen", "ttrpg", "main"],
    rating: 0,
    image: "https://gyazo.com/047b237d11168d35c52912e0f64ae096.png",
    links: {
      itchIo: "https://gilarpgs.itch.io/lumen",
    },
  },
  {
    featured: true,
    name: "Fate Condensed",
    slug: "fate-condensed",
    document: true,
    author: "Evil Hat Productions",
    authorSlug: "evilhat",
    description:
      "The latest version of the Fate System. Compact, stand-alone and streamlined for clarity and ease of reference.",
    tags: ["fate", "ttrpg", "main"],
    rating: 0,
    image: "https://gyazo.com/4ea53966f3171861e0773fe111a7a3e7.png",
    links: {
      itchIo: "https://evilhat.itch.io/fate-condensed",
      driveThru: "https://www.drivethrurpg.com/product/302571/Fate-Condensed",
    },
  },
  {
    featured: false,
    name: "Fate Accelerated",
    slug: "fate-accelerated",
    document: true,
    author: "Evil Hat Productions",
    authorSlug: "evilhat",
    description:
      "If you want to get started quickly, this dialed-down version of Fate Core will get you going in no time.",
    tags: ["fate", "ttrpg"],
    rating: 0,
    image: "https://gyazo.com/09fb7c1d535adf4332c311cca88f68ca.png",
    links: {
      itchIo: "https://evilhat.itch.io/fate-accelerated",
      driveThru:
        "https://www.drivethrurpg.com/product/114902/Fate-Accelerated-Edition-o-A-Fate-Core-Build",
    },
  },
  {
    featured: false,
    name: "Fate Core",
    slug: "fate-core",
    document: true,
    author: "Evil Hat Productions",
    authorSlug: "evilhat",
    description:
      "A Complete guide to Fate with rules, examples and tips. A most if your thirst for knowledge was not satisfied with Fate Condensed.",
    tags: ["fate", "ttrpg"],
    rating: 0,
    image: "https://gyazo.com/1f05a1e981dcec344f124f8e39b4f972.png",
    links: {
      itchIo: "https://evilhat.itch.io/fate-core",
      driveThru: "https://www.drivethrurpg.com/product/114903/Fate-Core-System",
    },
  },
  {
    featured: true,
    name: "24XX",
    slug: "24xx",
    document: true,
    author: "Jason Tocci",
    authorSlug: "jasontocci",
    description: "",
    tags: ["24xx", "ttrpg", "main"],
    rating: 0,
    image: "https://gyazo.com/0c6a155c170ada7f5fe316908b663967.png",
    links: {
      itchIo: "https://jasontocci.itch.io/24xx",
      driveThru:
        "https://www.drivethrurpg.com/product/335307/24XX-SRD?manufacturers_id=17901",
    },
  },
];
