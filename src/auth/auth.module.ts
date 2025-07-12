import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.NEXTAUTH_SECRET || 'mi_secreto',
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [AuthController], // <-- Agrega esto
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule { }
