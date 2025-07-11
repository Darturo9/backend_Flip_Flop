import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Role } from '../roles.enum';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    googleId: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsOptional()
    @IsString()
    foto?: string;

    @IsOptional()
    @IsEnum(Role)
    rol?: Role;
}