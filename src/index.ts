// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import Promise from 'pinkie-promise';
import resolveOnce from 'resolve-once';

export default function resolveOnceMap(fn) {
  const resolvers = {};

  return (key) => {
    if (!resolvers[key]) {
      resolvers[key] = resolveOnce(() => {
        try {
          return fn(key);
        } catch (err) {
          return Promise.reject(err);
        }
      });
    }
    return resolvers[key]();
  };
}
