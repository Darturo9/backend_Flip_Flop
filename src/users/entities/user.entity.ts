import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../roles.enum';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    googleId: string;

    @Column({ unique: true })
    email: string;

    @Column()
    nombre: string;

    @Column({ nullable: true })
    foto: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.CLIENTE,
    })
    rol: Role;

    @Column({ default: true })
    isActive: boolean;

}