declare module "critical" {

  /* Generate function arguments - src: https://github.com/addyosmani/critical/tree/master?tab=readme-ov-file#options */
  export type GenerateFuncArgs = {
    /* Inline critical-path CSS or configure inline-critical options */
    inline?: boolean | InlineCriticalOptions;
    /* Base directory for source and destination */
    base?: string;
    /* HTML source to operate against */
    html?: string;
    /* Array of CSS file paths, file globs, Vinyl objects, or source CSS strings */
    css?: (string | unknown)[];
    /* Location of the HTML source. */
    src?: string;
    /* Location of where to save the output of an operation. Use an object with 'html' and 'css' props if you want to store both. */
    target?: string | { html?: string; css?: string, uncritical?: string };
    /* Viewport width */
    width?: number;
    /* Viewport height */
    height?: number;
    /* Array of dimensions. Takes precedence over `width` and `height` if set. */
    dimensions?: { width: number; height: number }[];
    /* Remove the inlined styles from any stylesheets referenced in the HTML.
     * It generates new references based on extracted content so it's safe to
     * use for multiple HTML files referencing the same stylesheet. Use with
     * caution. Removing the critical CSS per page results in a unique async
     * loaded CSS file for every page. Meaning you can't rely on cache across
     * multiple pages. */
    extract?: boolean;
    /* Inline images */
    inlineImages?: boolean;
    /* List of directories/urls for assets lookup */
    assetPaths?: string[];
    /* Max file size for base64 inlined images */
    maxImageFileSize?: number;
    /* Custom rebase options or function */
    rebase?: RebaseOptions | ((url: string) => string);
    /* Ignore CSS rules (array or object) */
    ignore?: (string | IgnoreOptions)[] | IgnoreOptions;
    /* Ignore inlined stylesheets */
    ignoreInlinedStyles?: boolean;
    /* User agent to use when fetching remote src */
    userAgent?: string;
    /* Penthouse configuration options */
    penthouse?: object;
    /* Configuration options for got */
    request?: object;
    /* Configuration options for CleanCSS */
    cleanCSS?: object;
    /* Basic authorization: user */
    user?: string;
    /* Basic authorization: pass */
    pass?: string;
    /* Throw error on CSS parsing errors */
    strict?: boolean;
  };

  type InlineCriticalOptions = {
    /**
     * PreloadStrategy:
     * - **default:** Move stylesheet links to the end of the document and insert preload meta tags in their place.
     * - **"body":** Move all external stylesheet links to the end of the document.
     * - **"media":** Load stylesheets asynchronously by adding `media="print"` and swap to `media="all"` once loaded (https://www.filamentgroup.com/lab/load-css-simpler/). _[JS]_
     * - **"swap":** Convert stylesheet links to preloads that swap to `rel="stylesheet"` once loaded. _[JS]_
     * - **"polyfill":** Inject [LoadCSS](https://github.com/filamentgroup/loadCSS) and use it to load stylesheets. _[JS]_
     */
    strategy?: 'default' | 'body' | 'media' | 'swap' | 'polyfill';
    /** will remove the inlined styles from any stylesheets referenced in the HTML */
    extract?: boolean;
    /** base path for extracting styles */
    basePath?: string;
    /** ignore matching stylesheets when inlining */
    ignore?: string[];
    /** defines the element used by loadCSS as a reference for inlining. */
    selector?: string;
    /** specifies position of noscript fallback ('body' - end of body, 'head' - end of head, false - no noscript) */
    noscript?: boolean | 'body' | 'head';
    /** takes an array of stylesheet hrefs to replace the original links in the document */
    replaceStylesheets?: string[];
  };
  
  type RebaseOptions = {
    from: string;
    to: string;
  } | ((url: string | unknown) => string);
  
  type IgnoreOptions = {
    /* array of ignored @rules */
    atrule?: string[];
    /* array of ignored rules (strings or regex) */
    rule?: (string | RegExp)[];
    /* function to ignore specific declarations */
    decl?: (node: any, value: string) => boolean;
  };

  export type Result = {
    css: string;
    html: string;
    uncritical: string;
  };

  export const generate: (options: GenerateFuncArgs) => Promise<Result>;
}
