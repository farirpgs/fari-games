import { IShop, IShopProductWithAuthor } from "./types/IShopProduct";

export const shop: IShop = {
  authors: [
    {
      name: "Fari Games",
      slug: "fari-games",
      links: {
        twitter: "https://twitter.com/RPDeshaies",
      },
      products: [
        {
          featured: true,
          name: "Charge RPG",
          slug: "charge-rpg",
          document: true,
          description: "Ready to use generic RPG system.",
          tags: ["charge-rpg", "ttrpg", "main"],
          image: "https://gyazo.com/a8db97f79b14526c0458286383d40d91.png",
          links: {
            itchIo: "https://farigames.itch.io/charge-rpg",
          },
        },
      ],
    },
    {
      name: "Gila RPGs",
      slug: "gilarpgs",
      links: {
        twitter: "https://twitter.com/gilarpgs",
      },
      products: [
        {
          featured: true,
          name: "Lumen",
          slug: "lumen",
          document: true,
          description: "RPG system for action packed, power fantasy games.",
          tags: ["lumen", "ttrpg", "main"],
          image: "https://gyazo.com/047b237d11168d35c52912e0f64ae096.png",
          links: {
            itchIo: "https://gilarpgs.itch.io/lumen",
          },
        },
      ],
    },
    {
      name: "Evil Hat Productions",
      slug: "evilhat",
      links: {
        twitter: "https://twitter.com/EvilHatOfficial",
      },
      products: [
        {
          featured: true,
          name: "Fate Condensed",
          slug: "fate-condensed",
          document: true,

          description:
            "The latest version of the Fate System. Compact, stand-alone and streamlined for clarity and ease of reference.",
          tags: ["fate", "ttrpg", "main"],
          image: "https://gyazo.com/4ea53966f3171861e0773fe111a7a3e7.png",
          links: {
            itchIo: "https://evilhat.itch.io/fate-condensed",
            driveThru:
              "https://www.drivethrurpg.com/product/302571/Fate-Condensed",
          },
        },
        {
          featured: false,
          name: "Fate Accelerated",
          slug: "fate-accelerated",
          document: true,

          description:
            "If you want to get started quickly, this dialed-down version of Fate Core will get you going in no time.",
          tags: ["fate", "ttrpg"],
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
          description:
            "A Complete guide to Fate with rules, examples and tips. A most if your thirst for knowledge was not satisfied with Fate Condensed.",
          tags: ["fate", "ttrpg"],
          image: "https://gyazo.com/1f05a1e981dcec344f124f8e39b4f972.png",
          links: {
            itchIo: "https://evilhat.itch.io/fate-core",
            driveThru:
              "https://www.drivethrurpg.com/product/114903/Fate-Core-System",
          },
        },
        {
          featured: false,
          name: "Fate System Toolkit",
          slug: "fate-system-toolkit",
          document: true,
          description:
            "This expansion for the Fate Core System contains tons of flexible, hackable and adaptable rules that fits any world you are trying to play in.",
          tags: ["fate", "ttrpg"],
          image: "https://gyazo.com/856d366d726b4c5edc8d8fd505a7af9a.png",
          links: {
            itchIo: "https://evilhat.itch.io/fate-system-toolkit",
            driveThru:
              "https://www.drivethrurpg.com/product/119385/Fate-System-Toolkit",
          },
        },
        {
          featured: false,
          name: "Fate Adversary Toolkit",
          slug: "fate-adversary-toolkit",
          document: true,
          description:
            "What ever the genre, this book gives you the tools you need to create great obstacles for you stories.",
          tags: ["fate", "ttrpg"],
          image: "https://gyazo.com/02c73c31e5bd4c874c31ee476198cec1.png",
          links: {
            itchIo: "https://evilhat.itch.io/fate-adversary-toolkit",
            driveThru:
              "https://www.drivethrurpg.com/product/219203/Fate-Adversary-Toolkit",
          },
        },
      ],
    },
    {
      name: "Jason Tocci",
      slug: "jasontocci",

      links: {
        twitter: "https://twitter.com/pretendogames",
      },
      products: [
        {
          featured: true,
          name: "24XX",
          slug: "24xx",
          document: true,

          description: "A lo-fi sci-fi RPG SRD.",
          tags: ["24xx", "ttrpg", "main"],
          image: "https://gyazo.com/0c6a155c170ada7f5fe316908b663967.png",
          links: {
            itchIo: "https://jasontocci.itch.io/24xx",
            driveThru:
              "https://www.drivethrurpg.com/product/335307/24XX-SRD?manufacturers_id=17901",
          },
        },
      ],
    },
    {
      name: "Aryl Ether",
      slug: "aryl-ether",
      links: {
        twitter: "https://twitter.com/Aryl_Ether",
      },
      products: [
        {
          featured: true,
          name: "Guided by the Sun",
          slug: "guided-by-the-sun",
          document: true,

          description:
            "A GM-less, card-based system, where players tell the story of a protagonist undertaking a journey and making friends along the way.",
          tags: ["24xx", "ttrpg", "main"],
          image: "https://gyazo.com/122ae6210bcd519928bc297267593423.png",
          links: {
            itchIo: "https://aryl-ether.itch.io/guided-by-the-sun",
          },
        },
      ],
    },
    {
      name: "Rowan, Rook and Decard",
      slug: "rowan-rook-and-decard",
      links: {
        twitter: "https://twitter.com/gshowitt",
        website: "rrdgames.com",
      },
      products: [
        {
          featured: true,
          name: "The Resistance Toolbox",
          slug: "resistance-toolbox",
          document: true,

          description:
            "Make your own games of desperate struggle using the Resistance System, the core rules that power the Spire RPG.",
          tags: ["resistance", "ttrpg", "main"],
          image: "https://gyazo.com/a8c7868751ecb508bfefe3f6e010b2a9.jpg",
          links: {},
        },
      ],
    },
    {
      name: "Peach Garden Games",
      slug: "peachgardengames",
      links: {
        website: "http://www.peachgardengames.com",
        twitter: "https://twitter.com/peachgardenrpgs",
      },
      products: [
        {
          featured: true,
          name: "Harmony Drive",
          slug: "harmony-drive",
          document: true,

          description:
            "Build a campaign-style adventure TTRPG, one that lets players express themselves, work together, and make difficult choices, this is the system for you!",
          tags: ["ttrpg", "main"],
          image: "https://gyazo.com/d162a60038bed03bcb97ea19ba931a98.png",
          links: {
            itchIo: "https://peachgardengames.itch.io/harmony-drive",
          },
        },
        {
          featured: true,
          name: "Carta",
          slug: "carta",
          document: true,
          description: "A Toolkit For Making Exploration Games.",
          tags: ["ttrpg", "main"],
          image: "https://gyazo.com/106826ea4cbde0930e918551a63d7b4d.png",
          links: {
            itchIo: "https://peachgardengames.itch.io/carta-srd",
          },
        },
      ],
    },
    {
      name: "Gamenomicon",
      slug: "gamenomicon",
      links: {
        website: "https://www.gamenomicon.com/",
        twitter: "https://twitter.com/the_gamenomicon",
      },
      products: [
        {
          featured: true,
          name: "Second Guess System",
          slug: "second-guess-system",
          document: true,
          description: "Power your solo role-playing games.",
          tags: ["ttrpg", "main"],
          image: "https://gyazo.com/6586967082cf5b9c58d9023e57efc5d3.jpg",
          links: {
            itchIo: "https://gamenomicon.itch.io/second-guess-system-srd",
          },
        },
      ],
    },
  ],
};

export const shopProducts: Array<IShopProductWithAuthor> = shop.authors.flatMap(
  (a) => {
    return a.products.map((p): IShopProductWithAuthor => {
      return {
        ...p,
        author: a,
      };
    });
  }
);
