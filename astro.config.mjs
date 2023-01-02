import { defineConfig } from "astro/config";
import criticalCSS from "./lib";

// https://astro.build/config
export default defineConfig({
  integrations: [criticalCSS()],
});
