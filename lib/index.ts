import type { AstroIntegration } from "astro";
import { fileURLToPath } from "node:url";
import { statSync } from "node:fs";
import { join } from "node:path";
import { generate, type GenerateFuncArgs } from "critical";
import fg from "fast-glob";
import { writeFile } from "node:fs/promises";
import debug from "debug";

const log = debug("astro-plugin-critical-css");

type PluginOptions = Omit<GenerateFuncArgs, "src" | "base" | "inline"> & {
  /** silence console output */
  quiet?: boolean;
};

export default (
  options: PluginOptions | undefined = {}
): AstroIntegration => {
  return {
    name: "critical-css",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        let totalInputSize = 0;
        let totalOutputSize = 0;
        let fileCount = 0;
        const distPath = fileURLToPath(dir);
        const htmlPathsStream = fg.stream("**/*.html", { cwd: distPath });
        const startTime = Date.now();
        log("🪄 Starting: Inlining CSS in path %s", distPath);
        for await (const htmlPath of htmlPathsStream) {
          const path = join(distPath, htmlPath.toString());
          if (!options.quiet) console.log("🧷 Inlining =>", path);
          const initialSize = statSync(path).size;
          totalInputSize += initialSize;
          fileCount++;
          // Execute critical generate
          const { html } = await generate({
            inline: true,
            src: path,
            base: distPath,
            ...options,
          });
          const htmlData = Buffer.from(html, "utf-8");
          totalOutputSize += htmlData.length;
          log("Html difference in bytes +/-: %d", htmlData.length - initialSize);
          await writeFile(path, htmlData);
        }
        const endTime = Date.now();
        log("Total input size: %s bytes", totalInputSize.toLocaleString());
        log("Total output size: %s bytes", totalOutputSize.toLocaleString());
        log("Total difference in bytes +/-: %s", (totalOutputSize - totalInputSize).toLocaleString());
        log("✅ Done: Inlining CSS in %d sec.", endTime - startTime);
        if (!options.quiet) {
          console.log("Total bytes input & output (difference): %skB & %skB, (+/- %skB)", (totalInputSize/1024).toLocaleString(), (totalOutputSize/1024).toLocaleString(), ((totalOutputSize - totalInputSize)/1024).toLocaleString());
          console.log("Done: Inlined CSS in %d file(s) in %d sec.", fileCount, (endTime - startTime) / 1000);
        }
      },
    },
  };
};
