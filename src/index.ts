import resolveOnce, { type Resolver } from 'resolve-once';

type ResolverMap<T> = { [key: string]: Resolver<T> };

export default function resolveOnceMap<T>(fn: Resolver<T>): Resolver<T> {
  const resolvers: ResolverMap<T> = {};

  return (key: string): Promise<T> => {
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
