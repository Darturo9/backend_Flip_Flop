import { IsString, IsOptional, IsIn, Matches } from 'class-validator';

export class CreatePhoneDto {
    @IsString()
    @Matches(/^(\+502)?[2-7]\d{7}$/, { message: 'El número debe ser válido para Guatemala' })
    numero: string; // Ejemplo: 50212345678 o 22345678

    @IsOptional()
    @IsString()
    @IsIn(['celular', 'casa', 'trabajo'], { message: 'Tipo debe ser celular, casa o trabajo' })
    tipo?: string = 'celular';
}