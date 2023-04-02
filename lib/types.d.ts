declare module "critical" {
  export type GenerateFuncArgs = {
    inline: boolean;
    base: string;
    src: string;
  };

  export type Result = {
    css: string;
    html: string;
    uncritical: string;
  };

  export const generate: (options: GenerateFuncArgs) => Promise<Result>;
}
