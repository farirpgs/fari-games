export const gameDocuments: Record<
  string,
  () => Promise<typeof import("*?raw")>
> = {
  "fari-games/charge-rpg": () => import("./fari-games/charge-rpg.md?raw"),
  "evilhat/fate-condensed": () => import("./evilhat/fate-condensed.md?raw"),
  "evilhat/fate-condensed_pt-br": () =>
    import("./evilhat/fate-condensed_pt-br.md?raw"),
  "evilhat/fate-accelerated": () => import("./evilhat/fate-accelerated.md?raw"),
  "evilhat/fate-core": () => import("./evilhat/fate-core.md?raw"),
  "gilarpgs/lumen": () => import("./gilarpgs/lumen.md?raw"),
  "jasontocci/24xx": () => import("./jasontocci/24xx.md?raw"),
  "aryl-ether/guided-by-the-sun": () =>
    import("./aryl-ether/guided-by-the-sun.md?raw"),
  "rowan-rook-and-decard/resistance-toolbox": () =>
    import("./rowan-rook-and-decard/resistance-toolbox.md?raw"),
};
