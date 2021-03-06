import * as path from "path";

export const src = {
  static: resolve("build"),
  favicon: resolve("build/favicon.ico"),
  notFound: resolve("build/not-found-index.html"),
  unauthorized: resolve("build/unauthorized-index.html"),
};

export function resolve(...paths: string[]) {
  return path.join(__dirname, "..", ...paths);
}
