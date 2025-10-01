// server.ts
import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { DataSource } from 'typeorm';

import userRouter from './routes/user.routes.js';
import clientRouter from './routes/client.routes.js';

// Entidades
import { User } from './entities/User.entity.js';
import { Client } from './entities/Client.entity.js';


// ==============================
// Configuración de variables de entorno
// ==============================
dotenv.config();

const PORT = process.env.PORT || 4000;

// ==============================
// Configuración de la base de datos con TypeORM
// ==============================
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Client],
  synchronize: true, // ⚠️ Si se quiere crear las tablas, descomentar o poner en true
  logging: process.env.NODE_ENV === 'development',
});

// ==============================
// Inicialización del servidor
// ==============================
const app = express();

// Middlewares globales
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.use('/api/v1/auth', userRouter);
app.use('/api/v1/clients', clientRouter);

// Root
app.get('/', (_req, res) => {
  res.send('🚀 CRM Backend is running...');
});

// ==============================
// Conexión DB + arranque del server
// ==============================
AppDataSource.initialize()
  .then(() => {
    console.log('✅ Conectado a la base de datos');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Error al conectar la base de datos:', err);
  });
