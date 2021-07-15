import reactRefresh from "@vitejs/plugin-react-refresh";
import legacy from "@vitejs/plugin-legacy";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],

  server: {
    open: true,
    port: 1235,
  },
});
