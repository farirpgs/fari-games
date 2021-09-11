export const gameDocuments: Record<
  string,
  () => Promise<typeof import("*?raw")>
> = {
  "fari-games/charge-rpg": () => import("./fari-games/charge-rpg.md?raw"),
  "evilhat/fate-condensed": () => import("./evilhat/fate-condensed.md?raw"),
  "gilarpgs/lumen": () => import("./gilarpgs/lumen.md?raw"),
  "jasontocci/24xx": () => import("./jasontocci/24xx.md?raw"),
};
