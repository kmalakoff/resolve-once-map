var resolveOnce = require('resolve-once');

module.exports = function(fn) {
  var resolvers = {};

  return function(key) {
    var resolver = resolvers[key];
    if (!resolver) {
      resolver = resolveOnce(function() {
        try {
          return fn(key);
        } catch (err) {
          return Promise.reject(err);
        }
      });
      resolvers[key] = resolver;
    }
    return resolver();
  };
};
