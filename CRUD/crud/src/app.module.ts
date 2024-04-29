import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PruebaModule } from './prueba/prueba.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'prueba',
      entities: [User],
      synchronize: true,
    }),PruebaModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
