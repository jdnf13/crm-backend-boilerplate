import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * Entidad TypeORM para la tabla de Clientes (Contacts) en el CRM.
 * Incluye campos básicos de contacto y estado.
 */
@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ nullable: true })
  phone!: string;

  @Column({ nullable: true })
  company!: string;

  /**
   * Estado del cliente (ej: 'Lead', 'Prospecto', 'Activo', 'Inactivo')
   */
  @Column({ default: 'Lead' })
  status!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
