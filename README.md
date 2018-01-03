## resolve-once-map

Resolves a promise only once and memoizes the result in a map.

## Usage

```
const resolveOnceMap = require('resolve-once-map');
const { MongoClient } = require('mongodb');

const connection = resolveOnceMap((url) => MongoClient.connect(url));
const db1 = await connection('mongodb://localhost:27017/database');
const db2 = await connection('mongodb://localhost:27017/database');
// db1 === db2

const db3 = await connection('mongodb://localhost:27017/database2');
// db1 === db3
```
