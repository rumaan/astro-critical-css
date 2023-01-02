# Astro Critical CSS Integration

Astro Integration for [Critical](https://github.com/addyosmani/critical) package which inlines critical-path CSS into HTML and lazy loads remaining CSS which can greatly improve [First Contentful Paint (FCP)](https://web.dev/fcp/).

Read more about it here: [Extracting Critical CSS](https://web.dev/extract-critical-css/).

## Installation
```sh
# npm
npm install -D astro-critical-css
# yarn
yarn add -D astro-critical-css
```
In your `astro.config.mjs`:
```ts
import criticalCSS from "astro-critical-css";

export default defineConfig({
  integrations: [criticalCSS()],
});

```
During your build this integration will look at all the static HTML files and run it through [Critical](https://github.com/addyosmani/critical).

⚠️ If your project uses Astro SSR mode, this integration will only inline HTML files that pre-rendered. You will need to enable [`experimental.prerender`](https://docs.astro.build/en/reference/configuration-reference/#experimentalprerender) in your astro config.