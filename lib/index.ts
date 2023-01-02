import type { AstroIntegration } from "astro";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { generate } from "critical";
import fg from "fast-glob";
import { writeFile } from "node:fs/promises";

export default (): AstroIntegration => {
  return {
    name: "critical-css",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        const distPath = fileURLToPath(dir);
        const htmlPathsStream = fg.stream("**/*.html", { cwd: distPath });
        for await (const htmlPath of htmlPathsStream) {
          const path = join(distPath, htmlPath.toString());
          console.log("🧷 Inlining =>", path);
          // Execute critical generate
          const { html } = await generate({
            inline: true,
            src: path,
            base: distPath,
          });
          await writeFile(path, Buffer.from(html, "utf-8"));
        }
      },
    },
  };
};
