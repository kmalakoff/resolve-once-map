# resolve-once-map

Resolves a promise only once and memoizes the result in a map.

```bash
npm install resolve-once-map
```js

## Usage

```
const resolveOnceMap = require('resolve-once-map');
const connection = resolveOnceMap(async (url) => ({ url }));
const db1 = await connection('database');
const db2 = await connection('database');
// db1 === db2

const db3 = await connection('database2');
// db1 !== db3
```

The first argument is used as the map key (after string conversion), so calls with the same key share the first Promise and its result. Rejected resolutions are also memoized.
