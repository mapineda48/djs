# Welcome React PostgreSQL.

> Grettings with postgresql and react in express route..

# Usage

Containers are recommended

## Conainers

Make sure you have [docker-compose](https://docs.docker.com/compose/) installed before running the commands.

### Usage

```bash
$ cd docker-compose
```

### Production

```bash
$ docker-compose -p "welcome-react-router" -f web.yml -f model.yml -f cache.yml up -d
```

### Development

```bash
$ docker-compose -p "welcome-react-router" -f web.yml -f model.yml -f cache.yml -f development up
```

## Package

Install nodejs [package](https://docs.npmjs.com/cli/v7/commands/npm-install) with [express router](https://github.com/expressjs/express) for integration with your application.

### Configuring npm

Before installing, make sure to authenticate with GitHub Package Registry or using a `.npmrc` file. See "[Configuring npm for use with GitHub Package Registry](https://help.github.com/en/articles/configuring-npm-for-use-with-github-package-registry#authenticating-to-github-package-registry)."

```
//registry.npmjs.org/
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
@mapineda48:registry=https://npm.pkg.github.com/
```

### Data Base

Documentation [here](./model/README.md).

### Usage

```js
const http = require("http");
const express = require("express");
const { Pool } = require("pg");
const redis = require("redis");
const { createRouter } = require("@mapineda48/welcome-react-router");

const app = express();
const server = http.createServer(app);
const pool = new Pool();
const cache = redis.createClient();

/**
 * Important this middleware
 * http://expressjs.com/en/api.html#express.json
 */
app.use(express.json());

/**
 * Demo
 */
app.use(createRouter(pool, cache));
```

## License

MIT

**Free Software, Hell Yeah!**

## Disclaimer

- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
