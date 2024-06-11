// src/cache/cache.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class CacheService implements OnModuleInit, OnModuleDestroy {
  private redisClient: Redis;

  onModuleInit() {
    this.redisClient = new Redis({
      host: '127.0.0.1', // Dirección del servidor Redis
      port: 6379,        // Puerto del servidor Redis
    });

    this.redisClient.on('error', (err) => {
      console.error('Redis error:', err);
    });
  }

  onModuleDestroy() {
    this.redisClient.quit();
  }

  async get(key: string): Promise<any> {
    try {
      const value = await this.redisClient.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error al obtener clave de Redis:', error);
      return null;
    }
  }

  async set(key: string, value: any, options?: { ttl?: number }) {
    try {
      const ttl = options?.ttl;
      if (ttl) {
        await this.redisClient.set(key, JSON.stringify(value), 'EX', ttl);
      } else {
        await this.redisClient.set(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error('Error al establecer clave en Redis:', error);
    }
  }
}
