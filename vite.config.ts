import react from "@vitejs/plugin-react";
import { defineConfig, Plugin } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), reloadOnMarkdownChange()],

  server: {
    open: true,
    port: 1235,
  },
});

// TODO: move back to using `import("/public/documents/*/*.md?raw"),` when this issue is done https://github.com/vitejs/vite/issues/3222#issuecomment-917617647
function reloadOnMarkdownChange() {
  const plugin: Plugin = {
    name: "reload",
    handleHotUpdate({ file, server }) {
      if (file.endsWith(".md")) {
        server.ws.send({
          type: "full-reload",
          path: "*",
        });
      }
    },
  };
  return plugin;
}
