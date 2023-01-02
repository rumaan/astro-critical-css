# Astro Critical CSS Integration

Astro Integration for [Critical](https://github.com/addyosmani/critical) package which inlines critical-path CSS into HTML and lazy loads remaining CSS which can greatly improve [First Contentful Paint (FCP)](https://web.dev/fcp/).

Read more about it here: [Extracting Critical CSS](https://web.dev/extract-critical-css/).

## Installation & Usage
### Astro Add
```sh
npx astro add astro-critical-css
# or
yarn astro add astro-critical-css
```
### Manually
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

⚠️ If your project uses [Astro SSR](https://docs.astro.build/en/guides/server-side-rendering/#enabling-ssr-in-your-project) mode, this integration will only inline HTML files that pre-rendered on build. You will need to enable [`experimental.prerender`](https://docs.astro.build/en/reference/configuration-reference/#experimentalprerender) in your astro config.

## Similar Libraries
- [astro-critters](https://github.com/astro-community/astro-critters)