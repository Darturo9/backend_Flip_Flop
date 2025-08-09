import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../roles.enum';
import { Address } from '../../addresses/entities/address.entity';
import { Phone } from '../../phones/entities/phone.entity';

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

    @OneToMany(() => Address, address => address.user)
    addresses: Address[];

    @OneToMany(() => Phone, phone => phone.user)
    phones: Phone[];
}