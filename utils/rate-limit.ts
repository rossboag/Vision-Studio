import { Redis } from '@upstash/redis';

type Options = {
  interval: number;
  uniqueTokenPerInterval: number;
};

export default function rateLimit(options?: Options) {
  const tokenCache = new Map();
  const redis = new Redis({
    url: process.env.REDIS_URL!,
    token: process.env.REDIS_TOKEN!,
  });

  return {
    check: (request: Request, limit: number, token: string) =>
      new Promise<void>((resolve, reject) => {
        const key = request.ip;
        const tokenCount = tokenCache.get(key) || 0;

        if (tokenCount > limit) {
          reject('Rate limit exceeded');
        }

        redis.incr(key).then((newTokenCount) => {
          tokenCache.set(key, newTokenCount);

          if (newTokenCount > limit) {
            reject('Rate limit exceeded');
          } else {
            resolve();
          }
        });
      }),
  };
}

