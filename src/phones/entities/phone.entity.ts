import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity'; // Asegúrate de que la ruta sea correcta
@Entity()
export class Phone {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    numero: string; // Ej: 50212345678

    @Column({ default: 'celular' })
    tipo: string; // Ej: celular, casa, trabajo

    @ManyToOne(() => User, user => user.phones)
    user: User;
}