import path from "path";
import fs from "fs-extra";
import glob from "glob";

glob.sync("dist/build/**/*.ico").forEach((file) => {
  const _file = path.resolve(file);

  fs.removeSync(_file);
});