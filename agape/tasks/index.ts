import { prepare, getTsLibVersion } from "mapineda48-util";
import {
  name,
  version,
  main,
  author,
  license,
  bugs,
  repository,
  dependencies,
  publishConfig,
} from "../package.json";

const inDocker = process.argv.includes("--docker");

const homepage = "https://github.com/mapineda48/njs/tree/master/agape#readme";

const dep = prepare.dep.withTs(dependencies);

const distDep = dep.select(["tslib", "jsonwebtoken"]);

const peerDep = dep.select(["express", "pg"]);

prepare()
  .copy(["build", "README.md", "CHANGELOG.md", "LICENSE"])
  .package({
    name,
    version,
    author,
    license,
    bugs,
    repository,
    main,
    homepage,
    publishConfig,
    ...(inDocker
      ? {
          main: "bin/index.js",
          scripts: {
            start: "node bin/index.js",
          },
          dependencies: {
            ...distDep,
            ...peerDep,
            ...dep.select(["morgan"]),
          },
        }
      : {
          dependencies: distDep,
          peerDependencies: {
            ...peerDep,
            ...dep.select(["@types/express", "@types/pg"]),
          },
          peerDependenciesMeta: dep.select.meta([
            "@types/pg",
            "@types/express",
          ]),
        }),
  })
  .complete()
  .catch((err) => console.log(err));
