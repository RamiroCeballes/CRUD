import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { jwtConstants } from './constants';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      secretOrPrivateKey: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    UsersModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}