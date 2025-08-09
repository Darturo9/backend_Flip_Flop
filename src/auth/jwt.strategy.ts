import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

const cookieExtractor = function (req) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt_backend'];
    }
    return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: cookieExtractor, // <-- Cambia esto
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('NEXTAUTH_SECRET'),
        });
    }

    async validate(payload: any) {
        console.log('Payload recibido en JwtStrategy:', payload); // <-- LOG DE DEPURACIÓN
        return { userId: Number(payload.sub), email: payload.email };
    }
}