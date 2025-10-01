import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User } from '../entities/User.entity.js';
import { Client } from '../entities/Client.entity.js';

/**
 * Configuración de la conexión a la base de datos utilizando TypeORM.
 * Utiliza variables de entorno para las credenciales.
 */
export const AppDataSource = new DataSource({
  type: 'mysql', // O 'postgres', 'mariadb', etc.
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  
  // Lista de todas las entidades (tablas) de la aplicación
  entities: [User, Client], 
  
  // Sincronizar esquema solo en desarrollo. ¡PELIGROSO en producción!
  synchronize: process.env.NODE_ENV === 'development',
  
  // Mostrar queries SQL en consola para debug
  logging: process.env.NODE_ENV === 'development',
});
