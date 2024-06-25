// src/common/middleware/rate-limit.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CacheService } from 'src/cache/cache.service';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private readonly LIMIT = 1000; // Límite de peticiones por IP
  private readonly WINDOW_SIZE_IN_HOURS = 1; // Ventana de tiempo en horas

  constructor(private readonly cacheService: CacheService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const ip = req.ip;
      const requests = (await this.cacheService.get(ip)) || 0;

      if (requests >= this.LIMIT) {
        console.log(`IP ${ip} ha excedido el límite de peticiones.`);
        return res.status(429).send('Too Many Requests');
      }

      await this.cacheService.set(ip, requests + 1, {
        ttl: this.WINDOW_SIZE_IN_HOURS * 60 * 60, // TTL en segundos
      });

      console.log(`IP ${ip} ha realizado ${requests + 1} peticiones.`);
      next();
    } catch (error) {
      console.error('Error en el middleware de rate limiting:', error);
      next();
    }
  }
}
