import resolveOnce, { type Resolver } from 'resolve-once';

export type { Resolver } from 'resolve-once';

export default function resolveOnceMap<T>(fn: Resolver<T>): Resolver<T> {
  const resolvers: Record<string, Resolver<T>> = {};

  return (...args: unknown[]): Promise<T> => {
    const key = String(args[0]);
    if (!resolvers[key]) {
      resolvers[key] = resolveOnce(() => {
        try {
          return fn(...args);
        } catch (err) {
          return Promise.reject(err);
        }
      });
    }
    return resolvers[key]();
  };
}
