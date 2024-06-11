import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RateLimitMiddleware } from './common/rate-limit.middleware';
import { CacheService } from './cache/cache.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cacheService = app.get(CacheService); // Obtener la instancia del servicio de caché

  app.use((req, res, next) => new RateLimitMiddleware(cacheService).use(req, res, next)); // Aplicar middleware

  await app.listen(3000);
}

bootstrap();