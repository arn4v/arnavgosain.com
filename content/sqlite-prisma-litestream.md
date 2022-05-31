---
title: "How to use Litestream with SQLite & Prisma"
publishedOn: "2022-05-31"
---

One of my side projects is [Rune](https://runereader.co), an alternative email client built for reading and annotating newsletter content.

Rune is built with Remix[^1] and uses Prisma[^2] as the ORM layer. Prisma supports quite a few databases, of which I prefer Postgres. But I wanted to keep things simple, and didn't want to set up a full-blown Postgres instance, so I decided to use SQLite.

Since since my preferred way to deploy is via Docker on Railway.app, I needed a way to persist SQLite since Docker containers are refreshed on every deployment. Litestream[^3] was the perfect tool for the job.

But since Litestream only works with SQLite's WAL journaling mode[^4], it needs to be enabled on the SQLite database before running the Remix app.

## `enable-wal.js`

```js
const { PrismaClient } = require("@prisma/client");

let client = new PrismaClient();

client.$queryRaw`PRAGMA journal_mode = WAL;`
  .then(() => {
    console.log("ENABLED WAL MODE FOR DATABASE");
  })
  .catch((err) => {
    console.log("DB SETUP FAILED", err);
    process.exit(1);
  });
```

## `run.sh`

```bash
#!/bin/bash

set -ex

## Restores the database from S3
litestream restore -v -config /etc/litestream.yml -if-replica-exists -o /data/db /data/db

## Runs migrations on the restored database
npx prisma migrate deploy

## Enables WAL Mode
node ./scripts/enable-wal.js

npx concurrently "litestream replicate -config /etc/litestream.yml" "npm run start"
```

## Dockerfile

```Dockerfile
CMD ["bash", "./scripts/run.sh"]
```

## Explanation:

1. Dockerfile runs the `run.sh` script.
2. The script first restores the latest snapshot of the database from S3 using Litestream.
3. It runs `npx prisma migrate deploy` to deploy any pending migrations.
4. Then, `enable-wal.js` is run to enable WAL journaling mode using PrismaClient's `$queryRaw`
5. Finally, the Remix app & Litestream are started concurrently using the `concurrently`[^5] CLI tool.

[^1]: https://remix.run
[^2]: https://prisma.io
[^3]: https://litestream.io
[^4]: https://sqlite.org/wal.html
[^5]: https://www.npmjs.com/package/concurrently
