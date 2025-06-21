import resolveOnce, { type Resolver } from 'resolve-once';

export type { Resolver } from 'resolve-once';

export default function resolveOnceMap<T extends string | number | symbol>(fn: Resolver<T>): Resolver<T> {
  const resolvers = {} as Record<T, Resolver<T>>;

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
