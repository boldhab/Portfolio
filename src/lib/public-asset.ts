export function hasPublicAsset(url?: string): url is string {
  if (!url?.startsWith("/") || url.startsWith("//")) return false;

  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require("node:fs");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const path = require("node:path");

    const publicDir = path.resolve("public");
    const filePath = path.resolve(
      publicDir,
      "." + decodeURIComponent(url.split(/[?#]/, 1)[0])
    );
    return (
      filePath.startsWith(publicDir + path.sep) &&
      !!fs.statSync(filePath, { throwIfNoEntry: false })?.isFile()
    );
  } catch {
    return false;
  }
}
