import { defineConfig } from "astro/config";
import criticalCSS from "./lib";

// import vercel from "@astrojs/vercel/static";

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [criticalCSS({
    // silent: true,
    // htmlPathRegex: "**/test.html",
    height: 1080,
    width: 1920,
  })],
});
