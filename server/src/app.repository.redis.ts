import { AppRepository } from './app.repository';
import { createClient, RedisClientType } from 'redis';

export class AppRepositoryRedis implements AppRepository {
  private readonly redisClient: RedisClientType;

  constructor() {
    const host = process.env.REDIS_HOST || 'redis';
    const port = +process.env.REDIS_PORT || 6379;
    this.redisClient = createClient({
      url: `redis://${host}:${port}`,
    });
    this.redisClient.connect();
    this.redisClient.on('connect', () => console.log('Redis connected'));
    this.redisClient.on('error', console.error);
  }

  async get(hash: string): Promise<string> {
    const result = await this.redisClient.get(hash);
    return result as string;
  }

  async put(hash: string, url: string): Promise<string> {
    try {
        await this.redisClient.set(hash, url);
        const result = await this.redisClient.get(hash);
        return result as string;
      } catch (err) {
        console.error(err);
        throw err;
      }
  }
}
