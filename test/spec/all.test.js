var chai = require('chai');

var assert = chai.assert;

var resolveOnceMap = require('../..');

var sleep = function(timeout) {
  return new Promise(function(resolve) {
    setTimeout(resolve, timeout);
  });
};

describe('resolve-once-map', function() {
  it('handle success (no promise)', function(callback) {
    var counters = {};
    const resolver = resolveOnceMap(function(key) {
      counters[key] = counters[key] || 0;
      return ++counters[key];
    });

    Promise.all([resolver('one'), resolver('one'), resolver('two')]).then(function(results) {
      assert.equal(results.length, 3);
      results.forEach(function(result) {
        assert.equal(result, 1);
      });
      assert.deepEqual(counters, { one: 1, two: 1 });

      resolver('one').then(function(result) {
        assert.equal(result, 1);
        assert.deepEqual(counters, { one: 1, two: 1 });
        callback();
      });
    });
  });

  it('handle success (promise)', function(callback) {
    var counters = {};
    const resolver = resolveOnceMap(function(key) {
      counters[key] = counters[key] || 0;
      return ++counters[key];
    });

    Promise.all([resolver('one'), resolver('one'), resolver('two')]).then(function(results) {
      assert.equal(results.length, 3);
      results.forEach(function(result) {
        assert.equal(result, 1);
      });
      assert.deepEqual(counters, { one: 1, two: 1 });

      resolver('one').then(function(result) {
        assert.equal(result, 1);
        assert.deepEqual(counters, { one: 1, two: 1 });
        callback();
      });
    });
  });

  it('handle failure (no promise)', function(callback) {
    var counters = {};
    const resolver = resolveOnceMap(function(key) {
      counters[key] = counters[key] || 0;
      ++counters[key];
      throw new Error('Failed');
    });

    function wrapError(key) {
      return new Promise(function(resolve, reject) {
        resolver(key).catch(function(err) {
          assert.deepEqual(counters, { one: 1, two: 1 });
          assert.equal(err.message, 'Failed');
          resolve(counters[key]);
        });
      });
    }

    Promise.all([wrapError('one'), wrapError('one'), wrapError('two')]).then(function(results) {
      assert.equal(results.length, 3);
      results.forEach(function(result) {
        assert.equal(result, 1);
      });
      assert.deepEqual(counters, { one: 1, two: 1 });

      resolver('one').catch(function(err) {
        assert.deepEqual(counters, { one: 1, two: 1 });
        assert.equal(err.message, 'Failed');
        callback();
      });
    });
  });

  it('handle failure (promise)', function(callback) {
    var counters = {};
    const resolver = resolveOnceMap(function(key) {
      counters[key] = counters[key] || 0;
      ++counters[key];
      return Promise.reject(new Error('Failed'));
    });

    function wrapError(key) {
      return new Promise(function(resolve, reject) {
        resolver(key).catch(function(err) {
          assert.deepEqual(counters, { one: 1, two: 1 });
          assert.equal(err.message, 'Failed');
          resolve(counters[key]);
        });
      });
    }

    Promise.all([wrapError('one'), wrapError('one'), wrapError('two')]).then(function(results) {
      assert.equal(results.length, 3);
      results.forEach(function(result) {
        assert.equal(result, 1);
      });
      assert.deepEqual(counters, { one: 1, two: 1 });

      resolver('one').catch(function(err) {
        assert.deepEqual(counters, { one: 1, two: 1 });
        assert.equal(err.message, 'Failed');
        callback();
      });
    });
  });
});
