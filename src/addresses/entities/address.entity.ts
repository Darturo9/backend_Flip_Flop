import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity'; // Asegúrate de que la ruta sea correcta

@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    departamento: string; // Ej: Guatemala, Sacatepéquez

    @Column()
    municipio: string; // Ej: Mixco, Antigua Guatemala

    @Column()
    zona: string; // Ej: Zona 1, Zona 10

    @Column()
    direccion: string; // Ej: 5a Avenida 10-50

    @Column({ nullable: true })
    referencia: string; // Opcional, para detalles adicionales

    @ManyToOne(() => User, user => user.addresses)
    user: User;
}