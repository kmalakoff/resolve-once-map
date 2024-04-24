import './polyfills.cjs';
import resolveOnce from 'resolve-once';

export default function resolveOnceMap(fn) {
  const resolvers = {};

  return (key) => {
    let resolver = resolvers[key];
    if (!resolver) {
      resolver = resolveOnce(() => {
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
