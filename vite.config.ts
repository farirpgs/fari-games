import reactRefresh from "@vitejs/plugin-react-refresh";
import legacy from "@vitejs/plugin-legacy";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    // legacy({
    //   targets: ["defaults", "not IE 11"],
    // }),
  ],

  server: {
    open: true,
    port: 1235,
  },
});
