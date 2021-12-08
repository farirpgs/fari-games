import { IShop, IShopProductWithAuthor, License } from "./types/IShopProduct";

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
          name: "Charge RPG",
          slug: "charge-rpg",
          description: "Ready to use generic RPG system.",
          license: License.CC_BY_4,
          footer:
            "Text by Fari Games under a Creative Commons Attribution 4.0 license (CC BY 4.0)",
          tags: ["charge-rpg", "game"],
          image: "https://gyazo.com/db461bac8eda79fa13f2b81dc03272e3.png",
          links: {
            itchIo: "https://farigames.itch.io/charge-rpg",
          },
        },
        {
          name: "Charge SRD",
          slug: "charge-srd",
          description:
            "Power your next game with this condensed version of Charge RPG",
          license: License.CC_BY_4,
          footer:
            "Text by Fari Games under a Creative Commons Attribution 4.0 license (CC BY 4.0)",
          tags: ["charge-rpg", "srd", "new"],
          image: "https://gyazo.com/a6eabc2383f01fa9e30be8c1d64596f2.png",
          links: {
            itchIo: "https://farigames.itch.io/charge-srd",
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
          name: "Lumen",
          slug: "lumen",
          description: "RPG system for action packed, power fantasy games.",
          tags: ["lumen", "srd"],
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
          name: "Fate Condensed",
          slug: "fate-condensed",
          description:
            "The latest version of the Fate System. Compact, stand-alone and streamlined for clarity and ease of reference.",
          license: License.CC_BY_3,
          footer:
            "Text by Evil Hat Productions under a Creative Commons Attribution 3.0 license (CC BY 3.0).\n Product images are copyrighted and used here with the express permission of Evil Hat Productions, LLC.\n The Fate Core font is © Evil Hat Productions, LLC and is used with permission. The Four Actions icons were designed by Jeremy Keller.",
          tags: ["fate", "srd"],
          image: "https://gyazo.com/4ea53966f3171861e0773fe111a7a3e7.png",
          links: {
            itchIo: "https://evilhat.itch.io/fate-condensed",
            driveThru:
              "https://www.drivethrurpg.com/product/302571/Fate-Condensed",
          },
        },
        {
          name: "Fate Accelerated",
          slug: "fate-accelerated",
          description:
            "If you want to get started quickly, this dialed-down version of Fate Core will get you going in no time.",
          footer:
            "Product images are copyrighted and used here with the express permission of Evil Hat Productions, LLC. \n The Fate Core font is © Evil Hat Productions, LLC and is used with permission. The Four Actions icons were designed by Jeremy Keller.",
          tags: ["fate", "ttrpg"],
          image: "https://gyazo.com/09fb7c1d535adf4332c311cca88f68ca.png",
          links: {
            itchIo: "https://evilhat.itch.io/fate-accelerated",
            driveThru:
              "https://www.drivethrurpg.com/product/114902/Fate-Accelerated-Edition-o-A-Fate-Core-Build",
          },
        },
        {
          name: "Fate Core",
          slug: "fate-core",
          description:
            "A Complete guide to Fate with rules, examples and tips. A most if your thirst for knowledge was not satisfied with Fate Condensed.",
          footer:
            "Product images are copyrighted and used here with the express permission of Evil Hat Productions, LLC. \n The Fate Core font is © Evil Hat Productions, LLC and is used with permission. The Four Actions icons were designed by Jeremy Keller.",
          tags: ["fate", "ttrpg"],
          image: "https://gyazo.com/1f05a1e981dcec344f124f8e39b4f972.png",
          links: {
            itchIo: "https://evilhat.itch.io/fate-core",
            driveThru:
              "https://www.drivethrurpg.com/product/114903/Fate-Core-System",
          },
        },
        {
          name: "Fate System Toolkit",
          slug: "fate-system-toolkit",
          description:
            "This expansion for the Fate Core System contains tons of flexible, hackable and adaptable rules that fits any world you are trying to play in.",
          footer:
            "Product images are copyrighted and used here with the express permission of Evil Hat Productions, LLC. \n The Fate Core font is © Evil Hat Productions, LLC and is used with permission. The Four Actions icons were designed by Jeremy Keller.",
          tags: ["fate", "ttrpg"],
          image: "https://gyazo.com/856d366d726b4c5edc8d8fd505a7af9a.png",
          links: {
            itchIo: "https://evilhat.itch.io/fate-system-toolkit",
            driveThru:
              "https://www.drivethrurpg.com/product/119385/Fate-System-Toolkit",
          },
        },
        {
          name: "Fate Adversary Toolkit",
          slug: "fate-adversary-toolkit",
          description:
            "What ever the genre, this book gives you the tools you need to create great obstacles for you stories.",
          footer:
            "Product images are copyrighted and used here with the express permission of Evil Hat Productions, LLC. \n The Fate Core font is © Evil Hat Productions, LLC and is used with permission. The Four Actions icons were designed by Jeremy Keller.",
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
          name: "24XX",
          slug: "24xx",
          description: "A lo-fi sci-fi RPG SRD.",
          tags: ["24xx", "srd"],
          license: License.CC_BY_4,
          footer:
            "Text by Jason Tocci under a Creative Commons Attribution 4.0 license (CC BY 4.0)",
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
          name: "Guided by the Sun",
          slug: "guided-by-the-sun",
          description:
            "A GM-less, card-based system, where players tell the story of a protagonist undertaking a journey and making friends along the way.",
          tags: ["srd"],
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
          name: "The Resistance Toolbox",
          slug: "resistance-toolbox",
          description:
            "Make your own games of desperate struggle using the Resistance System, the core rules that power the Spire RPG.",
          tags: ["resistance", "srd"],
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
          name: "Harmony Drive",
          slug: "harmony-drive",
          description:
            "Build a campaign-style adventure TTRPG, one that lets players express themselves, work together, and make difficult choices, this is the system for you!",
          license: License.CC_BY_3,
          footer:
            "Text by Peach Garden Games under a Creative Commons Attribution 3.0 license (CC BY 3.0)",
          tags: ["srd"],
          image: "https://gyazo.com/d162a60038bed03bcb97ea19ba931a98.png",
          links: {
            itchIo: "https://peachgardengames.itch.io/harmony-drive",
          },
        },
        {
          name: "Carta",
          slug: "carta",
          description: "A Toolkit For Making Exploration Games.",
          license: License.CC_BY_3,
          footer:
            "Text by Peach Garden Games under a Creative Commons Attribution 3.0 license (CC BY 3.0)",
          tags: ["srd"],
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
          name: "Second Guess System",
          slug: "second-guess-system",
          description: "Power your solo role-playing games.",
          tags: ["srd"],
          image: "https://gyazo.com/6586967082cf5b9c58d9023e57efc5d3.jpg",
          links: {
            itchIo: "https://gamenomicon.itch.io/second-guess-system-srd",
          },
        },
      ],
    },
    {
      name: "Zadmar Games",
      slug: "zadmargames",
      links: {
        twitter: "https://twitter.com/ZadmarGames",
      },
      products: [
        {
          name: "Tricube Tales",
          slug: "tricube-tales",
          description:
            "A rules-light roleplaying system capable of handling a wide variety of genres and settings.",
          tags: ["srd"],
          license: License.CC_BY_3,
          footer:
            "Text by Zadmar Games under a Creative Commons Attribution 3.0 license (CC BY 3.0)",
          image: "https://gyazo.com/9a154286dae1b48acb1f2bd5d764c9ca.png",
          links: {
            itchIo:
              "https://itch.io/c/1589928/tricube-tales-one-page-rpgs-micro-settings",
            driveThru:
              "https://www.drivethrurpg.com/product/294202/Tricube-Tales",
          },
        },
      ],
    },
    {
      name: "Jesse Ross",
      slug: "jesse-ross",
      links: {
        twitter: "https://twitter.com/jesseross",
        website: "https://jesseross.com/",
      },
      products: [
        {
          name: "Trophy SRD",
          slug: "trophy-srd",
          description:
            "Build your own rules-light, risk-heavy games rooted in the Trophy SRD.",
          tags: ["srd"],
          license: License.CC_BY_4,
          links: {},
          image: "https://gyazo.com/30ebb7b8d6fbd922b36a904c95c89ed3.png",
          footer:
            "Text by Jesse Ross under a Creative Commons Attribution 4.0 license (CC BY 4.0)",
        },
      ],
    },
    {
      name: "Thought Police",
      slug: "thought-police",
      links: {
        twitter: "https://twitter.com/__ThoughtPolice",
      },
      products: [
        {
          name: "Motif Toolkit SRD",
          slug: "motif-toolkit-srd",
          description: "A solo play oracle, an add-on solo RPG system",
          tags: ["srd", "new"],
          license: License.CC_BY_3,
          links: {},
          image: "https://gyazo.com/8488aba599f1a0fafef849748f5137f1.png",
          footer:
            "Text by Jim Liao and Rev. Casey under a Creative Commons Attribution 3.0 license (CC BY 3.0)",
        },
      ],
    },

    {
      name: "Live Real Productions",
      slug: "live-real-productions",
      links: {
        twitter: "https://twitter.com/jwalberg4",
        website: "https://liverealproductions.com/",
      },
      products: [
        {
          name: "VEN6 Storytelling System SRD",
          slug: "ven6-storytelling-system-srd",
          description:
            "Create narrative storytelling roleplaying games with conflict mechanics and a GM option.",
          tags: ["srd", "new"],
          license: License.CC_BY_3,
          links: {
            itchIo: "https://jwalberg.itch.io/ven6-srd",
          },
          image: "https://gyazo.com/0e6746fee7e45d4da29c9cf4683770e9.jpg",
          footer:
            "Text by Live Real Productions under a Creative Commons Attribution 3.0 license (CC BY 3.0)",
        },
      ],
    },
    {
      name: "Pandion Games",
      slug: "pandion-games",
      links: {
        twitter: "https://twitter.com/PandionGames",
        website: "https://www.pandiongames.com/",
      },
      products: [
        {
          name: "Threads of Lachesis",
          slug: "threads-of-lachesis",
          description:
            "A guide to create solo games or generators with branched random prompts that the player organizes into a cohesive sequence via a single roll.",
          tags: ["srd", "new"],
          license: License.CC_BY_4,
          links: {
            itchIo: "https://pandiongames.itch.io/threadsoflachesis",
          },
          image: "https://gyazo.com/f0297d02ee6a46009767e524b12855dc.png",
          footer:
            "Text by Pandion Games under a Creative Commons Attribution 4.0 license (CC BY 4.0)",
        },
      ],
    },
    {
      name: "Uhrwerk Verlag",
      slug: "uhrwerk-verlag",
      links: {
        website: "https://www.uhrwerk-verlag.de",
        twitter: "https://twitter.com/SilentPat",
      },
      products: [
        {
          name: "Turbo-Fate",
          slug: "turbo-fate",
          description:
            "Turbo-Fate ist die deutsche Übersetzung von Fate Accelerated und eine gekürzte Form des beliebten Fate-Core-Rollenspiels.",
          tags: ["srd", "new"],
          image: "https://gyazo.com/bd23a66e8a2f25ac615af16080b7b9a0.png",
          links: {},
          footer:
            "© Uhrwerk Verlag 2015 Authorized translation of the english edition © 2015 Evil Hat. This translation is published and sold by permission of Evil Hat, the owner of all rights to publish and sell the game. Alle Rechte vorbehalten.",
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
