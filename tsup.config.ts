import { defineConfig } from "tsup"

export default defineConfig({
  dts: true,
  format: ["cjs", "esm"],
  entry: ["lib/index.ts"],
  outDir: "lib/dist",
})