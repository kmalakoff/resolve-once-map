const assert = require('assert');
const resolveOnceMap = require('resolve-once-map');

describe('exports .cjs', () => {
  it('default', () => {
    assert.equal(typeof resolveOnceMap, 'function');
  });
});
