import assert from 'assert';
import Pinkie from 'pinkie-promise';
// @ts-ignore
import resolveOnceMap from 'resolve-once-map';

describe('resolve-once-map', () => {
  (() => {
    // patch and restore promise
    const root = typeof global !== 'undefined' ? global : window;
    // @ts-ignore
    let rootPromise: Promise;
    before(() => {
      rootPromise = root.Promise;
      // @ts-ignore
      root.Promise = Pinkie;
    });
    after(() => {
      root.Promise = rootPromise;
    });
  })();

  it('handle success (no promise)', (callback) => {
    const counters = {};
    const resolver = resolveOnceMap((key) => {
      counters[key] = counters[key] || 0;
      return ++counters[key];
    });

    Promise.all([resolver('one'), resolver('one'), resolver('two')]).then((results) => {
      assert.equal(results.length, 3);

      results.forEach((result) => {
        assert.equal(result, 1);
      });
      assert.deepEqual(counters, { one: 1, two: 1 });

      resolver('one').then((result) => {
        assert.equal(result, 1);
        assert.deepEqual(counters, { one: 1, two: 1 });
        callback();
      });
    });
  });

  it('handle success (promise)', (callback) => {
    const counters = {};
    const resolver = resolveOnceMap((key) => {
      counters[key] = counters[key] || 0;
      return ++counters[key];
    });

    Promise.all([resolver('one'), resolver('one'), resolver('two')]).then((results) => {
      assert.equal(results.length, 3);

      results.forEach((result) => {
        assert.equal(result, 1);
      });
      assert.deepEqual(counters, { one: 1, two: 1 });

      resolver('one').then((result) => {
        assert.equal(result, 1);
        assert.deepEqual(counters, { one: 1, two: 1 });
        callback();
      });
    });
  });

  it('handle failure (no promise)', (callback) => {
    const counters = {};
    const resolver = resolveOnceMap((key) => {
      counters[key] = counters[key] || 0;
      ++counters[key];
      throw new Error('Failed');
    });

    function wrapError(key) {
      return new Promise((resolve, _reject) => {
        resolver(key).catch((err) => {
          assert.deepEqual(counters, { one: 1, two: 1 });
          assert.equal(err.message, 'Failed');
          resolve(counters[key]);
        });
      });
    }

    Promise.all([wrapError('one'), wrapError('one'), wrapError('two')]).then((results) => {
      assert.equal(results.length, 3);

      results.forEach((result) => {
        assert.equal(result, 1);
      });
      assert.deepEqual(counters, { one: 1, two: 1 });

      resolver('one').catch((err) => {
        assert.deepEqual(counters, { one: 1, two: 1 });
        assert.equal(err.message, 'Failed');
        callback();
      });
    });
  });

  it('handle failure (promise)', (callback) => {
    const counters = {};
    const resolver = resolveOnceMap((key) => {
      counters[key] = counters[key] || 0;
      ++counters[key];
      return Promise.reject(new Error('Failed'));
    });

    function wrapError(key) {
      return new Promise((resolve, _reject) => {
        resolver(key).catch((err) => {
          assert.deepEqual(counters, { one: 1, two: 1 });
          assert.equal(err.message, 'Failed');
          resolve(counters[key]);
        });
      });
    }

    Promise.all([wrapError('one'), wrapError('one'), wrapError('two')]).then((results) => {
      assert.equal(results.length, 3);

      results.forEach((result) => {
        assert.equal(result, 1);
      });
      assert.deepEqual(counters, { one: 1, two: 1 });

      resolver('one').catch((err) => {
        assert.deepEqual(counters, { one: 1, two: 1 });
        assert.equal(err.message, 'Failed');
        callback();
      });
    });
  });
});
