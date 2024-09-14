import type { AstroIntegration } from "astro";
import { fileURLToPath } from "node:url";
import { statSync } from "node:fs";
import { join } from "node:path";
import { generate, type GenerateFuncArgs } from "critical";
import * as fg from "fast-glob";
import { writeFile } from "node:fs/promises";
import debug from "debug";

const log = debug("astro-critical-css");

export type PluginOptions = Omit<
  GenerateFuncArgs,
  "src" | "base" | "inline"
> & {
  /** silence console output */
  silent?: boolean;
};

export default ({
  silent,
  ...options
}: Partial<PluginOptions> | undefined = {}): AstroIntegration => {
  log("Options: %o", options);
  return {
    name: "critical-css",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        let htmlInputSize = 0;
        let htmlOutputSize = 0;
        let fileCount = 0;
        const distPath = fileURLToPath(dir);
        const htmlPathsStream = fg.stream("**/*.html", { cwd: distPath });
        const startTime = Date.now();
        log("🪄 Starting: Inlining CSS in path %s", distPath);
        for await (const htmlPath of htmlPathsStream) {
          const htmlFilePath = join(distPath, htmlPath.toString());
          if (!silent) console.log("🧷 Inlining =>", htmlFilePath);
          const initialSize = statSync(htmlFilePath).size;
          htmlInputSize += initialSize;
          fileCount++;

          const results = await generate({
            inline: true,
            src: htmlFilePath,
            base: distPath,
            ...options,
          }).catch((err) => ({ error: err }));

          checkError(results);

          let html = "html" in results ? results.html : "";
          const htmlData = Buffer.from(html, "utf-8");
          htmlOutputSize += htmlData.length;
          log(
            "Html difference in bytes +/-: %d",
            htmlData.length - initialSize
          );
          await writeFile(htmlFilePath, htmlData);
        }
        
        logSummary(htmlInputSize, htmlOutputSize, startTime);
        if (!silent) {
          console.log(
            "HTML bytes (in & out) %skB & %skB, (+/- %skB)",
            (htmlInputSize / 1024).toLocaleString(),
            (htmlOutputSize / 1024).toLocaleString(),
            ((htmlOutputSize - htmlInputSize) / 1024).toLocaleString()
          );
          console.log(
            "🪄 Done: Inlined CSS in %d file(s) in %d sec using options: %o",
            fileCount,
            (Date.now() - startTime) / 1000,
            options,
          );
        }
      },
    },
  };
};

function checkError(results: unknown) {
  if (results && typeof results === "object" && "error" in results) {
    console.error("Error inlining CSS:", results?.error);
    log("Error inlining CSS: %o", results?.error);
    throw results.error;
  }
}

function logSummary(htmlInputSize: number, htmlOutputSize: number, startTime: number) {
  const endTime = Date.now();
  log("HTML input size: %s bytes", htmlInputSize.toLocaleString());
  log("HTML output size: %s bytes", htmlOutputSize.toLocaleString());
  log(
    "HTML difference in bytes +/-: %s",
    (htmlOutputSize - htmlInputSize).toLocaleString()
  );
  log("✅ Done: Inlining CSS in %d sec.", endTime - startTime);
  return endTime;
}

