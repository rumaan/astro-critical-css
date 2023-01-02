declare module "critical" {
  type GenerateFuncArgs = {
    inline: boolean;
    base: string;
    src: string;
  };

  type Result = {
    css: string;
    html: string;
    uncritical: string;
  };

  const generate: (options: GenerateFuncArgs) => Promise<Result>;
}
