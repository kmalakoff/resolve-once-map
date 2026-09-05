import assert from 'assert';
import resolveOnceMap from 'resolve-once-map';

describe('exports .mjs', () => {
  it('default', () => {
    assert.equal(typeof resolveOnceMap, 'function');
  });
});
