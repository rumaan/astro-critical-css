import { defineConfig } from "astro/config";
import criticalCSS from "./lib";

import vercel from "@astrojs/vercel/static";

// https://astro.build/config
export default defineConfig({
  integrations: [criticalCSS()],
  adapter: vercel(),
});
