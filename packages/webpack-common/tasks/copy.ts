import path from "path";
import fs from "fs-extra";

const files: File[] = [];

files.push({
  src: "README.md",
  dest: "dist/README.md",
});

files.push({
  src: "CHANGELOG.md",
  dest: "dist/CHANGELOG.md",
});

files.push({
  src: "build",
  dest: "dist/build",
});

files.push({
  src: "src/favicon.ico",
  dest: "dist/build/favicon.ico",
});


files.forEach((file) => {
  const src = path.resolve(file.src);
  const dest = path.resolve(file.dest);

  fs.copySync(src, dest, { overwrite: true });
});

/**
 * Types
 */
interface File {
  src: string;
  dest: string;
}
